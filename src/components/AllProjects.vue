<template>
  <div class="projects-container">
    <!-- Listar todos os projetos -->
    <div id="div-left">
      <div id="container-tables">
        <div class="projects-table" id="ex">
          <table>
            <thead>
              <tr>
                <th style="border-left: none">Projeto</th>
                <th>Horas Trabalhadas</th>
                <!-- <th style="border-right: none">Cadastrar Horas</th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(project, index) in projects" :key="project._id">
                <td style="border-left: none; font-size: 18px">
                  {{ project.name }}
                </td>
                <td style="text-align: center; font-size: 18px">
                  {{ hours[index] }} horas
                </td>
                <!-- <td
                style="text-align: center; font-size: 20px; border-right: none"
              >
                <strong><a id="link" @click="addHours(project)">+</a></strong>
              </td> -->
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th style="border-right: none">Cadastrar Horas</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="project in projects" :key="project._id">
                <td
                  style="
                    text-align: center;
                    font-size: 18px;
                    border-right: none;
                  "
                >
                  <strong><a id="link" @click="addHours(project)">+</a></strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="new-project-container">
        <router-link to="/project">
          <button class="project-button" id="new-project">
            Cadastrar Novo Projeto
          </button>
        </router-link>
        <button class="project-button" @click="exportXLSX('ex')">
          Exportar em Planilha
        </button>
        <button class="project-button" @click="exportPDF('ex')">
          Exportar em PDF
        </button>
      </div>
      <div class="date-filter" id="ex2" style="margin-bottom: 25px">
        FILTRAGEM POR DATA
        <table align="center">
          <thead>
            <tr>
              <th style="border-left: none">Data</th>
              <th>Projeto</th>
              <th style="border-right: none">Horas Trabalhadas</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="date in dates" :key="date._id">
              <td style="border-left: none">{{ date.d }}</td>
              <td>{{ date.p }}</td>
              <td style="border-right: none">{{ date.h }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="new-project-container" style="margin-bottom: 50px">
        <button class="project-button" @click="exportXLSX('ex2')">
          Exportar em Planilha
        </button>
        <button class="project-button" @click="exportPDF('ex2')">
          Exportar em PDF
        </button>
      </div>
    </div>

    <div id="charts">
      <Pie
        v-if="loaded"
        :chartdata="chartdata"
        :labelsdata="labelsdata"
        class="chart"
      />

      <!-- <Bar v-if="loaded" :monthchartdata="monthchartdata" class="chart" /> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
// eslint-disable-next-line no-unused-vars
import { baseApiUrl, showError } from "../global";
import Pie from "./Chart.vue";
import Bar from "./BarChart.vue";

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { Pie, Bar },
  name: "AllProjects",
  computed: mapState(["user"]),
  data() {
    return {
      projects: [],
      hours: [],
      hoursOb: [],
      // months: [],
      monthsTable: [],
      dates: [],
      loaded: false,
      chartdata: null,
      monthchartdata: null,
    };
  },
  async mounted() {
    // executar quando o componente é renderizada

    await this.getProjects();
    await this.getHours();
    this.calculateDate();
    // this.monthHour();

    // Eviando dados para renderizar o gráfico
    this.loaded = false;
    try {
      this.chartdata = this.hours;
      this.labelsdata = this.projects;
      this.monthchartdata = this.months;
      this.loaded = true;
    } catch (e) {
      console.error(e);
    }

    console.log("DATAS: ", this.dates);
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

    exportXLSX(ex) {
      // exporta para um formato compatível com o excel usando funções do prórpio HTML
      var a = document.createElement("a");
      var data_type = "data:application/vnd.ms-excel";
      var table_div = document.getElementById(ex);
      var table_html = table_div.outerHTML.replace(/ /g, "%20");
      // console.log(table_html);
      a.href = data_type + ", " + table_html;
      a.download = "relatorio.xls";
      a.click();
      // e.preventDefault();
    },

    exportPDF(ex) {
      // capturando os dados do projeto armazenados na tabela
      var sTable = document.getElementById(ex).innerHTML;

      var style = "<style>";
      style = style + "table {width: 100%;font: 17px Calibri;}";
      style =
        style +
        "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
      style = style + "padding: 2px 3px;text-align: center;}";
      style = style + "</style>";

      // Cria uma nova janela com a tabela contendo os dados
      var win = window.open("", "", "height=700,width=700");

      win.document.write("<html><head>");
      win.document.write("<title>horas-trabalhadas-por-projeto</title>");
      win.document.write(style);
      win.document.write("</head>");
      win.document.write("<body>");
      win.document.write(sTable);
      win.document.write("</body></html>");

      win.document.close();

      // Ativa a opção de exportar para pdf
      win.print();
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
      this.hoursOb = res.data;
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
        // console.log("TOTAL POR INDICE: ", total);
        totalHoras[i] = total;
      }

      console.log("TOTAL HORAS: ", totalHoras);
      return totalHoras;
    },
    calculateDate() {
      for (let i = 0; i < this.hoursOb.length; i++) {
        // console.log(this.projects[i]._id);
        if (this.user.data._id == this.hoursOb[i].user) {
          let d = this.hoursOb[i].day;
          let h = this.hoursOb[i].hours;
          let p = null;
          for (let j = 0; j < this.projects.length; j++) {
            if (this.projects[j]._id == this.hoursOb[i].project) {
              p = this.projects[j].name;
            }
          }

          this.dates.push({ d, h, p });
        }
        // console.log("TOTAL POR INDICE: ", total);;
      }
      console.log("DATAS: ", this.dates);
      // for (let i = 0; i < this.dates.length; i++) {
      //   if()

      // }
    },

    // monthHour() {
    //   console.log("TSETYE AERAT TSDTSDSDGS", this.mmmmmmmmmmm);
    //   for (let i = 0; i < this.dates.length; i++) {
    //     // capturando mês
    //     let monthc = this.dates[i].d.split("-")[1];
    //     monthc = this.getMonth(monthc);

    //     if (this.months.length == 0) {
    //       console.log("UMA VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    //       let hour = this.dates[i].h;
    //       this.months.push({ monthc, hour });
    //     } else {
    //       for (let j = 0; j < this.months.length; j++) {
    //         if (this.months[j].month == monthc) {
    //           this.months[j].hour += this.dates[i].h;
    //         } else {
    //           // console.log("1 vez");
    //           let hour = this.dates[i].h;
    //           this.months.push({ monthc, hour });
    //         }
    //       }
    //     }
    //   }
    //   // console.log("MONTGfffggS: ", this.months);
    // },

    // async getProjectId(id) {
    //   const projectId = await axios.get(`${baseApiUrl}/hours`)
    // },

    // verifica as datas disponiveis para o usuario logado

    getMonth(n) {
      const m = [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ];

      return m[n - 1];
    },
  },
};
</script>

<style>
.projects-container {
  /* width: 100vw;
  height: 100vh; */
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  /* align-items: center; */

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

.new-project-container {
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

table {
  border-collapse: collapse;
}

th {
  text-align: center;
  border-bottom: 2px solid white;
}

td,
th {
  border-left: 2px solid white;
  border-right: 2px solid white;
  padding-left: 10px;
  padding-right: 10px;
}

.chart {
  margin-top: 30px;
}

.project-button {
  height: 50px;
}

#container-tables {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.date-filter {
  margin-top: 25px;
}

#charts {
  display: flex;
  flex-direction: column;
}
</style>
