import { getDefaultModule } from '@/utils/vuex'

const stateFn = (options) => ({
    data: options.affiliates,
})

const defaultItem = () => {
    return {
        componentName: 'BaseImage',
        id: 'affiliates-list-items',
        src: './assets/logo-1-light.png',
        title: 'Affiliate Name',
        icon: 'mdi-account-convert',
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
