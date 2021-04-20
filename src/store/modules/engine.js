import Vue from 'vue'

const stateFn = () => ({
    config: {},
    vuetify: {
        theme: {
            dark: true,
            primary: ""
        }
    }
})

export default (options) => {
    const state = stateFn()
    return {
        namespaced: true,
        state,
        mutations: {
            SET_CONFIG: (state, payload) => {
                Vue.set(state.config, payload.key, { data: payload.value })
            },
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
