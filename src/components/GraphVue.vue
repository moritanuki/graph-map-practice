<template>
  <div class="graph">
    <h3>TrendGraph</h3>
    <button @click="dataPlot">Plot Chart</button>
    <highcharts :constructorType="'stockChart'" class="hc" :options="chartOptions" ref="chart"></highcharts>
  </div>
</template>

<script>
import shipData1 from '../assets/json/ship-data1.json'


export default {
  data() {
    return {
      chartOptions: {}
    }
  },
  methods: {
    dataFetch(dataType) {
      let plotData = []

      shipData1.NormalTrendData.forEach((data) => {
        const date = Date.parse(data.UTC_DATE)
        plotData.push(
          [date ,data[dataType]]
        )
      })
      return plotData
    },
    dataPlot() {
      const ME_LOAD = this.dataFetch('ME_LOAD')
      const ME_REV = this.dataFetch('ME_REV')
      const OG_SPEED = this.dataFetch('OG_SPEED')
      const FOC_DAY = this.dataFetch('FOC_DAY')

      this.chartOptions = {
        series: [
          {
            data: ME_LOAD,
            lineWidth: 1.3,
          marker: {
            enabled: true, // falseでマーカーを非表示
            radius: 2 // マーカーの大きさ
          },
          tooltip: {
            useHTML: true,
            yDecimals: 2, // 小数点以下の桁数
            valueSuffix: '%' // 単位
          },
          pointFormat: '<tr><td><b><span style="color:{series.color}">{series.name}</span></b></td><td>{point.y}</td></tr>'
          },
          {
            data: ME_REV,
            lineWidth: 1.3,
          marker: {
            enabled: true, // falseでマーカーを非表示
            radius: 2 // マーカーの大きさ
          },
          tooltip: {
            useHTML: true,
            yDecimals: 2, // 小数点以下の桁数
            valueSuffix: 'rpm' // 単位
          },
          pointFormat: '<tr><td><b><span style="color:{series.color}">{series.name}</span></b></td><td>{point.y}</td></tr>'
          },
          {
            data: OG_SPEED,
            lineWidth: 1.3,
          marker: {
            enabled: true, // falseでマーカーを非表示
            radius: 2 // マーカーの大きさ
          },
          tooltip: {
            useHTML: true,
            yDecimals: 2, // 小数点以下の桁数
            valueSuffix: 'knot' // 単位
          },
          pointFormat: '<tr><td><b><span style="color:{series.color}">{series.name}</span></b></td><td>{point.y}</td></tr>'
          },
          {
            data: FOC_DAY,
            lineWidth: 1.3,
          marker: {
            enabled: true, // falseでマーカーを非表示
            radius: 2 // マーカーの大きさ
          },
          tooltip: {
            useHTML: true,
            yDecimals: 2, // 小数点以下の桁数
            valueSuffix: 'MT/day' // 単位
          },
          pointFormat: '<tr><td><b><span style="color:{series.color}">{series.name}</span></b></td><td>{point.y}</td></tr>'
          }
        ],
        chart: {
          type: 'line',
          zoomType: 'xy'
        },

        loading: {
          style: {
            backgroundColor: '#222'
          },
          labelStyle: {
            color: 'white',
            'font-size': '20px'
          }
        },
        tooltip: {
          useHTML: true,
          shadow: false,
          style: {
            fontSize: '11px',
            padding: '5px'
          }
        },
        plotOptions: {
          line: {
            connectNulls: false,
            dataGrouping: {
              approximation: 'open',
              dateTimeLabelFormats: {
                millisecond: ['%Y/%m/%d %H:%M:%S.%L', '%Y/%m/%d %H:%M:%S.%L', ''],
                second: ['%Y/%m/%d %H:%M:%S', '%Y/%m/%d %H:%M:%S', ''],
                minute: ['%Y/%m/%d %H:%M:%S', '%Y/%m/%d %H:%M:%S', ''],
                hour: ['%Y/%m/%d %H:%M:%S', '%Y/%m/%d %H:%M:%S', ''],
                day: ['%Y/%m/%d', '%Y/%m/%d', ''],
                week: ['%Y/%m/%d', '%Y/%m/%d', ''],
                month: ['%B %Y', '%B', ''],
                year: ['%Y', '%Y', '']
              }
            },
            tooltip: {
              headerFormat: '<span style="font-size: 10px">{point.key}</span><br><table>',
              footerFormat: '</table>'
            }
          }
        },
        rangeSelector: {
          enabled: true,
          selected: 3,
          buttonTheme: {
            zIndex: 1
          },
          buttons: [{
            type: 'day',
            count: 1,
            text: '1day'
          }, {
            type: 'day',
            count: 7,
            text: '1wk.'
          }, {
            type: 'month',
            count: 1,
            text: '1mo.'
          }, {
            type: 'all',
            text: 'All'
          }],
          inputDateFormat: '%Y/%m/%d',
          inputEditDateFormat: '%Y/%m/%d'
        },
        credits: {
          enabled: false
        },
        yAxis: {
          allowDecimals: false,
          lineWidth: 0,
          offset: 0,
          max: 100,
          min: 0,
          opposite: false,
          title: {
            text: '%',
            rotation: 360,
            style: {
              'fontWeight': 'normal'
            }
          },
          labels: {
            x: -2,
            y: -2
          }
        },
        legend: {
          enabled: true,
          layout: 'horizontal'
        },
      }
    }
  }
}
</script>

<style scoped>
</style>
