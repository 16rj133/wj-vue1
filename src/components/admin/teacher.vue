<template>
  <div>
    <el-container>
      <el-header style="margin: 30px; padding: 0px;display:flex;justify-content:space-between;align-items: center">
        <div style="display: inline">
          <el-input
            placeholder="通过教师号或教师名搜索教师。。。"
            clearable
            @change="keywordsChange"
            style="width: 250px;margin: 0px;padding: 0px;"
            size="mini"
            @keyup.enter.native="searchTeacher"
            prefix-icon="el-icon-search"
            v-model="keyword">
          </el-input>
          <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="searchTeacher">搜索
          </el-button>
          <el-button type="primary" style="margin-left: 40px" size="mini" icon="el-icon-plus"
                     @click="showAddTeacherView">
            添加教师
          </el-button>
        </div>

      </el-header>
      <el-main style="padding-left: 0px;padding-top: 0px">
        <div>
          <el-table
            :data="teachers"
            border
            stripe
            size="mini"
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="100">
            </el-table-column>
            <el-table-column
              prop="id"
              align="left"
              label="工号"
              sortable
              width="150px">
            </el-table-column>
            <el-table-column
              prop="password"
              width="150px"
              sortable
              label="密码">
            </el-table-column>
            <el-table-column
              prop="name"
              width="150px"
              sortable
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="sex"
              label="性别"
              sortable
              width="150px">
            </el-table-column>
            <el-table-column
              prop="age"
              width="80px"
              sortable
              label="年龄">
            </el-table-column>
            <el-table-column
              prop="phone"
              width="150px"
              sortable
              label="电话">
            </el-table-column>
            <el-table-column
              prop="email"
              width="150px"
              sortable
              label="邮箱">
            </el-table-column>
            <el-table-column
              label="操作"
              width="195">
              <template slot-scope="scope">
                <el-button @click="showEditTeacherView(scope.row)" style="padding: 3px 4px 3px 4px;margin: 2px"
                           size="mini">编辑
                </el-button>
                <el-button type="danger" style="padding: 3px 4px 3px 4px;margin: 2px" size="mini"
                           @click="deleteTeacher(scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="display: flex;justify-content: space-between;margin: 2px">
            <el-pagination
              background
              :page-size="10"
              :current-page="currentPage"
              @current-change="currentChange"
              layout="prev, pager, next"
              :total="totalCount">
            </el-pagination>
          </div>
        </div>
      </el-main>
    </el-container>
    <el-form :model="teacher" :rules="rules" ref="addTeacherForm" style="margin: 0px;padding: 0px;">
      <div style="text-align: left">
        <el-dialog
          :title="dialogTitle"
          style="padding: 0px;"
          :close-on-click-modal="false"
          :visible.sync="dialogVisible"
          width="30%">
          <el-row>
            <div>
              <el-form-item label="教师号:" prop="id">
                <el-input prefix-icon="el-icon-edit" v-model="teacher.id" size="mini" style="width: 150px"
                          placeholder="请输入教师号"></el-input>
              </el-form-item>
            </div>
          </el-row>
          <el-row>
            <div>
              <el-form-item label="姓名:" prop="name">
                <el-input prefix-icon="el-icon-edit" v-model="teacher.name" size="mini" style="width: 150px"
                          placeholder="请输入姓名"></el-input>
              </el-form-item>
            </div>
          </el-row>
          <el-row>
            <div>
              <el-form-item label="性别:" prop="sex">
                <el-radio-group v-model="teacher.sex">
                  <el-radio label="男">男</el-radio>
                  <el-radio style="margin-left: 15px" label="女">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </el-row>
          <el-row>
            <div>
              <el-form-item label="年龄:" prop="age">
                <el-input prefix-icon="el-icon-edit" v-model="teacher.age" size="mini" style="width: 150px"
                          placeholder="请输入年龄"></el-input>
              </el-form-item>
            </div>
          </el-row>
          <el-row>
            <div>
              <el-form-item label="电话:" prop="phone">
                <el-input prefix-icon="el-icon-edit" v-model="teacher.phone" size="mini" style="width: 150px"
                          placeholder="请输入电话"></el-input>
              </el-form-item>
            </div>
          </el-row>
          <el-row>
            <div>
              <el-form-item label="邮件:" prop="email">
                <el-input prefix-icon="el-icon-edit" v-model="teacher.email" size="mini" style="width: 150px"
                          placeholder="请输入邮件"></el-input>
              </el-form-item>
            </div>
          </el-row>
          <el-row>
            <div>
              重置密码：
              <el-switch
                v-model="resetPassword"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </div>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="cancelEdit">取 消</el-button>
            <el-button size="mini" type="primary" @click="addTeacher('addTeacherForm')">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        teachers: [],
        keyword: '',
        dialogTitle: '',
        totalCount: -1,
        currentPage: 0,
        dialogVisible: false,
        resetPassword: false,
        teacher: {
          id:'',
          password:'',
          name: '',
          age:'',
          sex: '',
          phone:'',
          email:'',
        },
        rules: {
          name: [{required: true, message: '必填:姓名', trigger: 'blur'}],
          id: [{required: true, message: '必填:教师号', trigger: 'blur'}],
        }
      };
    },
    mounted: function () {
      this.loadTeachers();
    },
    methods: {
      deleteTeacher(row){
        this.$confirm('此操作将永久删除[' + row.name + '], 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var _this = this;
        this.$axios.post("/teacher/delete/" + row.id, null).
        then(resp =>{
          _this.loadTeachers();
      }).catch(failResponse => {
          alert("删除失败");//之前报错的原因是我没有在返回数据的函数前加上@responsebody注释
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
      }).catch(() => {
        });
      },
      keywordsChange(val){
        if (val === '') {
          this.loadTeachers();
        }
      },
      searchTeacher(){
        this.loadTeachers();
      },
      currentChange(currentChange){
        this.currentPage = currentChange;
        this.loadTeachers();
      },
      loadTeachers(){
        var _this = this;
        //获取老师
        this.$axios
          .get('/teacher', {params:{
              currentPage: this.currentPage,
              size: 10,
              keyword:this.keyword
            }})
          .then(resp => {
          var data = resp.data.data;
          //alert(data.records);//用于接收后端是否正确将数据传到前端。
        _this.totalCount = data.size;
        _this.teachers = data.records;
      }).catch(failResponse => {
          //alert(555);之前报错的原因是我没有在返回数据的函数前加上@responsebody注释
        })
      },
      addTeacher(formName){
        /*var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.teacher.id) {
              if (this.resetPassword === true) {
                this.teacher.password = this.teacher.id
              }
              /!*!//更新
              this.$axios.post("/teacher/update", this.teacher
              ).then(resp =>
              {
                _this.dialogVisible = false;
              _this.emptyTeacherData();
              _this.loadTeachers();
            }).
              catch(failResponse => {
                alert("更新失败");
            })*!/
              //添加
              this.$axios.post("/teacher/add", this.teacher
              ).then(resp =>
              {
                //alert(this.student.id+this.student.email);
                _this.dialogVisible = false;
              _this.emptyTeacherData();
              _this.loadTeachers();
            }).
              catch(failResponse => {
                alert("添加失败");
            })
            } else {
              alert(1234);
            }
          } else {
            return false;
      }
      });*/
        var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {

            if (this.teacher.id) {
              if (this.resetPassword === true) {
                this.teacher.password = this.teacher.id
              }
              //添加
              this.$axios.post("/teacher/add", this.teacher
              ).then(resp =>
              {
                _this.dialogVisible = false;
              _this.emptyTeacherData();
              _this.loadTeachers();
            }).
              catch(failResponse => {
                alert("添加失败"
            )
              ;
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
            } else {
              if (this.resetPassword === true) {
                this.teacher.password = this.teacher.id
              }
              //////
            }
          }else {
            return false;
      }
      });
      },
      cancelEdit(){
        this.dialogVisible = false;
        this.emptyTeacherData();
      },
      showEditTeacherView(row){
        this.dialogTitle = "编辑教师";
        this.teacher = row;
        this.teacher.id = row.id;
        this.teacher.name = row.name;
        this.teacher.sex = row.sex;
        this.teacher.age = row.age;
        this.teacher.phone = row.phone;
        this.teacher.email = row.email;
        this.dialogVisible = true;
        this.resetPassword = false;
      },
      showAddTeacherView(){
        this.dialogTitle = "添加教师";
        this.dialogVisible = true;
        this.resetPassword = false;
      },
      emptyTeacherData(){
        this.teacher = {
          id:'',
          name: '',
          sex: '',
          age:'',
          phone:'',
          email:''
        }
      }
    }
  };
</script>
