import { Store } from "./store";

export default class Storage {
    constructor({ config, plugins }) {
        this._store = Store({ config, plugins })
    }

    get store() {
        return this._store
    }

    get currentProjectConfig() {
        return this.store.state.projects.current.config;
    }

    get currentProjectId() {
        return this.store.state.projects.current.id;
    }

    get undoRedoManager() {
        return {
            setCanRedo: (value) => this.store.dispatch('settings/setCanRedo', value),
            setCanUndo: (value) => this.store.dispatch('settings/setCanUndo', value),
        }
    }

    action(payload) {
        this.store.dispatch(payload.key, payload.value);
    }

    setSetting(payload) {
        this.store.dispatch(`settings/${payload.key}`, payload.value);
    }

    setConfig(config) {
        [
            "app",
            "hero",
            "themeFeatures",
            "features",
            "affiliates",
            "social",
            "footer"
        ].forEach((key) => {
            this.store.dispatch(`${key}/setData`, config[key]);
        })
    }
}