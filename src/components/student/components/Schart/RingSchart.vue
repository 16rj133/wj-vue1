<template>
  <ve-ring :data="chartDataRingScore" :settings="chartSettings" :extend="extend"></ve-ring>
</template>

<script>
  import {Toast, Indicator} from 'mint-ui'
  import {reqScoreReport} from '../../api'
  export default {
    data() {

      this.chartSettings = {
        labelMap: {
          'name': '类型',
          'value': '数量'
        },
        legendName: {
          'name': '类型'
        }
      }
      this.extend = {
        series: {
          label: {show: true, position: "top"}
        }
      }
      return {
        sno: this.$store.state.user.id,
        paperId: this.$route.params.paperId,
        chartDataRingScore: {
          columns: ['name', 'value'],
          rows: [
            {name: '单选题', value: 20},
            {name: '多选题', value: 10},
            {name: '判断题', value: 4},
            {name: '填空题', value: 6}
          ]
        }
      }
    },
    created() {
      Indicator.open({
        text: '报告生成中...',
        spinnerType: 'snake'
      });
      this.getScoreReport();
    },
    methods: {
      async getScoreReport()
  {
    const {sno, paperId} = this;
    let result = await
    reqScoreReport({sno, paperId});
    if (result.statu == 0) {
      this.chartDataRingScore.rows = result.data.chartDataRingScore;
      setTimeout(() => {
        Indicator.close();
    }, 500)
    } else {
      Indicator.close();
      Toast({
        message: result.msg,
        duration: 1500
      });
    }
  }
  }
  }
</script>
