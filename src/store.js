import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

// área de armazenamento, para compartilhar entre os componentes

export default new Vuex.Store({
  state: {
    isQuitVisible: false,
    user: null,
    projectAtual: null,
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
    // token sendo usado pelo usuario logado atualmente
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
    // usuario logado atualmente
    setUser(state, user) {
      state.user = user;
      console.log('USUÁRIO ATUAL ARMAZENADO', state.user.data.name);
    },
    // reseta os dados de usuario sempre que um usuario sai do sistema
    resetState(state) {
      (state.isQuitVisible = false),
        (state.user = null),
        (state.tokenAtual = '');
      console.log(state.tokenAtual);
    },
    // função usada quando é cadastrada as horas em um projeto
    setProject(state, project) {
      state.projectAtual = project;
    },
  },
});
