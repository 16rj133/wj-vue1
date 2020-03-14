import Vue from 'vue'
import Router from 'vue-router'

Router.prototype.goBack = function () {
  this.isBack = true;
  window.history.go(-1)
};
// 导入刚才编写的组件
import AppIndex from '@/components/home/AppIndex'
import Login from '@/components/Login'
import Home from '@/components/home'
import AdminStudent from '@/components/admin/student'
import AdminClasses from '@/components/admin/classes'
import AdminTeacher from '@/components/admin/teacher'
import AdminCourse from '@/components/admin/course'

import StudentNewWork  from '@/components/student/newWork'
import StudentWorkRecord   from '@/components/student/workRecord'
import StudentJoinCourse   from '@/components/student/joinCourse'

import TeacherReleaseWork    from '@/components/teacher/releaseWork'
import TeacherShowWork    from '@/components/teacher/showWork'
import TeacherShowSubmissionWork   from '@/components/teacher/showSubmissionWork'

//import AdminIndex from '@/components/student/components/admin/AdminIndex'
//学生考试
//import Login from '@/components/student/pages/Login/Login.vue'
/*import ProfileInfo from '@/components/student/pages/ProfileInfo/ProfileInfo.vue'
import ProfileStuScore from '@/components/student/pages/ProfileStuScore/ProfileStuScore.vue'
import ProfileWrongCollection from '@/components/student/pages/ProfileWrongCollection/ProfileWrongCollection.vue'
import SingleCollection from '@/components/student/pages/ProfileCollectionDetail/SingleCollection.vue'
import MultipleCollection from '@/components/student/pages/ProfileCollectionDetail/MultipleCollection.vue'
import JudgeCollection from '@/components/student/pages/ProfileCollectionDetail/JudgeCollection.vue'
import FillCollection from '@/components/student/pages/ProfileCollectionDetail/FillCollection.vue'
import ProfileScoreDetail from '@/components/student/pages/ProfileScoreDetail/ProfileScoreDetail.vue'
import ProfilePswChange from '@/components/student/pages/ProfilePswChange/ProfilePswChange.vue'
import ProfileInfoChange from '@/components/student/pages/ProfileInfoChange/ProfileInfoChange.vue'
import ProfileFeedback from '@/components/student/pages/ProfileFeedback/ProfileFeedback.vue'
import ProfileReplyDetail from '@/components/student/pages/ProfileReplyDetail/ProfileReplyDetail.vue'

import HomePaper from '@/components/student/pages/HomePaper/HomePaper.vue'
import HomePaperDetail from '@/components/student/pages/HomePaperDetail/HomePaperDetail.vue'

import WrongDetail from '@/components/student/pages/WrongDetail/WrongDetail.vue'*/
import StudentEHome from '@/components/student/pages/Home/test.vue'

import HomePaper from '@/components/student/pages/HomePaper/HomePaper.vue'
import HomePaperDetail from '@/components/student/pages/HomePaperDetail/HomePaperDetail.vue'
import HomePaperStart from '@/components/student/pages/HomePaperStart/HomePaperStart.vue'

import ProfileExamCalendar from '@/components/student/pages/ProfileExamCalendar/ProfileExamCalendar.vue'
import Profile from '@/components/student/pages/Profile/Profile.vue'

// 路由组件懒加载
//const StudentEHome = () => import('@/components/student/pages/Home/Home.vue')
//const Wrong = () => import('@/components/student/pages/Wrong/Wrong.vue')
//const Search = () => import('@/components/student/pages/Search/Search.vue')
//const Profile = () => import('@/components/student/pages/Profile/Profile.vue')
Vue.use(Router)

export default new Router({
  routes: [
    // 下面都是固定的写法
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'AppIndex',
      component: AppIndex
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          name:"学生管理",
          path: '/student',
          component: AdminStudent
        },
        {
          name:"班级管理",
          path: '/classes',
          component: AdminClasses
        },
        {
          name:"教师管理",
          path: '/teacher',
          component: AdminTeacher
        },
        {
          name:"课程管理",
          path: '/course',
          component: AdminCourse
        }, {
          name:"新的作业",
          path: '/newWork',
          component: StudentNewWork
        }, {
          name:"作业记录",
          path: '/workRecord',
          component: StudentWorkRecord
        },
        {
          name:"加入课程",
          path: '/joinCourse',
          component: StudentJoinCourse
        },{
          name:"学生考试",
          path: '/exam',
          component: StudentEHome
        },
        {
          name:"发布作业",
          path: '/releaseWork',
          component: TeacherReleaseWork
        }, {
          name:"已发布的作业",
          path: '/showWork',
          component: TeacherShowWork
        }, {
          name:"查看学生作业",
          path: '/showSubmissionWork',
          component: TeacherShowSubmissionWork
        },
        {
          path:'/profile',
          name:'个人考试中心',
          component:Profile,
          meta: {
            showFooter: true
          }
        },
        {
          name:'考试公告',
          path:'/examcalendar',
          component:ProfileExamCalendar
        },
        {
          name:'考试试卷',
          path:'/paper/:langId',
          component:HomePaper
        },
        {
          name:'试卷详情',
          path:'/paper/detail/:paperId',
          component:HomePaperDetail
        },
        {
          name:'考试中',
          path:'/paper/detail/start/:paperId',
          component:HomePaperStart,
        },
      ]
    },

  ]
})
