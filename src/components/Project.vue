<template>
  <div class="container">
    Cadastro de projeto
    <div id="project-box">
      <form method="POST" @submit="cadProject">
        <div class="form-container">
          <label for="name">Nome do projeto</label>
          <input
            type="text"
            name="name"
            id="name"
            value=""
            v-model="project.name"
          />
        </div>
        <div id="botao">
          <button id="cdp" type="submit">Cadastrar Projeto</button>
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
  name: "ProjectForm",
  data() {
    return {
      project: {
        name: "",
      },
    };
  },
  methods: {
    async cadProject(e) {
      e.preventDefault();

      const data = {
        name: this.project.name,
      };

      console.log(data);

      const res = await axios.post(
        "https://api-desafio-blockub.herokuapp.com/project",
        data
      );

      console.log("PROJETO NOVO", res);
      this.$router.push({ path: "/projects" });
    },
  },
};
</script>

<style>
#project-box {
  width: 30%;
}

#botao2 {
  display: flex;
  justify-content: center;
  margin-top: 5%;
}

#cdp {
  width: 200px;
}
</style>