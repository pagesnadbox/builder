import { getDefaultModule } from '@/utils/vuex'

const stateFn = (options) => ({
    data: options.themeFeatures,
})

const defaultItem = () => {
    return {
        componentName: 'BaseAvatarCard',
        outlined: true,
        editableProps: false,
        id: 'themeFeatures-list-items',
        title: 'Pixel Perfect Design',
        icon: 'mdi-fountain-pen-tip',
        align: 'center',
        text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
          illum veniam cum dolores ratione commodi beatae quas maxime,
          laboriosam excepturi solut!`,
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
