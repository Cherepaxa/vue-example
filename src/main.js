import Vue from 'vue'

import App from './App'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'
import Storage from 'vue-ls'

import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue'

Vue.use(Storage, {
  namespace: 'vuejs__',
  name: 'ls',
  storage: 'local'
})
Vue.use(BootstrapVue)

export function createApp () {
  const router = createRouter()
  const store = createStore()
  sync(store, router)

  const app = new Vue({
    router,
    store,
    render: (h) => h(App)
  })

  return { app, router, store }
}
