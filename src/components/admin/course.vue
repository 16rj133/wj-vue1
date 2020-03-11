<template>
  <div>
    <el-container>
      <el-header style="margin: 30px; padding: 0px;display:flex;justify-content:space-between;align-items: center">
        <div style="display: inline">
          <el-row>
            <el-input
              placeholder="通过课程号或课程名搜索课程。。。"
              clearable
              @change="keywordsChange"
              style="width: 250px;margin: 0px;padding: 0px;"
              size="mini"
              @keyup.enter.native="searchCourse"
              prefix-icon="el-icon-search"
              v-model="keyword">
            </el-input>
            <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="searchCourse">搜索
            </el-button>
            <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-refresh" @click="resetSearch">重置
            </el-button>
            <el-button type="primary" size="mini" style="margin-left: 40px"  icon="el-icon-plus"
                       @click="showAddCourseView">
              添加课程
            </el-button>
          </el-row>
          <el-row style="margin-top: 20px">
            <span>教师：</span>
            <el-select v-model="tid" size="mini" clearable placeholder="请选择" style="width: 100px">
              <el-option
                v-for="item in teacherList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>

          </el-row>
        </div>
      </el-header>
      <el-main style="padding-left: 0px;padding-top: 0px">
        <div>
          <el-table
            :data="courses"
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
              prop="courseId"
              align="left"
              sortable
              label="课程号"
              width="150px">
            </el-table-column>
            <el-table-column
              prop="courseName"
              width="150px"
              sortable
              label="课程名">
            </el-table-column>
            <el-table-column
              prop="teacherName"
              width="150px"
              sortable
              label="教师">
            </el-table-column>
            <el-table-column
              label="操作"
              width="195">
              <template slot-scope="scope">
                <el-button @click="showEditCourseView(scope.row)" style="padding: 3px 4px 3px 4px;margin: 2px"
                           size="mini">编辑
                </el-button>
                <el-button type="danger" style="padding: 3px 4px 3px 4px;margin: 2px" size="mini"
                           @click="deleteCourse(scope.row)">删除
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
    <el-form :model="course" :rules="rules" ref="addCourseForm" style="margin: 0px;padding: 0px;">
      <div style="text-align: left">
        <el-dialog
          :title="dialogTitle"
          style="padding: 0px;"
          :close-on-click-modal="false"
          :visible.sync="dialogVisible"
          width="30%">
          <el-row>
              <div>
                <el-form-item label="课程号:" prop="courseId">
                  <el-input prefix-icon="el-icon-edit" v-model="course.courseId" size="mini" style="width: 150px"
                            placeholder="请输入课程号"></el-input>
                </el-form-item>
              </div>
          </el-row>
          <el-row>
              <div>
                <el-form-item label="课程名:" prop="courseName">
                  <el-input prefix-icon="el-icon-edit" v-model="course.courseName" size="mini" style="width: 150px"
                            placeholder="请输入课程名"></el-input>
                </el-form-item>
              </div>
          </el-row>
          <el-row>
              <div>
                <el-form-item label="教师:" prop="tid">
                  <el-select v-model="course.tid" clearable style="width: 150px" size="mini" placeholder="请选择教师">
                    <el-option
                      v-for="item in teacherList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="cancelEdit">取 消</el-button>
            <el-button size="mini" type="primary" @click="addCourse('addCourseForm')">确 定</el-button>
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
        courses: [],
        keyword: '',
        tid:'',
        professionNo:'',
        dialogTitle: '',
        teacherList: this.$store.state.teachers,
        totalCount: -1,
        currentPage: 0,
        dialogVisible: false,
        course: {
          courseId:'',
          courseName:'',
          tid: '',
        },
        rules: {
          courseName: [{required: true, message: '必填:课程名', trigger: 'blur'}],
          tid: [{required: true, message: '必填:教师', trigger: 'blur'}],
          courseId: [{required: true, message: '必填:课程号', trigger: 'blur'}],
        }
      };
    },
    mounted: function () {
      this.loadCourses();
    },
    methods: {
      deleteCourse(row){
        this.$confirm('此操作将永久删除[' + row.courseId + '], 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var _this = this;
          //删除
        this.$axios.post("/course/delete/" + row.courseId, null).
        then(resp =>{//then可以连用，但是刚刚等号和箭头之间不应该有空格，eg:= >
          //alert("sc666");
          _this.loadCourses();
      }).catch(failResponse => {
          alert("删除失败");//之前报错的原因是我没有在返回数据的函数前加上@responsebody注释
      })
        }).catch(() => {
        });
      },
      keywordsChange(val){
        if (val === '') {
          this.loadCourses();
        }
      },
      searchCourse(){
        this.loadCourses();
      },
      currentChange(currentChange){
        this.currentPage = currentChange;
        this.loadCourses();
      },
      loadCourses(){
        var _this = this;
        //获取课程
        this.$axios
          .get('/course', {params:{
              currentPage: this.currentPage,
              size: 10,
              keyword:this.keyword,
              tid:this.tid
            }})
          .then(resp => {
          var data = resp.data.data;
        //alert(666);//用于接收后端是否正确将数据传到前端。
        _this.totalCount = data.size;
        _this.courses = data.records;
        _this.courses.forEach((e)=>{
        for(var j=0; j<_this.teacherList.length; j++) {
          if (e.tid === _this.teacherList[j].id) {
            e.teacherName = _this.teacherList[j].name
          }
        }
      });
        //console.info(_this.teacherList)

      }).catch(failResponse => {
          //alert(555);之前报错的原因是我没有在返回数据的函数前加上@responsebody注释
        })
      },
      addCourse(formName){
        var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.course.id) {
              //更新
              this.$axios.post("/course/update", this.course
              ).then(resp =>
              {
                _this.dialogVisible = false;
              _this.emptyCourseData();
              _this.loadCourses();
            }).
              catch(failResponse => {
                alert("更新失败");
            })
            } else {
              //添加
              this.$axios.post("/course/add", this.course
              ).then(resp =>
              {
                _this.dialogVisible = false;
              _this.emptyCourseData();
              _this.loadCourses();
            }).
              catch(failResponse => {
                alert("添加失败"
            )
              ;
            })

            }
            //更新全局课程
          } else {
            return false;
          }
        });
      },
      cancelEdit(){
        this.dialogVisible = false;
        this.emptyCourseData();
      },
      showEditCourseView(row){
        this.dialogTitle = "编辑课程";
        this.course = row;
        this.course.courseId = row.courseId;
        this.course.courseName = row.courseName;
        this.course.tid = row.tid;
        this.dialogVisible = true;
      },
      showAddCourseView(){
        this.dialogTitle = "添加课程";
        this.dialogVisible = true;
      },
      resetSearch(){
        this.keyword = '';
        this.tid = '';
      },
      emptyCourseData(){
        this.course = {
          courseId:'',
          courseName: '',
          tid:'',
        }
      }
    }
  };
</script>
