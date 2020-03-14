import Vue from 'vue'
import Vuex from 'vuex'

// 引入四个基本模块
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
  mutations,
  actions,
  getters,
  state: {
    rotationImages: [],  //首页轮播图数组
    userInfo: {},// 用户信息
    unreadMsgCount: 0,//用户我的页面未读消息条数
    feedbackInfo: [],//消息列表反馈信息数组
    examCalendar: [],//考试日历列表数组
    languagesInfo: [],//首页九宫格编程语言信息

    currentIndex: 0,//当前题目索引，默认为0
    singleAnswers: [],//单选题答案数
    multipleAnswers: [],//多选题答案数组
    judgeAnswers: [],//判断题答案数组
    fillAnswers: [],//填空题答案数组
    firstCurrentTime:0,//花费时间
    user: {
      id: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).id,
      type: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).type,
      name: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).name,
    },
    classess: window.localStorage.getItem('classes' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('classes' || '[]')),
    courses: window.localStorage.getItem('courses' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('courses' || '[]')),
    students: window.localStorage.getItem('students' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('students' || '[]')),
    teachers: window.localStorage.getItem('teachers' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('teachers' || '[]')),
  }
 /* mutations: {

  }*/
})
