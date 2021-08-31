import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user_info: { // 追加
      uid: '',
      "access-token": '',
      client: '',
      id: '',
    },
    login_status: false,
    railsURL: "http://localhost:3000",
    // railsURL: 'https://www.sakuraproto.com',
    message: {
      title: "",
      body: "",
      year: "",
      month: "",
      day: "",
      house: "",
      minute: "",
      to_id: 0,
      image: ''
    }
  },
  mutations: {
    USER_LOGIN(state, user_info) {
      state.user_info = user_info
    },
    KEEP_LOGIN(state, login_status) {
      state.login_status = login_status
    },
    SAVE_MESSAGE(state, message) {
      state.message = message
    }
  },
  actions: {
    async userLogin({ commit }, user_info) {
      commit('USER_LOGIN', user_info)
      return user_info
    },
    async keepLogin({ commit }, login_status) {
      commit('KEEP_LOGIN', login_status)
      return login_status
    },
    async saveMessage({ commit }, message) {
      commit('SAVE_MESSAGE', message)
      return message
    },
  },
  plugins: [createPersistedState({})],
  modules: {
  }
})
