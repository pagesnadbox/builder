import { loadCss, debounce } from "./utils/helpers";
import appConfig from "./appConfig";

import API from "./API";
import History from "./History";
import ConfigService from "./ConfigService"

const Engine = window.API.Engine;

let config = appConfig;

export default class Bridge {

    constructor() {
        this.styles = []
        this._debouncedSaveConfigFn = debounce(this._saveConfig.bind(this), 300)
    }

    get skipSaveActions() {
        return ["settings"]
    }

    init() {
        this.config().then(cfg => {
            this.cfg = cfg
            this.createApp();
            this.createEngine();
        });

        return this;
    }

    async config() {
        try {
            const data = await fetch('./config.json')
            config = await data.json()
        } catch (e) {
            console.error(e)
        }

        window.config = config

        return config
    }

    createApp() {
        this.app = new API();
        this.app.init()
        window.com.app = this.app;

        this.app.setConfig(this.cfg)
        this._attachAppEvent();
    }

    createHistory() {
        this.history = new History({
            interests: ['app', 'hero', 'themeFeatures', 'features', 'affiliates', 'social']
        });

        this._attachHistoryEvents();

        return this.history;
    }

    async createEngine() {
        this.createHistory();

        const engine = this.engine = new Engine();
        await engine.init({ config: this.cfg, preventMount: true })
        engine.app.$mount();

        this._attachEngineEvent();
    }

    _onHistoryEvent(event, data) {
        console.log(`History Event: ${event}`, data);

        switch (event) {
            case History.events.REPLACE_STATE:
                this.app.replaceConfig(data);
                this.engine.replaceConfig(data);
                break;

            case History.events.CAN_REDO:
                this.app.undoRedoManager.setCanRedo(data)
                break;

            case History.events.CAN_UNDO:
                this.app.undoRedoManager.setCanUndo(data)
                break;
        }
    }

    _onAppEvent(event, data) {
        console.log(`App Event: ${event}`, data);

        switch (event) {
            case API.events.PROJECT_SELECTED:
                this._fetchConfig(data);
                break;

            case API.events.ACTION:
                this.engine.action(data);
                if (this.skipSaveActions.every(a => !data.key.startsWith(a))) {
                    this._debouncedSaveConfigFn(data);
                }
                break;

            case API.events.ENGINE_SLOT_RENDERED:
                this.styles = this.reloadEngineCss();
                this.app.setEngine(data.slot, this.engine.app.$el);
                break;

            case API.events.HISTORY_RESET:
                this.history.reset();
                break;

            case API.events.HISTORY_UNDO:
                this.history.undo();
                break;

            case API.events.HISTORY_REDO:
                this.history.redo();
                break;
        }
    }

    async _saveConfig(data) {
        ConfigService.saveConfig({
            config: this.cfg,
            id: this.app.currentProjectId
        }, this._onError.bind(this))

        this.app.setConfig(this.cfg)
        this.engine.setConfig(this.cfg);
    }

    async _fetchConfig(data) {
        const response = await ConfigService.fetchConfig({
            id: data.id
        }, this._onError.bind(this));

        this.history.initialized && this.history.unsubscribe();

        this.cfg = response.config;

        this.app.setConfig(this.cfg)
        this.engine.setConfig(this.cfg);

        this.history.setApp(data.id, this.engine.store);
        this.history.subscribe();
    }

    _onEngineEvent(event, data) {
        console.log(`Engine Event: ${event}`, data);

        switch (event) {
            case Engine.events.SETTINGS_ACTION:
                this.app.setSetting(data);
                break;
            case Engine.events.THEME_COLOR_CHANGE:
                // this.engine.setThemeColor(data);
                requestAnimationFrame(() => {
                    this.reloadEngineCss();
                })
                break;
        }
    }

    _attachHistoryEvents() {
        Object.keys(History.events).forEach(key => {
            const event = History.events[key]
            this.history.on(event, (data) => this._onHistoryEvent(event, data));
        });
    }

    _attachEngineEvent() {
        Object.keys(Engine.events).forEach(key => {
            const event = Engine.events[key]
            this.engine.on(event, (data) => this._onEngineEvent(event, data));
        });
    }

    _attachAppEvent() {
        Object.keys(API.events).forEach(key => {
            const event = API.events[key]
            this.app.on(event, (data) => this._onAppEvent(event, data));
        });
    }

    loadEngineCss() {
        const engineShadow = this.app.getEngineSlot();

        const styles = [
            "http://localhost:8080/css/app.css",
            "http://localhost:8080/css/chunk-vendors.css",
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

    _onError(error) {
        this.app.setSnackbar(error.message)
    }
}