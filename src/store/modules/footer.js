import { set, setProp } from '@/utils/vuex'

const stateFn = (options) => ({
    data: options.footer,
})

export default (options) => {
    const state = stateFn(options)
    return {
        namespaced: true,
        state,
        mutations: {
            SET_PROP: setProp,
        },
        actions: {
            setProp ({ commit }, payload) {
                commit('SET_PROP', payload)
            },
        },
        getters: {
        },
    }
}
