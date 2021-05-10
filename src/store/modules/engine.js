import Vue from 'vue'
import { set } from '@/utils/vuex-builder'


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
                let paths = payload.id.split("-").slice(1); // remove the first id as we are already working with the app node

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

            REMOVE_SLOT: (state, payload) => {
                let data = state.data.app;
                let paths = payload.id.split("-").slice(1);
                
                const lastNodeKey = paths.pop(); // remove the last id and use the parent of the target node

                paths.forEach(path => {
                    data = data.slots[path];
                });
            
                data = data.slots;
            
                delete data[lastNodeKey]
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
            addSlot({ commit }, payload) {
                commit('ADD_SLOT', payload)
            },

            removeSlot({ commit }, payload) {
                commit('REMOVE_SLOT', payload)
            },

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
