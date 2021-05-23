import Vue from 'vue'
import App from './App.vue'
// import './registerServiceWorker'
import { Store } from './store'
import router from './router'

import vuetify from './plugins/vuetify';
import EventEmitter from 'eventemitter3';

import { EventBus, events } from '@/utils/eventBus';
import './plugins'

let store = Store()

Vue.config.productionTip = false

export default class API extends EventEmitter {

  static get events() {
    return events;
  }

  get store() {
    return store;
  }

  get undoRedoManager() {
    return {
      setCanRedo: (value) => store.dispatch('settings/setCanRedo', value),
      setCanUndo: (value) => store.dispatch('settings/setCanUndo', value),
    }
  }

  init() {
    Vue.$action = Vue.prototype.$action = (action, value) => EventBus.$emit(events.ACTION, { key: action, value });
    Vue.$isDesktop = Vue.prototype.$isDesktop = () => vuetify.breakpoint.mdAndUp;

    this.app = new Vue({
      store,
      router,
      vuetify,
      render: h => h(App)
    }).$mount('#app')

    this._attachEvents();
  }

  _attachEvents() {
    Object.keys(API.events).forEach(key => {
      EventBus.$on(API.events[key], (data) => this.emit(API.events[key], data));
    });
  }

  getEngineSlot(slot = document.getElementById("engine")) {
    if (!slot.shadowRoot) {
      return slot.attachShadow({ mode: 'open' });
    }

    return slot.shadowRoot
  }

  setEngine(slot, engine) {
    this.getEngineSlot(slot).appendChild(engine);
  }

  setSetting(payload) {
    store.dispatch(`settings/${payload.key}`, payload.value);
  }

  setImages(payload) {
    store.dispatch(`gallery/setFiles`, payload);
  }

  setConfig(config = {}) {
    store.dispatch(`engine/setConfig`, { value: config.data || config });
  }

  replaceConfig(state) {
    store.replaceState({
      ...store.state,
      engine: {
        ...state.engine,
      }
    })

    store.dispatch("settings/increaseCounter")
  }

  setSnackbar(message) {
    store.dispatch("snackbar/setState", {
      snackbar: true,
      message,
      color: "red",
    });
  }
}