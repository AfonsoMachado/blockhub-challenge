<template>
  <div class="container">
    Tela de login
    <div id="login-box">
      <form class="form-login" method="POST" @submit="loginUser">
        <div class="form-container">
          <legend>E-mail</legend>
          <input
            type="text"
            name="email"
            id="email"
            value=""
            v-model="login.email"
          />
          <legend>Senha</legend>
          <input
            type="password"
            name="password"
            id="password"
            value=""
            v-model="login.password"
          />
        </div>

        <div id="botoes">
          <button type="submit">Login</button>
          <router-link to="/register">
            <button type="button">Cadastre-se</button>
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { baseApiUrl, showError } from "../global";

let tokenAtual = "";

export default {
  name: "LoginForm",
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async loginUser(e) {
      e.preventDefault();

      console.log("dados para login");

      // os dados estão sendo identificados corretamente
      const data = {
        email: this.login.email,
        password: this.login.password,
      };

      // const dataJSON = JSON.stringify(data);
      // console.log(dataJSON);

      const res = await axios
        .post(`${baseApiUrl}/login`, data)
        .then((res) => res)
        .catch(function (error) {
          if (error.response) {
            //FAZER O TRATAMENTO DE ERRO
            console.log(error.response.data.statusCode);
          }
        });
      console.log("RESPOSTA", res);
      tokenAtual = res.data.access_token;
      console.log(tokenAtual);
    },
  },
};
</script>

<style>
.container {
  /* width: 100vw;
  height: 100vh; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.form-container {
  display: flex;
  flex-direction: column;
  /* align-items: ; */
}

legend {
  align-self: flex-start;
}

button {
  width: 123px;
  height: 37px;
  border-radius: 32px;
  color: #1aafd3;
  background-color: rgba(52, 202, 219, 0.1);
  border: 2px solid #1d5c99;
  font-family: Poppins, sans-serif;
  font-size: 15px;
  cursor: pointer;
  /* letter-spacing: .15rem; */
}

button:hover {
  color: #fff;
  border: 2px solid #fff;
}

#login-box {
  width: 30%;
}

#botoes {
  display: flex;
  justify-content: space-between;
  margin-top: 5%;
}
</style>