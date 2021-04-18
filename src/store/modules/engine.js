import { set } from '@/utils/vuex'

const stateFn = () => ({
   config: {}
})

export default (options) => {
    const state = stateFn()
    return {
        namespaced: true,
        state,
        mutations: {
            SET_CONFIG: set('config'),
        },
        actions: {
            setConfig({ commit }, payload) {
                commit('SET_CONFIG', payload)
            },
        },
        getters: {

        },
    }
}
