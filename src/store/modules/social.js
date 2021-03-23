import { getDefaultModule } from '@/utils/vuex'

const stateFn = (options) => ({
    data: options.social,
})

const defaultItem = () => {
    return {
        id: 'social-list-items',
        componentName: 'BaseIcon',
        icon: 'mdi-twitter',
        title: 'Twitter',
    }
}

const defaultModule = getDefaultModule(defaultItem)

export default (options) => {
    const state = stateFn(options)
    return {
        namespaced: true,
        state,
        mutations: {
            ...defaultModule.mutations,
        },
        actions: {
            ...defaultModule.actions,
        },
        getters: {
            ...defaultModule.getters,
        },
    }
}
