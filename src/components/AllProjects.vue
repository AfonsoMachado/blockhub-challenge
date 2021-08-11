<template>
  <div class="container">
    Projetos
    <!-- Listar todos os projetos -->
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
  },
  methods: {
    async getProjects() {
      const res = await axios
        .get(`${baseApiUrl}/profile`)
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
</style>