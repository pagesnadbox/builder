import Vue from 'vue'

export const set = (property, preState) => {
    return (state, payload) => {
        if (preState) {
            Vue.set(preState, property, payload)
        } else {
            Vue.set(state, property, payload)
        }
    }
}

export const toggle = property => state => (state[property] = !state[property])

export const setProp = (state, payload) => {
    let data = state.data;
    let paths = payload.id.split("-");
    
    paths = paths.slice(1);
    paths.forEach(path => {
      data = data[path];
    });

    Vue.set(data, payload.key, payload.value)
}

export const getDefaultModule = (defaultItem) => {
    return {
        mutations: {
            SET_PROP: setProp,

            SET_ITEMS: (state, payload) => {
                Vue.set(state.data.list, 'items', payload)
            },

            ADD_ITEM: (state, payload) => {
                state.data.list.items.push(payload)
            },

            REMOVE_ITEM: (state, payload) => {
                state.data.list.items.splice(payload, 1)
            },

        },

        actions: {
            setProp ({ commit }, payload) {
                commit('SET_PROP', payload)
            },

            setItems ({ commit }, payload) {
                commit('SET_ITEMS', payload)
            },

            addItem ({ commit, state }) {
                const item = defaultItem()

                commit('ADD_ITEM', item)
            },

            removeItem ({ commit }, payload) {
                commit('REMOVE_ITEM', payload)
            },
        },
        
        getters: {
            items: (state) => state.data.list.items,
        },
    }
}
