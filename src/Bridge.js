import { debounce } from "./utils/helpers";

import Builder from "./API";
import History from "./History";
import EngineAdapter from "./EngineAdapter";
import ConfigService from "./services/ConfigService"
import ImagesService from "./services/ImagesService";
import { toJpeg } from 'html-to-image';


export default class Bridge {

    constructor() {
        this.styles = []
        this.pendingActions = []
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
            this.createHistory();
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
            interests: ['builderEngine']
        });

        this.attachHistoryEvents();

        return this.history;
    }

    createEngine(data) {
        this.engine = new EngineAdapter();
        this.engine.target = data.slot.contentWindow

        this.engine.init({
            baseUrl: this.imageService.BASE_URL,
            config: this.cfg,
        });

        console.error("init");
        if (this.pendingActions.length) {
            this.pendingActions.forEach(action => this.onAppAction(action))
            this.pendingActions = []
        }

        this.attachEngineEvent();
    }

    attachHistoryEvents() {
        Object.keys(History.events).forEach(key => {
            const event = History.events[key]
            this.history.on(event, (data) => this.onHistoryEvent(event, data));
        });
    }

    attachEngineEvent() {
        this.engine.off();

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
            [Builder.events.ACTION]: (data) => this.onAppAction(data),
            [Builder.events.ENGINE_SLOT_RENDERED]: (data) => this.onEngineSlotRendered(data),
            [Builder.events.ENGINE_SLOT_DESTROYED]: (data) => this.onEngineSlotDestroyed(data),
            [Builder.events.HISTORY_RESET]: () => this.history.reset(),
            [Builder.events.HISTORY_UNDO]: () => this.history.undo(),
            [Builder.events.HISTORY_REDO]: () => this.history.redo(),
            [Builder.events.TREE_NODE_MOUSE_ENTER]: (id) => this.engine.highlight({ id, force: true }),
            [Builder.events.TREE_NODE_MOUSE_LEAVE]: () => this.engine.highlight({ id: null, force: false }),
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
            [EngineAdapter.events.HTML_RENDERED]: (data) => this.onEngineHtmlRendered(data),
        }

        if (mediator[event]) {
            mediator[event](data);
        }
    }

    onEngineHtmlRendered(data) {
        console.error(data)
        toJpeg(data.html, { quality: 0.95 })
            .then(function (dataUrl) {
                var link = document.createElement('a');
                link.download = 'my-image-name.jpeg';
                link.href = dataUrl;
                link.click();
            });
    }

    onReplaceState(data) {
        // sync configs of interested parties
        this.builder.replaceConfig(data);
        // this.engine.replaceConfig(data);
        this.replaceConfig(data)

        // save config
        this.debouncedSaveConfigFn();
    }

    onEngineSlotRendered(data) {
        this.slot = data.slot
        this.createEngine(data);
        this.onProjectSelected();
    }

    async onEngineSlotDestroyed() {
        this.engine = null
    }

    onProjectSelected() {
        this.fetchProject();
        this.fetchConfig();
    }

    onAppAction(data) {
        if (!this.engine) {
            console.error(data);
            this.pendingActions.push(data)
        } else {
            this.engine.action(data);
        }
    }

    onError(error) {
        this.builder.setSnackbar(error.message)
    }

    replaceConfig(data) {
        this.cfg = data.builderEngine.data;
    }

    saveConfig() {
        if (this.engine) {
            this.engine.setConfig(this.cfg)
        }

        ConfigService.saveConfig({
            config: this.cfg,
        }, this.onError.bind(this))
    }

    async fetchConfig() {
        this.cfg = await this.config();

        this.history.initialized && this.history.unsubscribe();

        this.builder.setConfig(this.cfg);
        this.engine.setConfig(this.cfg);

        this.history.setApp("engine", this.builder.store);
        this.history.subscribe();
    }

    async fetchProject() {
        const response = await ConfigService.fetchProject(this.onError.bind(this));

        if (response.success) {
            this.builder.setImages(response.images)
        }
    }

}