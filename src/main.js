import Vue from 'vue'
import App from './App.vue'
// Highcharts関連ライブラリ
import Highcharts from "highcharts"
import Stock from "highcharts/modules/stock"
import HighchartsVue from "highcharts-vue"
// OpenLayersのCSSを読み込み
import 'ol/ol.css';

Vue.config.productionTip = false

Stock(Highcharts)
Vue.use(HighchartsVue, { highcharts: Highcharts})

new Vue({
  render: h => h(App),
}).$mount('#app')
