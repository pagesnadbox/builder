import API from "./API";
import { loadCss } from "./utils/helpers";
import appConfig from "./appConfig";

import ConfigService from "./ConfigService"

import History from "./History";

const Engine = window.API.Engine;

let config = appConfig;

export default class Bridge {

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

        const plugins = {
            undoRedoPlugin: this.history.plugin.bind(this.history)
        }

        const engine = this.engine = new Engine();
        await engine.init({ config: this.cfg, plugins, preventMount: true })
        engine.app.$mount();

        this._attachEngineEvent();
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

    _onHistoryEvent(event, data) {
        console.log(`History Event: ${event}`, data);

        switch (event) {
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
                ConfigService.fetchConfig({ id: data.id }).then((response) => {
                    this.cfg = response.config;

                    this.app.setConfig(this.cfg)
                    this.engine.setConfig(this.cfg);

                    // this.history.setCurrentStateAsReset();
                    this.history.updateManager({ reset: true, hard: true });
                })
                break;

            case API.events.ACTION:
                this.engine.action(data);
                if (this.skipSaveActions.every(a => !data.key.startsWith(a))) {
                    ConfigService.saveConfig({
                        config: this.cfg,
                        id: this.app.currentProjectId
                    })
                }
                break;

            case API.events.ENGINE_SLOT_RENDERED:
                this.loadEngineCss();
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

    _onEngineEvent(event, data) {
        console.log(`Engine Event: ${event}`, data);

        switch (event) {
            case Engine.events.COMPONENT_MOUSEENTER:
                break;
            case Engine.events.COMPONENT_MOUSELEAVE:
                break;
            case Engine.events.SETTINGS_ACTION:
                this.app.setSetting(data);
                break;
        }
    }

    loadEngineCss() {
        const engineShadow = this.app.getEngineSlot();

        [
            "http://localhost:8080/css/app.css",
            "http://localhost:8080/css/chunk-vendors.css",
            "https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900",
            "https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css",
            "https://fonts.googleapis.com/css?family=Work+Sans:300,400,500,600,700:100,300,400,500,700,900&display=swap"
        ].forEach(href => {
            loadCss(href, engineShadow);
        });

        const themeStyles = document.getElementById("vuetify-theme-stylesheet");

        engineShadow.appendChild(themeStyles.cloneNode(true));

    }
}