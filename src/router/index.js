import Vue from 'vue'
import Router from 'vue-router'
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

//import AdminIndex from '@/components/admin/AdminIndex'

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
        }
      ]
    }
  ]
})
