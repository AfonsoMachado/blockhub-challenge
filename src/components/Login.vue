<template>
  <div class="container">
    <div style="font-size: 20px">
      Sistema para Controle de Horas Trabalhadas
    </div>
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
          <!-- COMO MUDAR DE TELA SÓ DEPOIS QUE LOGAR? -->
          <!-- <router-link to="/project"> -->
          <button type="submit" @click="loginUser">Login</button>
          <!-- </router-link> -->
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

      // os dados estão sendo identificados corretamente
      const data = {
        email: this.login.email,
        password: this.login.password,
      };

      // const dataJSON = JSON.stringify(data);
      // console.log(dataJSON);

      const res = await axios
        .post(`${baseApiUrl}/login`, data)
        .then(async (res) => {
          // mandando o token atual para o arquivo global de store
          this.$store.commit("setAtualToken", res.data.access_token);

          // buscar o profile atravez do token primeiro
          const user = await this.getLoggedUser();
          this.$store.commit("setUser", user);
          // Persistindo no local storage
          // localStorage.setItem(token, JSON.stringify(res.data));
          // navega para a pagina de  projetos em caso de login corretamente
          this.$router.push({ path: "/projects" });
          this.$store.commit("toggleMenu", true);
          return res;
        })
        .catch(function (error) {
          if (error.response) {
            //FAZER O TRATAMENTO DE ERRO
            console.log(error.response.data.statusCode);
          }
        });
      console.log("RESPOSTA", res);
    },
    async getLoggedUser() {
      return await axios.get(`${baseApiUrl}/profile`);
      // usuário sendo buscado da api ok!
      // console.log("VERIFICANDO PERFIL", user.data);
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

  margin-top: 30px;
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

button:active {
  color: #308094;
  background-color: rgba(39, 154, 167, 0.1);
}

#login-box {
  width: 30%;
  margin-top: 30px;
}

#botoes {
  display: flex;
  justify-content: space-between;
  margin-top: 5%;
}
</style>