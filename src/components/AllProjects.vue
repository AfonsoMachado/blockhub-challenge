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
            <td style="text-align: center">{{ hours[index] }} horas</td>
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
    <Pie v-if="loaded" :chartdata="chartdata" :labelsdata="labelsdata" />
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
// eslint-disable-next-line no-unused-vars
import { baseApiUrl, showError } from "../global";
import Pie from "./Chart.vue";

export default {
  components: { Pie },
  name: "AllProjects",
  computed: mapState(["user"]),
  data() {
    return {
      projects: [],
      hours: [],
      loaded: false,
      chartdata: null,
    };
  },
  async mounted() {
    // executar quando o componente é renderizada
    await this.getProjects();
    await this.getHours();

    this.loaded = false;
    try {
      this.chartdata = this.hours;
      this.labelsdata = this.projects;
      this.loaded = true;
    } catch (e) {
      console.error(e);
    }
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

      console.log("RESPOSTA PROJETOS: ", res.data);
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
      console.log("RESPOSTA HORAS: ", res.data);
      // calcula o total de horas por compelto
      this.hours = this.calculateHours();

      //  IMPLEMENTAR CALCULO DO TOTAL DE HORAS POR USUARIO
    },
    calculateHours() {
      let totalHoras = [];
      console.log("USER", this.user.data._id);
      for (let i = 0; i < this.projects.length; i++) {
        // console.log(this.projects[i]._id);
        let total = 0;
        for (const hour of this.hours) {
          if (
            this.projects[i]._id == hour.project &&
            this.user.data._id == hour.user
          ) {
            total += hour.hours;
          }
        }
        console.log("TOTAL POR INDICE: ", total);
        totalHoras[i] = total;
      }

      console.log("TOTAL HORAS: ", totalHoras);
      return totalHoras;
    },
    // async getProjectId(id) {
    //   const projectId = await axios.get(`${baseApiUrl}/hours`)
    // },
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
