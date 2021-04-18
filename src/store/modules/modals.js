import { set } from '@/utils/vuex'

const stateFn = () => ({
    confirm: {
        color: '',
        action: 'delete this item',
        callback: () => {},
        fullscreen: false,
        visibility: false
    },

})

export default (options) => {
    const state = stateFn()
    return {
        namespaced: true,
        state,
        mutations: {
            SET_CONFIG: set('config'),
            SET_FULLSCREEN: (state, { key, value }) => {
                state[key].fullscreen = value
            },
            SET_MODAL_DATA: (state, { key, value }) => {
                for (let prop of Object.keys(value)) {
                    if (state[key][prop] !== undefined) { state[key][prop] = value[prop] }
                }
            },
            SET_MODAL_VISIBILITY: (state, { key, value }) => {
                state[key].visibility = value
            },
    
        },
        actions: {
            setModalData({ commit }, payload) {
                commit('SET_MODAL_DATA', payload)
            },
            setFullscreen({ commit }, payload) {
                commit('SET_FULLSCREEN', payload)
            },
            setModalVisibility({ commit }, payload) {
                commit('SET_MODAL_VISIBILITY', payload)
            },
        },
        getters: {

        },
    }
}
