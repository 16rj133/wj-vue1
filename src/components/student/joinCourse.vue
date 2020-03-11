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
                <el-button @click="joinCourse(scope.row)" style="padding: 3px 4px 3px 4px;margin: 2px"
                           size="mini">加入
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
        studentId: this.$store.state.user.id,
        totalCount: -1,
        currentPage: 0,
        dialogVisible: false,
        course: {
          courseId:'',
          courseName:'',
          tid: '',
        }
      };
    },
    mounted: function () {
      this.loadCourses();
    },
    methods: {
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
      cancelEdit(){
        this.dialogVisible = false;
        this.emptyCourseData();
      },
      joinCourse(row){
        this.$axios
          .post('/sc/add', {
            courseid: row.courseId,
            studentid: this.studentId
          })
          .then(resp => {
            alert(resp.data.data);
            if(resp.data.data===200)
        {
          alert("加入课程成功");
        }
      else{
          alert("已经加入过此课程");
        }
        }).
        catch(failResponse => {
          alert(555111);//之前报错的原因是我没有在返回数据的函数前加上@responsebody注释
      })
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
