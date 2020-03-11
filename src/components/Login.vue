<template>
  <body id="paper">
  <el-form :model="loginForm" :rules="rules" class="login-container" label-position="left"
           label-width="0px" v-loading="loading">
    <h3 class="login_title">作业管理系统</h3>
    <el-form-item prop="id">
      <el-input type="text" v-model="loginForm.id"
                auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password"
                auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox class="login_remember" v-model="checked"
                 label-position="left"><span style="color: #505458">记住密码</span></el-checkbox>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 40%;background: #505458;border: none" v-on:click="login">登录</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>
<script>
  export default{
    data () {
      return {
        rules: {
          id: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
          password: [{required: true, message: '密码不能为空', trigger: 'blur'}]
        },
        checked: true,
        loginForm: {
          id: '',
          password: ''
        },
        loading: false
      }
    },
    methods: {
      login () {
        var _this = this
        this.$axios
          .post('/login', {
            id: this.loginForm.id,
            password: this.loginForm.password
          })
          .then(resp => {

          if (resp.data.code === 200) {
          _this.$store.commit('login', resp.data.data);
          //获取班级
          this.$axios
            .get('/classes', {params:{
                currentPage: 0,
                size: 9999,
                keyword:''
              }})
            .then(pro => {
            var data = pro.data.data;
          _this.$store.commit('setClasses', data.records);
          //alert("获取班级");//用于接收后端是否正确将数据传到前端。
          //_this.students = data.records;

        }).catch(failResponse => {
            alert(555111);//之前报错的原因是我没有在返回数据的函数前加上@responsebody注释
        })
          //获取老师
          this.$axios
            .get('/teacher', {params:{
                currentPage: 0,
                size: 9999,
                keyword:''
              }})
            .then(pro => {
            var data = pro.data.data;
          _this.$store.commit('setTeachers', data.records);
          //alert("获取班级");//用于接收后端是否正确将数据传到前端。
          //_this.students = data.records;

        }).catch(failResponse => {
            alert(555111);//之前报错的原因是我没有在返回数据的函数前加上@responsebody注释
        })
          //////
          var type = _this.$store.state.user.type;
          if (type === '0'){
            alert("666");
            _this.$router.replace({path: '/teacher'});
          } else if(type === '1'){
            _this.$router.replace({path: '/showWork'});
          } else if (type === '2') {
            _this.$router.replace({path: '/newWork'});
          }
        } else {
          this.$alert(resp.data.msg, '提示', {
            confirmButtonText: '确定'
          })
        }
      })
      .catch(failResponse => {})
      }
    }
  }
</script>
<style>
  #paper {
    background:url("../assets/img/bg/eva1.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: -5px 0px;
  }
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .login_remember {
    margin: 0px 0px 35px 0px;
    text-align: left;
  }
  /*.login_button {*/
  /*background: #505458;*/
  /*}*/
  /*el_checkbox {*/
  /*background: #505458;*/
  /*}*/
</style>
