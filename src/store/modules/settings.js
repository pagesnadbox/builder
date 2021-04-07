import { set } from '@/utils/vuex'
import Vue from 'vue'

const stateFn = () => ({
    showHighlighter: false,
    showGallery: false,
    allowEdit: false,
    ctrlDown: false,
    id: '',
    canRedo: false,
    canUndo: false,
    open: false,
    componentName: '',
    images: {},
    items: [],
    moreComponents: [],
    moreComponentsDraft: [],
    history: []
})

export default (options) => {
    const state = stateFn()
    return {
        namespaced: true,
        state,
        mutations: {
            SET_SHOW_HIGHLIGHTER: set('showHighlighter'),
            SET_CAN_REDO: set('canRedo'),
            SET_CAN_UNDO: set('canUndo'),
            SET_ALLOW_EDIT: set('allowEdit'),
            SET_CTR_DOWN: set('ctrlDown'),
            SET_GALLERY_SHOW: set('showGallery'),
            SET_ID: set('id'),
            SET_ITEMS: set('items'),
            SET_OPEN: set('open'),
            SET_COMPONENT_NAME: set('componentName'),
            SET_COMPONENTS: set('moreComponents'),
            ADD_COMPONENT: (state, payload) => {
                state.moreComponentsDraft.push(payload)
            },
            SET_IMAGE: (state, payload) => {
                Vue.set(state.images, payload.name, payload.value)
            },
            REMOVE_COMPONENT: (state, payload) => {
                const index = state.moreComponentsDraft.findIndex(c => c.id === payload.id)
                if (index > -1) {
                    state.moreComponentsDraft.splice(index, 1)
                }
            },
            ADD_TO_HISTORY: (state, payload) => {
                if (payload.id && payload.name) {
                    let data = payload;
                    const index = state.history.findIndex(c => c.id === payload.id)
                    if (index > -1) {
                        data = state.history.splice(index, 1)[0];
                    } else {
                    }
                    state.history.push(data)
                }
            },
        },
        actions: {
            setShowHighlighter({ commit }, payload) {
                commit('SET_SHOW_HIGHLIGHTER', payload)
            },
            setCanRedo({ commit }, payload) {
                commit('SET_CAN_REDO', payload)
            },
            setCanUndo({ commit }, payload) {
                commit('SET_CAN_UNDO', payload)
            },
            setCtrlDown({ commit }, payload) {
                commit('SET_CTR_DOWN', payload)
            },
            setAllowEdit({ commit }, payload) {
                commit('SET_ALLOW_EDIT', payload)
            },
            setOpen({ commit }, payload) {
                commit('SET_OPEN', payload)
            },
            setComponentName({ commit }, payload) {
                commit('SET_COMPONENT_NAME', payload)
            },
            setComponent({ commit }, payload) {
                commit('SET_COMPONENT_NAME', payload.name)
                commit('SET_ID', payload.id)
                commit('ADD_TO_HISTORY', payload)
            },
            setComponents({ commit, state }) {
                commit('SET_COMPONENTS', [...state.moreComponentsDraft])
            },
            resetComponents({ commit }) {
                commit('SET_COMPONENTS', [])
            },
            addComponent({ commit }, payload) {
                commit('ADD_COMPONENT', payload)
            },
            setImage({ commit }, payload) {
                commit('SET_IMAGE', payload)
            },
            removeComponent({ commit }, payload) {
                commit('REMOVE_COMPONENT', payload)
            },
            setComponentId({ commit }, payload) {
                commit('SET_ID', payload)
            },
            setItems({ commit }, payload) {
                commit('SET_ITEMS', payload)
            },
            setShowGallery({ commit }, payload) {
                commit('SET_GALLERY_SHOW', payload)
            },
        },
        getters: {

        },
    }
}
