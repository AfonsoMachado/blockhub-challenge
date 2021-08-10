import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

// área de armazenamento, para compartilhar entre os componentes, salva o usuario atual

export default new Vuex.Store({
  state: {
    // user: null,
    tokenAtual: '',
  },
  mutations: {
    setAtualToken(state, token) {
      state.tokenAtual = token;
      if (token) {
        axios.defaults.headers.common['Authorization'] = `bearer ${token}`;
      } else {
        delete axios.defaults.headers.common['Authorization'];
      }
      console.log('TOKEN ARMAZENADO: ', state.tokenAtual);
      console.log(axios.defaults.headers.common);
    },
  },
});
