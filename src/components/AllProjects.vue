<template>
  <div class="projects-container">
    Projetos atuais
    <!-- Listar todos os projetos -->
    <div class="projects-table">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>TESTE PORRA</td>
          </tr>
        </tbody>
      </table>
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
    };
  },
  mounted() {
    // executar quando o componente é renderizada
    this.getProjects();
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
}
</style>