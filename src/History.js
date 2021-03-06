import EventEmitter from 'eventemitter3';
import cloneDeep from 'lodash/cloneDeep'

export default class History extends EventEmitter {
    apps = {}
    interests = []

    constructor({ interests }) {
        super();
        this.interests = interests;
    }

    static get events() {
        return {
            CAN_UNDO: "CAN_UNDO",
            CAN_REDO: "CAN_REDO",
            REPLACE_STATE: "REPLACE_STATE"
        }
    }

    get store() {
        return this._store
    }

    set store(value) {
        this._store = value;
    }

    get history() {
        return this.apps[this.id].history
    }

    set history(value) {
        this.apps[this.id].history = value;
    }

    get redoCount() {
        return this.apps[this.id].redoCount
    }

    set redoCount(value) {
        this.apps[this.id].redoCount = value;
    }

    get undoCount() {
        return this.apps[this.id].undoCount
    }

    set undoCount(value) {
        this.apps[this.id].undoCount = value;
    }

    get currentIndex() {
        return this.apps[this.id].currentIndex
    }

    set currentIndex(value) {
        this.apps[this.id].currentIndex = value;
    }

    get resetState() {
        return this.apps[this.id].resetState
    }

    set resetState(value) {
        this.apps[this.id].resetState = value;
    }

    get resetPending() {
        return this.apps[this.id].resetPending
    }

    set resetPending(value) {
        this.apps[this.id].resetPending = value;
    }

    get subscribed() {
        return this.apps[this.id].subscribed
    }

    set subscribed(value) {
        this.apps[this.id].subscribed = value;
    }

    get resetState() {
        return this._resetState;
    }

    set resetState(value) {
        this._resetState = cloneDeep(value);
    }

    getConfig() {
        return {
            store: null,
            history: [],
            redoCount: 0,
            undoCount: -1,
            currentIndex: -1,
            resetState: null,
            resetPending: false,
            subscribed: false
        }
    }

    setCurrentStateAsReset() {
        this.resetState = this.store.state
    }

    subscribe() {
        this.subscribed = true;

        if (this.initialized) {
            this.resetState = this.store.state
        }
    }

    unsubscribe() {
        this.subscribed = false;
    }

    setStore(store) {
        this.store = store

        store.subscribe((mutation, state) => {
            const module = mutation.type.split('/')[0]

            // is called AFTER every mutation

            if (this.subscribed && this.interests.indexOf(module) > -1) {
                this.addState(cloneDeep(state))
            }
        })

    }

    setApp(id, store) {
        this.id = id;
        !this.store && this.setStore(store);

        if (!this.apps[id]) {
            this.apps[id] = this.getConfig();

            this.store = store

            if (this.subscribed) {
                this.resetState = store.state
            }

            this.addState(cloneDeep(store.state))
            this.initialized = true;
        }

        this.updateManager();
    }

    addState(state) {
        // may be we have to remove redo steps
        if (this.currentIndex + 1 < this.history.length) {
            this.history.splice(this.currentIndex + 1)
        }
        this.history.push(state)
        this.currentIndex++
        this.undoCount++

        this.updateManager({ reset: this.resetPending })
        this.resetPending = false
    }

    replaceState(state) {
        this.emit(History.events.REPLACE_STATE, state)
    }

    undo() {
        const prevState = this.history[this.currentIndex - 1]
        // take a copy of the history state
        // because it would be changed during store mutations
        // what would corrupt the undo-redo-history
        // (same on redo)
        this.replaceState(cloneDeep(this._preState(prevState)))
        // this.store.replaceState(cloneDeep(this._preState(prevState)))

        this.currentIndex--
        this.redoCount++
        this.undoCount--

        this.resetPending = true
        this.updateManager()
    }

    redo() {
        const nextState = this.history[this.currentIndex + 1]
        this.replaceState(cloneDeep(this._preState(nextState)))
        // this.store.replaceState(cloneDeep(this._preState(nextState)))
        this.currentIndex++
        this.redoCount--
        this.undoCount++

        this.resetPending = true
        this.updateManager()
    }

    reset() {
        const state = cloneDeep(this.resetState)

        this.addState(state)
        // this.store.replaceState(state)
        this.replaceState(state)
        this.redoCount = 0
        this.updateManager()
    }

    updateManager({ reset = false, hard = false } = {}) {
        if (reset) {
            this.redoCount = 0
            this.undoCount = hard ? 0 : 1
        }

        this.emit(History.events.CAN_REDO, this.redoCount > 0)
        this.emit(History.events.CAN_UNDO, this.undoCount > 0)

    }

    _preState(state) {
        return { ...state }
        // return { ...state, settings: this.store.state.settings }
    }
}