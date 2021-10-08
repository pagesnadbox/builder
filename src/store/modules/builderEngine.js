import Vue from 'vue'
import { set } from '@/utils/vuex-builder'
import { v4 as uuidv4 } from 'uuid';


const stateFn = (options) => {
    return {
        data: {},
    }
}

function addSlot(state, payload) {
    const parentId = payload.parentId

    Vue.set(state.data, payload.id, payload)
    state.data[parentId].slots.push(payload.id)
}

function removeSlot(state, payload) {
    const id = payload.id
    const parentId = payload.parentId
    const parent = state.data[parentId];

    const slotIndex = parent.slots.indexOf(id)

    if (slotIndex > -1) {
        parent.slots.splice(slotIndex, 1)
    }

    if (payload.slots?.length) {
        payload.slots.forEach(s => {
            removeSlot(state, state.data[s])
        })
    }

    Vue.delete(state.data, id);
}

function moveSlot(state, payload) {
    const id = payload.item.id;
    const to = state.data[payload.to];
    const parentId = payload.item.parentId

    if (!payload.copy) {
        const parent = state.data[parentId];
        const slotIndex = parent.slots.indexOf(id)

        if (slotIndex > -1) {
            parent.slots = parent.slots.filter(function (slotId) {
                return slotId !== id;
            });
        }
    }

    to.slots = [
        ...to.slots,
        id
    ]
    setProp(state, { id, key: "parentId", value: to.id })
}

function changePosition(state, payload) {
    const id = payload.item.id;
    const to = payload.to;
    const parentId = payload.item.parentId;
    const parent = state.data[parentId];

    const toIndex = parent.slots.indexOf(to);
    const fromIndex = parent.slots.indexOf(id);

    const slots = [...parent.slots]

    if (fromIndex > -1 && toIndex > -1) {
        slots.splice(fromIndex, 1);
        slots.splice(toIndex, 0, id);
        parent.slots = [...slots]
    }
}

function copy(state, payload) {
    let item = JSON.parse(JSON.stringify(state.data[payload.id]));
    let id = uuidv4();
    let slots = []

    if (item.slots.length) {
        slots = item.slots.map((s) => {
            const item = copy(state, { id: s, parentId: id })
            return item.id
        })
    }

    item = {
        ...item,
        id,
        parentId: payload.parentId,
        slots
    }

    Vue.set(state.data, id, item)

    return item
}

function copySlot(state, payload) {
    const item = copy(state, payload)
    const parent = state.data[payload.parentId];
    const index = parent.slots.indexOf(payload.id);

    const slots = [...parent.slots]
    slots.splice(index, 0, item.id)
    parent.slots = [...slots]
}

function setProp(state, payload) {
    state.data[payload.id] = {
        ...state.data[payload.id],
        [payload.key]: payload.value
    }
}

export default (options) => {
    const state = stateFn()
    return {
        namespaced: true,

        state,

        mutations: {
            SET_CONFIG: (state, payload) => {
                state.data = payload.value
            },

            SET_PROP: setProp,

            ADD_SLOT: addSlot,

            REMOVE_SLOT: removeSlot,

            MOVE_SLOT: moveSlot,

            COPY_SLOT: copySlot,

            CHANGE_POSITION: changePosition,
        },

        actions: {
            setConfig({ commit, dispatch }, payload) {
                commit('SET_CONFIG', payload)
                dispatch("settings/increaseCounter", null, { root: true })
            },

            setProp({ commit }, payload) {
                commit('SET_PROP', payload)
            },

            addSlot({ commit, dispatch }, payload) {
                const slotData = { ...payload, id: uuidv4() };

                commit('ADD_SLOT', slotData)
                dispatch("settings/increaseCounter", null, { root: true })

                return slotData;
            },

            removeSlot({ commit, dispatch }, payload) {
                commit('REMOVE_SLOT', payload)
                dispatch("settings/increaseCounter", null, { root: true })
            },

            moveSlot({ commit, dispatch }, payload) {
                commit('MOVE_SLOT', payload)
                dispatch("settings/increaseCounter", null, { root: true })
            },

            changePosition({ commit, dispatch }, payload) {
                commit('CHANGE_POSITION', payload)
                dispatch("settings/increaseCounter", null, { root: true })
            },

            copySlot({ commit, dispatch }, payload) {
                commit('COPY_SLOT', payload)
                dispatch("settings/increaseCounter", null, { root: true })
            },
        },

        getters: {
            getComponent: (state) => (id) => {
                return state.data[id] || {}
            }
        },
    }
}
