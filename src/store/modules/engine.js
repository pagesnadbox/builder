import Vue from 'vue'
import { set } from '@/utils/vuex'

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

            SET_THEME_DARK: set("dark", state.vuetify.theme),

            SET_THEME_COLOR: (state, payload) => {
                state.vuetify.theme[payload.key] = payload.value
            }
        },

        actions: {
            setConfig({ commit }, payload) {
                commit('SET_CONFIG', payload)
            },

            setEngineDark({ commit }, payload) {
                commit('SET_THEME_DARK', payload)
            },

            setEngineColor({ commit }, payload) {
                commit('SET_THEME_COLOR', payload)
            },
        },
        
        getters: {

        },
    }
}
