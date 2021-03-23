import { getDefaultModule } from '@/utils/vuex'

const stateFn = (options) => ({
    data: options.features,
})

const defaultItem = () => {
    return {
        componentName: 'BaseInfoCard',
        id: 'features-list-items',
        editableProps: false,
        align: 'center',
        icon: 'mdi-keyboard-outline',
        title: 'Trendy Design',
        text: 'Efficiently unleash media information without cross-media value. Quickly maximize value timely deliverables schemas.',
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
