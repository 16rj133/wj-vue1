<template>
  <section class="multiple_collection">
   <!-- <HeaderTop title="收藏题目详情">
      <a href="javascript:" slot="left" class="go_back" @click="$router.goBack()">
        <i class="iconfont iconfanhui"></i>
      </a>
    </HeaderTop>-->

    <div class="content_container">
      <div class="content">
          <span class="que_type">
            (多选题)<img :src="item.isCollect == '0' ? require('../../common/imgs/no-collect.png') : require('../../common/imgs/yes-collect.png')" @click="clickCollect"/>
          </span>
        <span class="que_content">{{item.multipleContent}}</span>

        <img :src="item.pictureSrc" alt="" style="width: 100%" v-if="item.pictureSrc">

        <div class="multiple_option" v-for="(option, optionIndex) in item.options"
             :key="'multiple'+ item.multipleId + optionIndex">
          <mu-checkbox :value="option.value" v-model="item.multipleAnswerArray" disabled :label="option.label" v-if="option.label"></mu-checkbox>
        </div>

        <div class="answer_row">正确答案：<span class="correct_answer">{{item.multipleAnswer}}</span></div>
        <div class="answer_row">你的答案：<span :class="[item.isCorrect == '1' ? 'correct_answer' : 'your_answer']">{{item.stuAnswer || '该题无作答'}}</span></div>
        <div class="answer_row answer_explain">答案解析：<span class="correct_answer">{{item.answerExplain || '无'}}</span></div>
      </div>
    </div>

  </section>
</template>

<script>
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  import {reqMultipleByAnswerId, reqUpdatePaperAnswerIsCollect} from '../../api'
  import {Toast} from 'mint-ui'
  export default {
    name: "",
    data() {
      return {
        answerId:this.$route.params.answerId,
        item:{}
      }
    },
    created(){
      this.getMultipleByAnswerId();
    },
    methods: {
      async getMultipleByAnswerId(){
        const {answerId} = this;
        let result = await reqMultipleByAnswerId({answerId});
        if (result.statu == 0){
          this.item = result.data;
        }
        else {
          Toast({
            message:result.msg,
            duration: 1500
          });
        }
      },
      async updatePaperAnswerIsCollect(isCollect){
        let answerId = parseInt(this.answerId);
        let result = await reqUpdatePaperAnswerIsCollect(answerId, isCollect);
        if (result.statu == 0){
          return true;
        }
        else {
          return false;
        }
      },
      clickCollect(){
        if (this.item.isCollect == '0') {
          this.item.isCollect = '1';
          if (this.updatePaperAnswerIsCollect('1')) {
            Toast({
              message:'收藏成功',
              duration: 1000,
              position:'bottom'
            });
          }
        }
        else {
          this.item.isCollect = '0';
          if (this.updatePaperAnswerIsCollect('0')) {
            Toast({
              message:'已取消收藏',
              duration: 1000,
              position:'bottom'
            });
          }
        }
      }
    },
    components:{
      HeaderTop
    }
  }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
  .multiple_collection
    width 100%
    padding-top 45px
    background-color #f5f5f5
    height 800px
    .go_back
      width 40px
    .content_container
      width 90%
      margin 15px auto
      background-color #f5f5f5
      .content
        height 24px
        line-height 24px
        .answer_explain
          display inline
          padding-bottom 20px
        .answer_row
          height 28px
          line-height 28px
          .correct_answer
            color #4ab8a1
          .your_answer
            color #FF0000
        > span
          display block
        .que_type, .que_score
          color #4ab8a1
        .que_type
          display flex
          justify-content space-between
          align-items center
          >img
            height 18px
            width 18px
            padding-right 15px
        .que_content
          padding-bottom 10px
      .single_option,.multiple_option,.judge_option,.fill_option
        margin-top 25px
        margin-bottom 25px
</style>
