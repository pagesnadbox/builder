import EventEmitter from 'eventemitter3';
import cloneDeep from 'lodash/cloneDeep'

export default class History extends EventEmitter {
    store;
    history = [];
    redoCount = 0;
    undoCount = -1;
    currentIndex = -1;
    resetState;
    resetPending = false;
    subscribed = true

    static get events() {
        return {
            CAN_UNDO: "CAN_UNDO",
            CAN_REDO: "CAN_REDO",
        }
    }

    get resetState() {
        return this._resetState;
    }

    set resetState(value) {
        this._resetState = cloneDeep(value);
    }

    setCurrentStateAsReset() {
        this.resetState = this.store.state
    }

    constructor({ interests }) {
        super();
        this.interests = interests;
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

    init(store) {
        this.initialized = true;

        this.store = store

        if (this.subscribed) {
            this.resetState = store.state
        }
    }

    plugin(store) {
        // initialize and save the starting stage
        this.init(store)

        if (this.subscribed) {
            this.addState(cloneDeep(store.state))
        }

        store.subscribe((mutation, state) => {
            const module = mutation.type.split('/')[0]

            // is called AFTER every mutation

            if (this.subscribed && this.interests.indexOf(module) > -1) {
                this.addState(cloneDeep(state))
            }
        })
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

    undo() {
        const prevState = this.history[this.currentIndex - 1]
        // take a copy of the history state
        // because it would be changed during store mutations
        // what would corrupt the undo-redo-history
        // (same on redo)
        this.store.replaceState(cloneDeep(this._preState(prevState)))
        this.currentIndex--
        this.redoCount++
        this.undoCount--

        this.resetPending = true
        this.updateManager()
    }

    redo() {
        const nextState = this.history[this.currentIndex + 1]
        this.store.replaceState(cloneDeep(this._preState(nextState)))
        this.currentIndex++
        this.redoCount--
        this.undoCount++

        this.resetPending = true
        this.updateManager()
    }

    reset() {
        const state = cloneDeep(this.resetState)

        this.addState(state)
        this.store.replaceState(state)

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
        return { ...state, settings: this.store.state.settings }
    }
}