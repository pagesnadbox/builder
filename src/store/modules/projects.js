import { set } from '@/utils/vuex-builder'

import ConfigService from '../../services/ConfigService'

const stateFn = () => ({
    project: null,
})


export default (options) => {
    const state = stateFn()
    return {
        namespaced: true,
        
        state,

        mutations: {
            SET_PROJECT: set('project'),
        },

        actions: {

            async fetchProject({ commit, rootState }) {
                try {
                    const data = rootState.editableDialog.data;

                    const { success, ...project } = await ConfigService.fetchProject(data);

                    if (!success) return // TODO show message

                    commit("SET_PROJECT", project)

                } catch (error) {
                    console.error(error)
                }
            },

            async create({ commit, rootState }) {
                try {
                    const data = rootState.editableDialog.data;

                    const { success, ...project } = await ConfigService.createProject(data);

                    if (!success) return // TODO show message

                    commit("SET_PROJECT", project)

                } catch (error) {
                    console.error(error)
                }
            },

            async edit({ commit, rootState }) {
                try {
                    const data = rootState.editableDialog.data;

                    const { success, ...project } = await ConfigService.editProject(data);

                    if (!success) return // TODO show message

                    commit("SET_PROJECT", project)
                } catch (error) {
                    console.error(error)
                }
            },

            async remove({ commit }, payload) {
                try {
                    const { success, ...project } = await ConfigService.removeProject(payload);

                    if (!success) return // TODO show message

                    commit("SET_PROJECT", null)
                } catch (error) {
                    console.error(error)
                }
            }
        },

        getters: {
        },
    }
}
