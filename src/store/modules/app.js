import { set, setProp } from '@/utils/vuex'
import Vue from 'vue'

const stateFn = (options) => ({
    data: options.app,
})

export default (options) => {
    const state = stateFn(options)
    return {
        namespaced: true,
        state,
        mutations: {
            SET_PROP: setProp,
            SET_ITEMS: (state, payload) => {
                Vue.set(state.data.list, 'items', payload)
            },
        },
        actions: {
            setProp ({ commit }, payload) {
                commit('SET_PROP', payload)
            },
            setItems ({ commit }, payload) {
                commit('SET_ITEMS', payload)
            },
        },
        getters: {
            items: (state) => state.data.list.items,
            itemsFormatted: (state, getters) => getters.items.filter((s) => !s.hidden),
            itemsFormattedKeyOnly: (state, getters) => getters.itemsFormatted.map((s) => s.key),
        },
    }
}
