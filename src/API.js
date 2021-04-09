import Vue from 'vue'
import App from './App.vue'
// import './registerServiceWorker'
import { Store } from './store'

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

  init() {
    Vue.$action = Vue.prototype.$action = (action, value) => EventBus.$emit(events.ACTION, { key: action, value });
    Vue.$isDesktop = Vue.prototype.$isDesktop = () => vuetify.breakpoint.mdAndUp;

    this.app = new Vue({
      store,
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

  getEngineSlot() {
    if (!this.engineSlot) {
      this.engineSlot = document.getElementById("engine").attachShadow({ mode: 'open' });
    }

    return this.engineSlot;
  }

  setEngine(engine) {
    this.getEngineSlot().appendChild(engine);
  }

  setSetting(payload) {
    store.dispatch(`settings/${payload.key}`, payload.value);
  }

  setConfig(config) {
    store.dispatch("engine/setConfig", config);
  }

}