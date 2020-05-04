<template>
  <ve-histogram :data="chartData" :settings="chartSettings" :extend="extend"></ve-histogram>
</template>

<script>
  export default {
    data () {
      this.chartSettings = {
        yAxisType: ['KMB'],
        yAxisName: ['数值'],
        labelMap: {
          'name': '类型',
          'value': '数量'
        },
        legendName: {
          'value': '数量'
        }
      }
      this.extend = {
        series: {
          label: { show: true, position: "top" }
        }
      }
      return {
        chartData: [
            {name: '单选题', value: 20},
            {name: '多选题', value: 10},
            {name: '判断题', value: 4},
            {name: '填空题', value: 6}
        ]
      }
    }
  }
</script>
