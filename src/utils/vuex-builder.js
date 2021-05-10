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
    let paths = payload.id.split("-").slice(1);
    
    paths.forEach(path => {
      data = data.slots[path];
    });

    Vue.set(data, payload.key, payload.value)
}

export const getDefaultModule = () => {
    return {
        mutations: {
            SET_PROP: setProp,
        },

        actions: {
            setProp ({ commit }, payload) {
                commit('SET_PROP', payload)
            },
        },
        getters: {
        },
    }
}
