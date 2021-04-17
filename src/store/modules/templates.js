import { set } from '@/utils/vuex'

import config from "@/appConfig"

const stateFn = () => ({
    items: {}
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
            setItems({ commit }, payload) {
                commit('SET_ITEMS', payload)
            },
            fetchItems({ commit }, payload) {
                // const templates = fetch('/templates');

                const templates = [1, 2, 3, 4, 5, 6].reduce((result, id) => {
                    result[id] = {
                        id,
                        config: JSON.parse(JSON.stringify(config)),
                        image: `/assets/article-${id}.jpg`,
                        title: `Template ${id}`,
                        description: "Laboris magna laborum incididunt aliqua commodo minim velit irure sunt incididunt nisi commodo. Ea dolor nulla magna ex ut tempor nostrud excepteur id sit est qui eu ipsum. Laboris proident ex amet labore adipisicing qui excepteur in qui officia eiusmod cillum mollit aliquip. Deserunt esse et fugiat ut est veniam ea pariatur adipisicing incididunt. Velit fugiat amet cupidatat sunt veniam pariatur adipisicing. Aliquip elit magna nisi cupidatat sit tempor consequat adipisicing nulla non consectetur. Ad nostrud sint elit cillum amet cillum cupidatat anim culpa magna consequat cillum."
                    }

                    return result
                }, {})

                commit("SET_ITEMS", templates)
            }
        },
        getters: {

        },
    }
}
