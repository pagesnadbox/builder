import EventEmitter from "eventemitter3";

export default class EngineAdapter extends EventEmitter {
    static get events() {
        return {
            SETTINGS_ACTION: "SETTINGS_ACTION",
        }
    }

    get target() {
        return this._target;
    }

    set target(target) {
        this._target = target;
    }
    
    constructor() {
        super()
        window.addEventListener("message", this.onMessage.bind(this))
    }

    postMessage(data) {
        this.target.postMessage(data, '*');
    }

    onMessage(event) {
        if (event.origin !== "http://localhost:8080") {
            return;
        }

        if (event.data.engineEvent) {
            this.emit(event.data.engineEvent, event.data.params)
        }

    }

    init(data) {
        this.postMessage({
            message: "init",
            data
        })

    }

    highlight(data) {
        this.postMessage({
            message: "highlight",
            data
        })
    }

    setConfig(data) {
        this.postMessage({
            message: "setConfig",
            data
        })

    }

    setSettings(data) {
        this.postMessage({
            message: "setSettings",
            data
        })

    }

    replaceConfig(data) {
        this.postMessage({
            message: "replaceConfig",
            data
        })

    }

    action(data) {
        this.postMessage({
            message: "action",
            data
        })
    }

}