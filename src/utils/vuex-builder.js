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

export const addSlot = (state, payload) => {
    let data = state.data.app;
    let paths = payload.id.split("-").slice(1);

    paths.forEach(path => {
        data = data.slots[path];
    });

    if (!data.slots) {
        Vue.set(data, "slots", {})
    }

    data = data.slots;

    Vue.set(data, payload.key, payload.value)
}

export const getDefaultModule = () => {
    return {
        mutations: {
            SET_PROP: setProp,
            ADD_SLOT: addSlot,
        },

        actions: {
            setProp ({ commit }, payload) {
                commit('SET_PROP', payload)
            },
            addSlot({ commit }, payload) {
                commit('ADD_SLOT', payload)
            },
        },
        
        getters: {
        },
    }
}
