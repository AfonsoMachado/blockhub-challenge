<template>
  <div class="container">
    Cadastro de horas trabalhadas

    <div>PROJETO X</div>
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
import { mapState } from "vuex";

export default {
  name: "Hours",
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
  computed: mapState(["isQuitVisible", "user"]),
  methods: {
    async cadHours(e) {
      e.preventDefault();

      const data = {
        hours: parseInt(this.hours.hours),
        day: this.hours.day,
        user: this.user.data._id,
      };

      console.log(data);
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