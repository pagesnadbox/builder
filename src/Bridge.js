import API from "./API";
import { loadCss } from "./utils/helpers";
import appConfig from "./appConfig";

import ConfigService from "./ConfigService"

const Engine = window.API.Engine;

let config = appConfig;

export default class Bridge {
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

        this.appDone();
    }

    async createEngine() {
        const engine = this.engine = new Engine();
        await engine.init({ config: this.cfg, preventMount: true })
        engine.app.$mount();

        this.engineDone();
    }

    engineDone() {
        this._attachEngineEvent();
    }

    appDone() {
        this.app.setConfig(this.cfg)
        this._attachAppEvent();
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

    _onAppEvent(event, data) {
        console.log(`App Event: ${event}`, data);

        switch (event) {
            case API.events.COMPONENT_CHANGE:
                // this.engine.setComponents(data);
                break;
            case API.events.CONFIG_CHANGE:
            // this.engine.setComponents(data);
            case API.events.PROJECT_SELECTED:
                ConfigService.fetch({ id: data.id }).then((response) => {
                    this.cfg = response.config;

                    this.app.setConfig(this.cfg)
                    this.engine.setConfig(this.cfg);
                })
                break
            case API.events.ACTION:
                this.engine.action(data);
                ConfigService.save({
                    config: this.cfg,
                    id: this.app.currentProjectId
                })
                break;
            case API.events.ENGINE_SLOT_RENDERED:
                this.loadEngineCss();
                this.app.setEngine(data.slot, this.engine.app.$el);
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