<script>
import { Pie } from "vue-chartjs";

export default {
  extends: Pie,
  props: {
    chartdata: [],
    labelsdata: [],
  },
  // mounted() {
  //   console.log(this.chartdata);
  //   this.chartdata = [300, 50, 100];
  //   this.renderChart(this.chartdata);
  // },

  mounted() {
    this.renderChart({
      labels: this.labelsdata.map((project) => project.name),
      datasets: [
        {
          label: "Horas trabalhadas por projeto",
          data: this.chartdata,
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    });
  },
};
</script>

<style>
</style>