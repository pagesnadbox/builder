import Vue from 'vue'

export const EventBus = new Vue()

export const events = {
    ACTION: "ACTION",
    ENGINE_SLOT_RENDERED: "ENGINE_SLOT_RENDERED",
    PROJECT_SELECTED: "PROJECT_SELECTED",
    HISTORY_RESET: "HISTORY_RESET",
    HISTORY_UNDO: "HISTORY_UNDO",
    HISTORY_REDO: "HISTORY_REDO",
}

export const eventsInternal = {
    ON_IMAGE_CLICK: "ON_IMAGE_CLICK"
}