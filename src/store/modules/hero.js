import Vue from "vue";
import { getDefaultModule } from '@/utils/vuex'

const stateFn = (options) => ({
    data: options.hero,
})

const defaultModule = getDefaultModule()

export default (options) => {
    const state = stateFn(options)
    return {
        namespaced: true,
        state,
        mutations: {
            ...defaultModule.mutations,
            SET_ITEMS: (state, payload) => {
                Vue.set(state.data.resizeContainer.list, 'items', payload)
            },
            ADD_ITEM: (state, payload) => {
                state.data.list.resizeContainer.items.push(payload)
            },
            REMOVE_ITEM: (state, payload) => {
                state.data.list.resizeContainer.items.splice(payload, 1)
            },
        },
        actions: {
            ...defaultModule.actions,
        },
        getters: {
            ...defaultModule.getters,
        },
    }
}