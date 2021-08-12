<script>
import { Pie } from "vue-chartjs";

export default {
  extends: Pie,
  props: {
    chartdata: [],
    labelsdata: [],
  },
  data() {
    return {
      uselabelsdata: [],
      usechartdata: [],
    };
  },
  // mounted() {
  //   console.log(this.chartdata);
  //   this.chartdata = [300, 50, 100];
  //   this.renderChart(this.chartdata);
  // },

  mounted() {
    this.uselabelsdata = this.labelsdata;
    this.usechartdata = this.chartdata;
    //  gerando cores
    let bgs = [];
    for (let i = 0; i < this.chartdata.length; i++) {
      bgs[i] = this.getRandomColor();
    }

    // ajustando array somente com projetos disponiveis
    // eslint-disable-next-line no-unused-vars

    // this.usechartdata = this.usechartdata.filter(this.notZero);

    // for (let i = 0; i < this.chartdata.length; i++) {
    //   if (this.chartdata[i] == 0) {
    //     console.log("passoussdaasdasdsadfsdafgsadfads");
    //     this.uselabelsdata.splice(i, 1);
    //   }
    // }

    console.log("NOVO ARRAY", this.usechartdata);
    console.log("NOVO ARRAY 2", this.uselabelsdata);

    this.renderChart({
      labels: this.uselabelsdata.map((project) => project.name),
      datasets: [
        {
          label: "Horas trabalhadas por projeto",
          data: this.usechartdata,
          backgroundColor: bgs,
          hoverOffset: 4,
        },
      ],
    });
  },

  methods: {
    notZero(n) {
      return n != 0;
    },
    // gera cores aleatorias
    getRandomColor() {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
  },
};
</script>

<style>
</style>