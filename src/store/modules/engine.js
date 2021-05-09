import Vue from 'vue'
import { set, getDefaultModule } from '@/utils/vuex-builder'

const defaultModule = getDefaultModule()

const stateFn = () => ({
    data: {},
    counter: 0,
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
            ADD_SLOT: (state, payload) => {
                let data = state.data.app;
                let paths = payload.id.split("-").slice(1);

                paths.forEach(path => {
                    data = data.slots[path];
                });

                if (!data.slots) {
                    Vue.set(data, "slots", {})
                }

                data = data.slots;

                Vue.set(data, payload.key, payload.value)

                state.counter++
            },

            SET_CONFIG: (state, payload) => {
                // Vue.set(state.config, payload.key, { data: payload.value })
                state.data = payload.value
            },

            SET_THEME_DARK: set("dark", state.vuetify.theme),

            SET_THEME_COLOR: (state, payload) => {
                state.vuetify.theme[payload.key] = payload.value
            }
        },

        actions: {
            addSlot: defaultModule.actions.addSlot,
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
