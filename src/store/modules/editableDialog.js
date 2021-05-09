import { set } from '@/utils/vuex-builder'

const stateFn = () => ({
    visible: false,
    editMode: false,
    data: {
        title: "",
        description: "",
        id: ""
    }
})

export default (options) => {
    const state = stateFn()
    return {
        namespaced: true,

        state,

        mutations: {
            SET_VISIBLE: set('visible'),

            SET_EDIT_MODE: set('editMode'),

            SET_DATA: set('data'),
        },

        actions: {
            setVisible({ commit }, payload) {
                commit('SET_VISIBLE', payload)
            },

            setEditMode({ commit }, payload) {
                commit('SET_EDIT_MODE', payload)
            },

            setData({ commit }, payload) {
                let data = payload;

                if (!data) {
                    data = stateFn().data;
                }
                commit('SET_DATA', data);
            }
        },
        
        getters: {

        },
    }
}
