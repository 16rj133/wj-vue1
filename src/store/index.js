import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    user: {
      id: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).id,
      type: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).type,
      name: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).name,
    },
    classess: window.localStorage.getItem('classes' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('classes' || '[]')),
    courses: window.localStorage.getItem('courses' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('courses' || '[]')),
    students: window.localStorage.getItem('students' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('students' || '[]')),
    teachers: window.localStorage.getItem('teachers' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('teachers' || '[]')),
  },
  mutations: {
    login(state, user){
      state.user = user;
      window.localStorage.setItem('user', JSON.stringify(user));
    },
    setClasses(state, classes) {
      state.classes = classes
      window.localStorage.setItem('classes', JSON.stringify(classes));
    },
    setCourse(state, course) {
      state.course = course
      window.localStorage.setItem('course', JSON.stringify(course));
    },
    setStudents(state, students) {
      state.students = students
      window.localStorage.setItem('students', JSON.stringify(students));
    },
    setTeachers(state, teachers) {
      state.teachers = teachers
      window.localStorage.setItem('teachers', JSON.stringify(teachers));
    },
    logout(state){
      state.user = '';
      window.localStorage.removeItem('user');
      window.localStorage.removeItem('students');
      window.localStorage.removeItem('teachers');
    }
  }
})
