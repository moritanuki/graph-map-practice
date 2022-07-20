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
      chartOptions: {},
      plotData: [ 
    [1420070400000, 6],     // 1/1 0:00
    [1420081200000, 23],    // 3:00
    [1420092000000, 47],    // 6:00
    [1420102800000, 47.2],  // 9:00
    [1420113600000, 50.5],  // 12:00
    [1420124400000, 44],    // 15:00
    [1420135200000, 46],    // 18:00
    [1420146000000, 56],    // 21:00
    [1420156800000, 55],    // 1/2 0:00
    [1420167600000, 44],
    [1420178400000, 70],
    [1420189200000, 62.5],
    [1420200000000, 69.2],
    [1420210800000, 72.7],
    [1420221600000, 76.2],
    [1420232400000, 75.1],
    [1420243200000, 64.3],  // 1/3 0:00
    [1420254000000, 50.3],
    [1420264800000, 30.6],
    [1420275600000, 26.3],
    [1420286400000, 0],
    [1420297200000, 0],
    [1420308000000, 0],
    [1420318800000, 10],
    [1420329600000, 12],    // 1/4 0:00
    [1420340400000, 25],
    [1420351200000, 30.2],
    [1420362000000, 40.2],
    [1420372800000, 44],
    [1420383600000, 60.8],
    [1420394400000, 62.2],
    [1420405200000, 54.2],
    [1420416000000, 70.2],   // 1/5 0:00
    [1420426800000, 73.8],
    [1420437600000, 60.2],
    [1420448400000, 60.9],
    [1420459200000, 62],
    [1420470000000, 59],
    [1420480800000, 65],
    [1420491600000, 69],
    [1420502400000, 64],     // 1/6 0:00
    [1420513200000, 60],
    [1420524000000, 59],
    [1420534800000, 55],
    [1420545600000, 50.3],
    [1420556400000, 42.3],
    [1420567200000, 22.7],
    [1420578000000, 15.2],
    [1420588800000, 0],      // 1/7 0:00
    [1420599600000, 0],
    [1420610400000, 0],
    [1420621200000, 20.6],
    [1420632000000, 24.5],
    [1420642800000, 55.9],
    [1420653600000, 67.2],
    [1420664400000, 67],
    [1420675200000, 70]     // 1/8 0:00
  ]
    }
  },
  methods: {
    dataFetch() {
      shipData1.NormalTrendData.forEach((data) => {
        console.log(data.UTC_DATE)
      })
      return 0
    },
    dataPlot() {
      this.dataFetch()

      return this.chartOptions = {
        series: [
          {
            data: this.plotData,
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
          selected: 1,
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
