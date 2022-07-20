import Vue from 'vue'
import App from './App.vue'
import Highcharts from "highcharts"
import Stock from "highcharts/modules/stock"
import HighchartsVue from "highcharts-vue"

Vue.config.productionTip = false

Stock(Highcharts)
Vue.use(HighchartsVue, { highcharts: Highcharts})

new Vue({
  render: h => h(App),
}).$mount('#app')
