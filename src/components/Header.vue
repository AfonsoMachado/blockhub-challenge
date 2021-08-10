<template>
  <header id="cabecalho">
    <img src="../assets/logo2.png" alt="" />
    <div v-if="isQuitVisible">Seja bem vindo {{ user.data.name }}</div>
    <button v-if="isQuitVisible">
      <div>Sair</div>
    </button>
  </header>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "header",
  computed: mapState(["isQuitVisible", "user"]),
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