<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  props: {
    monthchartdata: [],
  },
  data() {
    return {
      uselabelsmonthdata: [],
      usechartmonthdata: [],
    };
  },

  mounted() {
    this.uselabelsmonthdata = this.monthchartdata.map((month) => month.month);
    this.usechartmonthdata = this.monthchartdata.map((month) => month.hour);
    //  gerando cores
    let bgs = [];
    for (let i = 0; i < this.usechartmonthdata.length; i++) {
      bgs[i] = this.getRandomColor();
    }

    this.renderChart({
      labels: this.uselabelsmonthdata,
      datasets: [
        {
          data: this.usechartmonthdata,
          backgroundColor: bgs,
          hoverOffset: 4,
        },
      ],
    });
  },

  methods: {
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