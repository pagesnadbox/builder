import { loadCss, debounce } from "./utils/helpers";

import Builder from "./API";
import History from "./History";
import ConfigService from "./services/ConfigService"
import ImagesService from "./services/ImagesService";

import BTN from "./config/base/components/Btn"

window.BTN = BTN

const Engine = window.API.Engine;

export default class Bridge {

    constructor() {
        this.styles = []
        this.debouncedSaveConfigFn = debounce(this.saveConfig.bind(this), 300)
    }

    get skipSaveActions() {
        return ["settings"]
    }

    init() {
        this.config().then(cfg => {
            this.cfg = cfg
            this.imageService = ImagesService.getInstance();
            this.createApp();
            this.createEngine();
        });

        return this;
    }

    async config() {
        const response = await ConfigService.fetchConfig(this.onError.bind(this));
        window.config = response.config;
        return response.config;
    }

    createApp() {
        this.builder = new Builder();
        this.builder.init()
        window.com.app = this.builder;

        this.builder.setConfig(this.cfg)
        this.attachAppEvent();
    }

    createHistory() {
        this.history = new History({
            interests: ['config']
        });

        this.attachHistoryEvents();

        return this.history;
    }

    async createEngine() {
        this.createHistory();

        this.engine = new Engine();

        await this.engine.init({
            imageService: this.imageService,
            config: this.cfg,
            preventMount: true
        });

        this.engine.app.$mount();

        this.attachEngineEvent();
    }

    attachHistoryEvents() {
        Object.keys(History.events).forEach(key => {
            const event = History.events[key]
            this.history.on(event, (data) => this.onHistoryEvent(event, data));
        });
    }

    attachEngineEvent() {
        Object.keys(Engine.events).forEach(key => {
            const event = Engine.events[key]
            this.engine.on(event, (data) => this.onEngineEvent(event, data));
        });
    }

    attachAppEvent() {
        Object.keys(Builder.events).forEach(key => {
            const event = Builder.events[key]
            this.builder.on(event, (data) => this.onAppEvent(event, data));
        });
    }

    onHistoryEvent(event, data) {
        console.log(`History Event: ${event}`, data);

        const mediator = {
            [History.events.REPLACE_STATE]: (data) => this.onReplaceState(data),
            [History.events.CAN_REDO]: (data) => this.builder.undoRedoManager.setCanRedo(data),
            [History.events.CAN_UNDO]: (data) => this.builder.undoRedoManager.setCanUndo(data),
        }

        if (mediator[event]) {
            mediator[event](data);
        }
    }

    onAppEvent(event, data) {
        console.log(`App Event: ${event}`, data);

        const mediator = {
            [Builder.events.PROJECT_SELECTED]: () => this.onProjectSelected(),
            [Builder.events.ACTION]: (data) => this.onAppAction(data),
            [Builder.events.ENGINE_SLOT_RENDERED]: (data) => this.onEngineSlotRendered(data),
            [Builder.events.HISTORY_RESET]: () => this.history.reset(),
            [Builder.events.HISTORY_UNDO]: () => this.history.undo(),
            [Builder.events.HISTORY_REDO]: () => this.history.redo(),
        }

        if (mediator[event]) {
            mediator[event](data);
        }
    }

    onEngineEvent(event, data) {
        console.log(`Engine Event: ${event}`, data);

        const mediator = {
            // settings change performed from engine, inform builder
            [Engine.events.SETTINGS_ACTION]: (data) => this.builder.setSetting(data),
            // reload the css when theme property is changed
            [Engine.events.THEME_COLOR_CHANGE]: () => requestAnimationFrame(() => this.reloadEngineCss()),
        }

        if (mediator[event]) {
            mediator[event](data);
        }
    }

    onReplaceState(data) {
        // sync configs of interested parties
        this.builder.replaceConfig(data);
        this.engine.replaceConfig(data);
        this.replaceConfig(data)

        // save config
        this.debouncedSaveConfigFn();
    }

    onEngineSlotRendered(data) {
        this.styles = this.reloadEngineCss();
        this.builder.setEngine(data.slot, this.engine.app.$el);
    }

    onProjectSelected() {
        this.fetchProject();
        this.fetchConfig();
    }

    onAppAction(data) {
        this.engine.action(data);
        if (this.skipSaveActions.every(a => !data.key.startsWith(a))) {
            // save only if interested action was performed
            this.debouncedSaveConfigFn();
        }
    }

    loadEngineCss() {
        const url = process.env.VUE_APP_TEMPLATE_RESOURCES_URL;
        const engineShadow = this.builder.getEngineSlot();

        const styles = [
            `${url}/css/app.css`,
            `${url}/css/chunk-vendors.css`,
            "https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900",
            "https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css",
            "https://fonts.googleapis.com/css?family=Work+Sans:300,400,500,600,700:100,300,400,500,700,900&display=swap"
        ].map(href => {
            return loadCss(href, engineShadow);
        });

        const themeStyles = document.getElementById("vuetify-theme-stylesheet");

        engineShadow.appendChild(themeStyles.cloneNode(true));

        return styles
    }

    reloadEngineCss() {
        const newStyles = this.loadEngineCss();

        if (this.styles) {
            this.styles.forEach(element => element.remove())
        }

        this.styles = newStyles;
    }

    onError(error) {
        this.builder.setSnackbar(error.message)
    }

    replaceConfig(data) {
        [
            "app",
            "hero",
            "themeFeatures",
            "features",
            "affiliates",
            "social",
            "footer"
        ].forEach((key) => {
            this.cfg[key] = data[key].data;
        });
    }

    async saveConfig() {
        await ConfigService.saveConfig({
            config: this.cfg,
        }, this.onError.bind(this))
    }

    async fetchConfig() {
        this.cfg = await this.config();

        this.history.initialized && this.history.unsubscribe();

        this.builder.setConfig(this.cfg)
        this.engine.setConfig(this.cfg);

        this.history.setApp("engine", this.engine.store);
        this.history.subscribe();
    }

    async fetchProject() {
        const response = await ConfigService.fetchProject(this.onError.bind(this));

        if (response.success) {
            this.builder.setImages(response.images)
        }
    }

}