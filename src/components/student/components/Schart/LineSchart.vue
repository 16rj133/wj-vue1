<template>
  <ve-line :data="chartDataLineRanking" :settings="chartSettings" :extend="extend"></ve-line>
</template>

<script>
  import {Toast, Indicator} from 'mint-ui'
  import {reqScoreReport} from '../../api'
  export default {
    data() {

      this.chartSettings = {
        labelMap: {
          'name': '代称',
          'value': '成绩'
        },
        legendName: {
          'name': '代称'
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
        chartDataLineRanking: {
          columns: ['name', 'value'],
          rows: [
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
      this.chartDataLineRanking.rows = result.data.chartDataLineRanking;
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
