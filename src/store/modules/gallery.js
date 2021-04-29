import { set } from '@/utils/vuex'
import GalleryService from '../../services/GalleryService'

const stateFn = () => ({
    files: []
})

export default (options) => {
    const state = stateFn()
    return {
        namespaced: true,

        state,

        mutations: {
            SET_FILES: set('files'),
        },

        actions: {
            setFiles({ commit }, payload) {
                commit('SET_FILES', payload)
            },

            async clearAll({ commit }, { id }) {
                try {
                    const { success } = await GalleryService.clearAll({ id });

                    if (!success) return // TODO show message

                    commit("SET_FILES", [])

                } catch (error) {
                    console.error(error)
                }
            },

            async upload({ commit }, payload) {
                try {
                    const { success, ...response } = await GalleryService.upload({
                        id: payload.id,
                        files: payload.files
                    });

                    if (!success) return // TODO show message

                    commit("SET_FILES", response.images)

                } catch (error) {
                    this.app.setImages(response.images)
                    console.error(error)
                }
            },

        },
        
        getters: {

        },
    }
}
