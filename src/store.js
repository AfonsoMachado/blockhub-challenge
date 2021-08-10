import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

// área de armazenamento, para compartilhar entre os componentes, salva o usuario atual

export default new Vuex.Store({
  state: {
    isQuitVisible: false,
    user: null,
    tokenAtual: '',
  },
  mutations: {
    toggleMenu(state, isVisible) {
      // Evitar que o menu apareça quando o usuario n estiver setado
      if (!state.user) {
        state.isQuitVisible = false;
        return;
      }

      if (isVisible === undefined) {
        state.isQuitVisible = !state.isQuitVisible;
      } else {
        state.isQuitVisible = isVisible;
      }
    },
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
    setUser(state, user) {
      state.user = user;
      console.log('USUÁRIO ATUAL ARMAZENADO', state.user.data.name);
    },
  },
});
