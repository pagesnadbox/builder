import EventEmitter from "eventemitter3";

let engineOrigin = window.com.builder.cfg.engineOrigin;

engineOrigin = engineOrigin
    .replace("{host}", window.location.hostname)
    .replace("{protocol}", window.location.protocol)
    .replace("{port}", window.location.port ? `:${window.location.port}` : "")

export default class EngineAdapter extends EventEmitter {
    static get events() {
        return {
            SETTINGS_ACTION: "SETTINGS_ACTION",
            HTML_RENDERED: "HTML_RENDERED",
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
        if (!event.origin.startsWith(engineOrigin)) {
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