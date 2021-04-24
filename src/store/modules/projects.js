import { set } from '@/utils/vuex'
import { EventBus, events } from '@/utils/eventBus'

import Vue from 'vue'
import ConfigService from '../../ConfigService'

const stateFn = () => ({
    items: {},
    current: {}
})


export default (options) => {
    const state = stateFn()
    return {
        namespaced: true,
        
        state,

        mutations: {
            
            SET_ITEMS: set('items'),

            SET_CURRENT: set('current'),

            SET_ITEM: (state, payload) => {
                Vue.set(state.items, payload.id, payload);
            },

            REMOVE_ITEM: (state, payload) => {
                Vue.set(state.items, payload.id, null);
            },

        },

        actions: {

            setItems({ commit }, payload) {
                commit('SET_ITEMS', payload)
            },

            setCurrent({ commit }, payload) {
                commit('SET_CURRENT', payload)
                EventBus.$emit(events.PROJECT_SELECTED, payload);
            },

            async fetchItems({ commit }) {

                try {
                    const { success, ...data } = await ConfigService.fetchProjects();

                    if (!success) return // TODO show message

                    const projects = Object.keys(data.projects).reduce((result, id, index) => {
                        const projectConfig = data.projects[id].projectConfig;
                        const appConfig = data.projects[id].appConfig;

                        const { title, description } = projectConfig;

                        result[id] = {
                            id,
                            config: appConfig,
                            title,
                            description
                        }

                        return result
                    }, {})

                    commit("SET_ITEMS", projects)
                } catch (error) {
                    console.error(error)
                }

            },

            async create({ commit, rootState }) {
                try {
                    const data = rootState.editableDialog.data;

                    const { success, ...project } = await ConfigService.createProject(data);

                    if (!success) return // TODO show message

                    commit("SET_ITEM", project)

                } catch (error) {
                    console.error(error)
                }
            },

            async edit({ commit, rootState }) {
                try {
                    const data = rootState.editableDialog.data;

                    const { success, ...project } = await ConfigService.editProject(data);

                    if (!success) return // TODO show message

                    commit("SET_ITEM", project)
                } catch (error) {
                    console.error(error)
                }
            },

            async remove({ commit }, payload) {
                try {
                    const { success, ...project } = await ConfigService.removeProject(payload);

                    if (!success) return // TODO show message

                    commit("REMOVE_ITEM", project)
                } catch (error) {
                    console.error(error)
                }
            }
        },

        getters: {

            filteredProjects: (state) => {
                return Object.keys(state.items).reduce((result, id) => {
                    const item = state.items[id]

                    if (item) {
                        result[id] = item
                    }

                    return result
                }, {})
            }

        },
    }
}
