<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Desafio Tech - Blockhub"/> -->

    <Header />

    <!-- Tela de login -->
    <!-- <Login />
    <Register /> -->

    <router-view> </router-view>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Header from "./components/Header.vue";

export default {
  name: "App",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    HelloWorld,
    // eslint-disable-next-line vue/no-unused-components
    Login,
    // eslint-disable-next-line vue/no-unused-components
    Register,
    Header,
  },
};
</script>

<style>
#app {
  font-family: Poppins, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  /* margin-top: 60px; */
}

/* CONFIGURAÇÕES PADRÃO DO HTML */

/* html {
  height: 100%;
} */

body {
  margin: 0;
  background-color: #000c1a;
  /* 0D262D */
  color: #fff;
  height: 100%;
}
</style>
