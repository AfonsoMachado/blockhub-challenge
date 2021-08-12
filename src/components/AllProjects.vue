<template>
  <div class="projects-container">
    Projetos atuais
    <!-- Listar todos os projetos -->
    <div class="projects-table">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Horas Trabalhadas</th>
            <th>Cadastrar horas</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(project, index) in projects" :key="project._id">
            <td>{{ index }} - {{ project.name }}</td>
            <td style="text-align: center">5</td>
            <td style="text-align: center; font-size: 20px">
              <strong><a id="link" @click="addHours(project)">+</a></strong>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- <ul id="example-1">
        <li>exemplo</li>
        <li v-for="project in projects" :key="project._id">
          {{ project.name }}
        </li>
      </ul> -->
    </div>
    <div id="new-project-container">
      <router-link to="/project">
        <button id="new-project">Cadastrar Novo Projeto</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { baseApiUrl, showError } from "../global";

export default {
  name: "AllProjects",
  data() {
    return {
      projects: [],
      hours: [],
    };
  },
  mounted() {
    // executar quando o componente é renderizada
    this.getProjects();
    this.getHours();
  },
  methods: {
    async getProjects() {
      // capturando dados dos projetos da api
      const res = await axios
        .get(`${baseApiUrl}/project`)
        .then((res) => res)
        .catch((error) => {
          if (error.response) {
            //FAZER O TRATAMENTO DE ERRO
            console.log(error.response.data.statusCode);
          }
        });

      console.log("RESPOSTA PROJETOS:", res.data);
      this.projects = res.data;
    },

    addHours(project) {
      // capturando o projeto corretamente
      console.log(project);
      // setando o projeto clicado, para usar o id posteriomente
      this.$store.commit("setProject", project);
      // inddo para a pagina de horas
      this.$router.push({ path: "/hours" });
    },
    async getHours() {
      const res = await axios
        .get(`${baseApiUrl}/hours`)
        .then((res) => res)
        .catch((error) => {
          if (error.response) {
            //FAZER O TRATAMENTO DE ERRO
            console.log(error.response.data.statusCode);
          }
        });
      this.hours = res.data;
      console.log(res.data);
    },
  },
};
</script>

<style>
.projects-container {
  /* width: 100vw;
  height: 100vh; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 30px;
}

.projects-table {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  text-align: left;
}

#link {
  color: white;
  cursor: pointer;
  margin-left: 10px;
}

#link:hover {
  color: gray;
}

#new-project {
  width: 250px;
}

#new-project-container {
  margin-top: 30px;
}

th {
  text-align: center;
}
</style>
