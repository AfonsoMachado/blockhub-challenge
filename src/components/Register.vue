<template>
  <div class="container">
    Cadastro de Usuário
    <div id="register-box">
      <form method="POST" @submit="registerUser">
        <div class="form">
          <legend>Nome</legend>
          <input
            type="text"
            name="name"
            id="name"
            value=""
            v-model="user.name"
          />
          <legend>E-mail</legend>
          <input
            type="text"
            name="email"
            id="email"
            value=""
            v-model="user.email"
          />
          <legend>Senha</legend>
          <input
            type="password"
            name="password"
            id="password"
            value=""
            v-model="user.password"
          />
        </div>

        <div id="botao">
          <button type="submit">Cadastrar-se</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { baseApiUrl, showError } from "../global";

export default {
  name: "RegisterForm",
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async registerUser(e) {
      e.preventDefault();

      const data = {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
      };

      console.log(data);

      const res = await axios.post(`${baseApiUrl}/register`, data);

      console.log("USUARIO NOVO", res);
    },
  },
};
</script>

<style>
#register-box {
  width: 30%;
}

#botao {
  display: flex;
  justify-content: center;
  margin-top: 5%;
}
</style>