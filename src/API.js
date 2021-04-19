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

  get currentProjectConfig() {
    return store.state.projects.current.config;
  }

  get currentProjectId() {
    return store.state.projects.current.id;
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

  setConfig(config) {
    store.dispatch("engine/setConfig", config);
  }

}