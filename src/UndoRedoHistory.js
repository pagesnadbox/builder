import cloneDeep from 'lodash/cloneDeep'

export default class UndoRedoHistory {
    store;
    history = [];
    redoCount = 0;
    undoCount = -1;
    currentIndex = -1;
    firstState;
    resetPending = false;

    constructor(interests) {
        this.interests = interests
    }

    init(store) {
        this.store = store
    }

    plugin(store) {
        // initialize and save the starting stage
        this.init(store)
        const firstState = cloneDeep(store.state)
        this.addState(firstState)

        store.subscribe((mutation, state) => {
            const module = mutation.type.split('/')[0]

            // is called AFTER every mutation

            if (this.interests.indexOf(module) > -1) {
                this.addState(cloneDeep(state))
            }
        })
    }

    addState(state) {
        if (!this.firstState) {
            this.firstState = cloneDeep(state)
        }

        // may be we have to remove redo steps
        if (this.currentIndex + 1 < this.history.length) {
            this.history.splice(this.currentIndex + 1)
        }
        this.history.push(state)
        this.currentIndex++
        this.undoCount++

        this._updateState(this.resetPending)
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
        this._updateState()
    }

    redo() {
        const nextState = this.history[this.currentIndex + 1]
        this.store.replaceState(cloneDeep(this._preState(nextState)))
        this.currentIndex++
        this.redoCount--
        this.undoCount++

        this.resetPending = true
        this._updateState()
    }

    reset() {
        const state = cloneDeep(this.firstState)

        this.addState(state)
        this.store.replaceState(state)

        this.redoCount = 0
        this._updateState()
    }

    _updateState(reset = false) {
        if (reset) {
            this.redoCount = 0
            this.undoCount = 1
        }

        this.store.dispatch('settings/setCanRedo', this.redoCount > 0)
        this.store.dispatch('settings/setCanUndo', this.undoCount > 0)
    }

    _preState(state) {
        return { ...state, settings: this.store.state.settings }
    }
}