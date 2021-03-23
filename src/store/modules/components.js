import { set } from '@/utils/vuex'

const stateFn = () => ({
    items: [],
})

export default (options) => {
    const state = stateFn()
    return {
        namespaced: true,
        state,
        mutations: {
            SET_ITEMS: set('items'),
        },
        actions: {
            setItems ({ commit }, payload) {
                commit('SET_ITEMS', payload)
            },
        },
        getters: {

        },
    }
}
