import Vue from 'vue'
import Vuex from 'vuex'
import {fetchApi} from './api'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      global: {},
      themeColor: 'light2',
      api: {}
    },
    mutations: {
      changeThemeColor (state, themeColor) {
        console.log('Change theme to', themeColor)
        state.themeColor = themeColor
      },
      SET_API: (state, data) => {
        state.api = data
      }
    },
    actions: {
      REQUEST_API: ({state, dispatch}, props) => {
        if (Object.keys(state.api).length !== 0) {
          return Promise.resolve()
        }
        return dispatch('FETCH_API', props)
      },
      FETCH_API: ({commit}, props) => {
        return fetchApi(props)
          .then((data) => {
            commit('SET_API', data)
          })
      }
    },
    getters: {
    }
  })
}
