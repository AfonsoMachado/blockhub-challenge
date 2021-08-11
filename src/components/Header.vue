<template>
  <header id="cabecalho">
    <img src="../assets/logo2.png" alt="" />
    <div v-if="isQuitVisible">Seja bem vindo {{ user.data.name }}</div>
    <button v-if="isQuitVisible" @click="quit">
      <div>Sair</div>
    </button>
  </header>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "header",
  computed: mapState(["isQuitVisible", "user"]),
  methods: {
    quit(e) {
      e.preventDefault();

      // resetando o token
      // this.$store.commit("setAtualToken", "");
      // resetando o usuario logado
      this.$store.commit("resetState");
      // indo para a pagina inicial
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style>
#cabecalho {
  height: 80px;
  background-color: #000c1a;
  padding: 1px 25px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-bottom: 2px solid white;
}
</style>