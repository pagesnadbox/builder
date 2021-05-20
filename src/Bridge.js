import { debounce } from "./utils/helpers";

import Builder from "./API";
import History from "./History";
import EngineAdapter from "./EngineAdapter";
import ConfigService from "./services/ConfigService"
import ImagesService from "./services/ImagesService";

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

        this.attachAppEvent();
    }

    createHistory() {
        this.history = new History({
            interests: ['config']
        });

        this.attachHistoryEvents();

        return this.history;
    }

    async createEngine(data) {
        if (this.engine) return;
        // this.createHistory();

        this.engine = new EngineAdapter();
        this.engine.target = data.slot.contentWindow

        await this.engine.init({
            baseUrl: this.imageService.BASE_URL,
            config: this.cfg,
        });

        this.attachEngineEvent();
    }

    attachHistoryEvents() {
        Object.keys(History.events).forEach(key => {
            const event = History.events[key]
            this.history.on(event, (data) => this.onHistoryEvent(event, data));
        });
    }

    attachEngineEvent() {
        Object.keys(EngineAdapter.events).forEach(key => {
            const event = EngineAdapter.events[key]
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
            [Builder.events.TREE_NODE_MOUSE_ENTER]: (id) => this.engine.highlight(id),
            [Builder.events.TREE_NODE_MOUSE_LEAVE]: () => this.engine.highlight(null),
            [Builder.events.DATA_CHANGE]: (data) => this.saveConfig(data),
        }

        if (mediator[event]) {
            mediator[event](data);
        }
    }

    onEngineEvent(event, data) {
        console.log(`EngineAdapter Event: ${event}`, data);

        const mediator = {
            // settings change performed from engine, inform builder
            [EngineAdapter.events.SETTINGS_ACTION]: (data) => this.builder.setSetting(data),
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
        this.createEngine(data);
    }

    onProjectSelected() {
        this.fetchProject();
        this.fetchConfig();
    }

    onAppAction(data) {
        this.engine.action(data);
    }

    onError(error) {
        this.builder.setSnackbar(error.message)
    }

    replaceConfig(data) {
        this.cfg = data.config.data;
    }

    saveConfig() {
        this.engine.setConfig(this.cfg)

        ConfigService.saveConfig({
            config: this.cfg,
        }, this.onError.bind(this))
    }

    async fetchConfig() {
        this.cfg = await this.config();

        // this.history.initialized && this.history.unsubscribe();

        this.builder.setConfig(this.cfg);
        this.engine.setConfig(this.cfg);

        // this.history.setApp("engine", this.engine.store);
        // this.history.subscribe();
    }

    async fetchProject() {
        const response = await ConfigService.fetchProject(this.onError.bind(this));

        if (response.success) {
            this.builder.setImages(response.images)
        }
    }

}