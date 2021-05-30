import { set } from '@/utils/vuex-builder'

const stateFn = () => ({
    open: [],
    depth: [],
})

export default () => {
    const state = stateFn()
    return {
        namespaced: true,

        state,

        mutations: {
            SET_OPEN: set('open'),
            SET_DEPTH: set('open'),
        },

        actions: {
            setOpen({ commit }, payload) {
                commit('SET_OPEN', payload)
            },
            setDepth({ commit }, payload) {
                commit('SET_DEPTH', payload)
            },
        },

        getters: {

        },
    }
}
