import { set } from '@/utils/vuex'

const stateFn = () => ({
    allowEdit: false,
    ctrlDown: false,
    id: '',
    canRedo: false,
    canUndo: false,
    open: false,
    componentName: '',
    items: [],
    moreComponents: [],
    moreComponentsDraft: [],
})

export default (options) => {
    const state = stateFn()
    return {
        namespaced: true,
        state,
        mutations: {
            SET_CAN_REDO: set('canRedo'),
            SET_CAN_UNDO: set('canUndo'),
            SET_ALLOW_EDIT: set('allowEdit'),
            SET_CTR_DOWN: set('ctrlDown'),
            SET_ID: set('id'),
            SET_ITEMS: set('items'),
            SET_OPEN: set('open'),
            SET_COMPONENT_NAME: set('componentName'),
            SET_COMPONENTS: set('moreComponents'),
            ADD_COMPONENT: (state, payload) => {
                state.moreComponentsDraft.push(payload)
            },
            REMOVE_COMPONENT: (state, payload) => {
                const index = state.moreComponentsDraft.findIndex(c => c.id === payload.id)
                if (index > -1) {
                    state.moreComponentsDraft.splice(index, 1)
                }
            },
        },
        actions: {
            setCanRedo ({ commit }, payload) {
                commit('SET_CAN_REDO', payload)
            },
            setCanUndo ({ commit }, payload) {
                commit('SET_CAN_UNDO', payload)
            },
            setCtrlDown ({ commit }, payload) {
                commit('SET_CTR_DOWN', payload)
            },
            setAllowEdit ({ commit }, payload) {
                commit('SET_ALLOW_EDIT', payload)
            },
            setOpen ({ commit }, payload) {
                commit('SET_OPEN', payload)
            },
            setComponentName ({ commit }, payload) {
                commit('SET_COMPONENT_NAME', payload)
            },
            setComponents ({ commit, state }) {
                commit('SET_COMPONENTS', [...state.moreComponentsDraft])
            },
            resetComponents ({ commit }) {
                commit('SET_COMPONENTS', [])
            },
            addComponent ({ commit }, payload) {
                commit('ADD_COMPONENT', payload)
            },
            removeComponent ({ commit }, payload) {
                commit('REMOVE_COMPONENT', payload)
            },
            setComponentId ({ commit }, payload) {
                commit('SET_ID', payload)
            },
            setItems ({ commit }, payload) {
                commit('SET_ITEMS', payload)
            },
        },
        getters: {

        },
    }
}
