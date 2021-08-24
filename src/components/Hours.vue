<template>
  <div class="container">
    Cadastro de horas trabalhadas

    <div>Projeto: {{ projectAtual.name }}</div>
    <div id="hours-box">
      <form action="POST" @submit="cadHours">
        <div class="form-container">
          <label for="">Data</label>
          <input type="date" name="day" id="day" value="" v-model="hours.day" />

          <label for="">Quantidade de horas</label>
          <input
            type="number"
            name="hours"
            id="hours"
            value=""
            v-model="hours.hours"
          />
        </div>

        <div id="botao">
          <button id="cad-hours" type="submit">Cadastrar horas</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import { baseApiUrl } from "../global";

export default {
  name: "Hours",
  // tentando passar dados de um componente para o outros
  computed: mapState(["projectAtual", "user"]),
  data() {
    return {
      hours: {
        hours: 0,
        day: "",
        project: "",
        user: "",
      },
    };
  },
  methods: {
    async cadHours(e) {
      e.preventDefault();

      // dados para efetua o cadastramento das horas no sistema
      const data = {
        hours: parseInt(this.hours.hours),
        day: this.hours.day,
        user: this.user.data._id,
        project: this.projectAtual._id,
      };
      // conferindo os dados recebidos
      console.log(data);

      // limpa o projeto armazenado

      const res = await axios
        .post(`${baseApiUrl}/hours`, data)
        .then((res) => res)
        .catch((error) => {
          if (error.response) {
            console.log("ERRO: ", error.response.data.statusCode);
          }
        });

      // está funcionando
      console.log("HORAS: ", res.data);
      this.$router.push({ path: "/projects" });
      this.$store.commit("setProject", null);
    },
  },
};
</script>

<style>
#hours-box {
  width: 30%;
}
label {
  align-self: flex-start;
}

button#cad-hours {
  width: 200px;
}
</style>