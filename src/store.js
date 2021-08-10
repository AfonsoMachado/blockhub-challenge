import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

// área de armazenamento, para compartilhar entre os componentes, salva o usuario atual

export default new Vuex.Store({
  state: {
    user: null,
  },
});
