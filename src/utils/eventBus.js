import Vue from 'vue'

export const EventBus = new Vue()

export const events = {
    CLEAR_COMPONENT_HIGHLIGHT: "CLEAR_COMPONENT_HIGHLIGHT",
    ACTION: "ACTION",
    ENGINE_SLOT_RENDERED: "ENGINE_SLOT_RENDERED",
    PROJECT_SELECTED: "PROJECT_SELECTED",
}