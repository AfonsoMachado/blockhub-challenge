import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

// área de armazenamento, para compartilhar entre os componentes, salva o usuario atual

export default new Vuex.Store({
  state: {
    user: null,
    tokenAtual: '',
  },
  mutations: {
    setUser(state, user, token) {
      state.user = user;
      if (user) {
        axios.defaults.headers.common['Authorization'] = `bearer ${token}`;
      } else {
        delete axios.defaults.headers.common['Authorization'];
      }
    },
  },
});
