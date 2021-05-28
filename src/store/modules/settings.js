import { set } from '@/utils/vuex-builder'
import Vue from 'vue'
import { EventBus, events } from '../../utils/eventBus'

const stateFn = () => ({
    id: '',
    counter: 0,
    allowEdit: false,
    open: false,
    showHighlighter: false,
    images: {},
    compact: false,
    bottom: false,
    showGallery: false,
    ctrlDown: false,
    canRedo: false,
    canUndo: false,
    componentName: '',
    items: [],
    moreComponents: [],
    moreComponentsDraft: [],
    history: [],
    fullscreen: false,
    engineUrl: window.com.builder.cfg.engineUrl
        .replace("{host}", window.location.hostname)
        .replace("{protocol}", window.location.protocol)
        .replace("{port}", window.location.port ? `:${window.location.port}` : "")
})

export default (options) => {
    const state = stateFn()
    return {
        namespaced: true,

        state,

        mutations: {
            INCREASE_COUNTER: (state) => {
                state.counter++
            },

            SET_FULLSCREEN: set('fullscreen'),

            SET_SHOW_HIGHLIGHTER: set('showHighlighter'),

            SET_CAN_REDO: set('canRedo'),

            SET_CAN_UNDO: set('canUndo'),

            SET_ALLOW_EDIT: set('allowEdit'),

            SET_CTR_DOWN: set('ctrlDown'),

            SET_GALLERY_SHOW: set('showGallery'),

            SET_ID: set('id'),

            SET_ITEMS: set('items'),

            SET_OPEN: set('open'),

            SET_COMPACT: set('compact'),

            SET_BOTTOM: set('bottom'),

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
            setFullscreen({ commit }, payload) {
                localStorage.setItem("pagesandbox_builder_fullscreen", payload)
                commit('SET_FULLSCREEN', payload)
            },

            setShowHighlighter({ commit }, payload) {
                Vue.$action("settings/setShowHighlighter", payload);

                commit('SET_SHOW_HIGHLIGHTER', payload)
            },

            setCanRedo({ commit }, payload) {
                commit('SET_CAN_REDO', payload)
            },

            increaseCounter({ commit }) {
                commit('INCREASE_COUNTER')
            },

            setCanUndo({ commit }, payload) {
                commit('SET_CAN_UNDO', payload)
            },

            setCtrlDown({ commit }, payload) {
                commit('SET_CTR_DOWN', payload)
            },

            setAllowEdit({ commit }, payload) {
                Vue.$action("settings/setAllowEdit", payload);
                commit('SET_ALLOW_EDIT', payload)
            },

            setOpen({ commit }, payload) {
                Vue.$action("settings/setOpen", payload);

                commit('SET_OPEN', payload)
            },

            setCompact({ commit }, payload) {
                commit('SET_COMPACT', payload)
            },

            setBottom({ commit }, payload) {
                commit('SET_BOTTOM', payload)
            },

            toggleCompact({ dispatch, commit, state }) {
                if (!state.compact) {
                    dispatch("settings/setOpen", true, { root: true });
                }
                commit('SET_COMPACT', !state.compact)
            },

            setComponentName({ commit }, payload) {
                commit('SET_COMPONENT_NAME', payload)
            },

            setComponent({ commit }, payload) {
                Vue.$action("settings/setComponentId", payload.id);

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
                Vue.$action("settings/setImage", payload);

                commit('SET_IMAGE', payload)
            },

            removeComponent({ commit }, payload) {
                commit('REMOVE_COMPONENT', payload)
            },

            setComponentId({ commit }, payload) {
                Vue.$action("settings/setComponentId", payload);

                commit('SET_ID', payload)
            },

            setItems({ commit }, payload) {
                commit('SET_ITEMS', payload)
            },

            setShowGallery({ commit }, payload) {
                Vue.$action("settings/setShowGallery", payload);

                commit('SET_GALLERY_SHOW', payload)
            },
        },

        getters: {

        },
    }
}
