<template>
  <div>
    <el-container>
      <el-header style="margin: 30px; padding: 0px;display:flex;justify-content:space-between;align-items: center">
        <div style="display: inline">
          <el-input
            placeholder="通过作业名搜索作业。。。"
            clearable
            @change="keywordsChange"
            style="width: 250px;margin: 0px;padding: 0px;"
            size="mini"
            @keyup.enter.native="searchWork"
            prefix-icon="el-icon-search"
            v-model="keyword">
          </el-input>
          <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="searchWork">搜索
          </el-button>
        </div>
      </el-header>
      <el-main style="padding-left: 0px;padding-top: 0px">
        <div>
          <el-table
            :data="works"
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
              label="id"
              v-if="false">
            </el-table-column>
            <el-table-column
              prop="courseNo"
              label="courseNo"
              v-if="false">
            </el-table-column>
            <el-table-column
              prop="workNo"
              align="left"
              label="作业号"
              v-if="false">
            </el-table-column>
            <el-table-column
              prop="workName"
              width="150"
              sortable
              label="作业名">
            </el-table-column>
            <el-table-column
              prop="courseName"
              width="150"
              sortable
              label="课程名">
            </el-table-column>
            <el-table-column
              prop="description"
              width="180"
              label="描述">
            </el-table-column>
            <el-table-column
              prop="submissionNum"
              width="100"
              sortable
              label="已交人数">
            </el-table-column>

            <el-table-column
              prop="releaseTime"
              width="150"
              sortable
              label="发布时间">
            </el-table-column>
            <el-table-column
              label="操作"
              width="200">
              <template slot-scope="scope">
                <el-button type="primary" style="padding: 3px 4px 3px 4px;margin: 2px" size="mini"
                           @click="downLoadWork(scope.row)">
                  下载
                </el-button>
                <el-button type="primary" style="padding: 3px 4px 3px 4px;margin: 3px" size="mini"
                           @click="showStudentWork(scope.row)">
                  查看学生作业
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
    <el-dialog
      title="查看作业"
      style="padding: 0px;"
      :close-on-click-modal="false"
      :visible.sync="studentVisible"
      width="90%">
      <span  slot="title" class="dialog-title">
        <el-row>
          <span>查看作业</span>
        </el-row>
        <el-row style="margin-top: 10px">
          <span>班级：</span>
          <el-select v-model="classesNo" size="mini" clearable placeholder="请选择" style="width: 100px">
            <el-option
              v-for="item in classesList"
              :key="item.id"
              :label="item.classesName"
              :value="item.id">
            </el-option>
          </el-select>
          <el-button type="primary" size="mini" style="margin-left: 5px"
                     icon="el-icon-search" @click="searchWorkByClasses">搜索
          </el-button>
        </el-row>
      </span>
      <el-table
        :data="studentWorks"
        border
        stripe
        size="mini"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="id"
          v-if="false">
        </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="studentNo"
          width="140"
          align="left"
          sortable
          label="学号">
        </el-table-column>
        <el-table-column
          prop="studentName"
          width="150"
          sortable
          label="学生姓名">
        </el-table-column>
        <el-table-column
          prop="classesName"
          width="150"
          align="left"
          sortable
          label="班级">
        </el-table-column>
        <el-table-column
          prop="submissionTime"
          width="200"
          sortable
          label="提交时间">
        </el-table-column>
        <el-table-column
          prop="status"
          width="100"
          sortable
          label="状态">
        </el-table-column>
        <el-table-column
          label="操作/批改"
          width="400">
          <template slot-scope="scope">
            <el-button type="primary" style="padding: 3px 4px 3px 4px;margin: 2px" size="mini"
                       @click="downLoadWork(scope.row)">
              下载
            </el-button>
            <el-input-number size="mini" style="width: 100px" v-model="grade" placeholder="成绩">

            </el-input-number>
            <!--  <el-select size="mini" style="width: 100px" v-model="status" placeholder="批改">
                <el-option key="2" label="合格" value="2">
                </el-option>
                <el-option key="-1" label="不合格" value="-1">
                </el-option>
              </el-select>-->


            <el-button type="primary" style="padding: 3px 4px 3px 4px;margin: 3px" size="mini"
                       @click="correctingStudentWork(scope.row)">
              批改成绩
            </el-button>
            <el-button type="primary" style="padding: 3px 4px 3px 4px;margin: 3px" size="mini"
                       @click="onlinePreview(scope.row)">
              在线预览
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
            <el-button type="primary" size="mini" @click="cancelEdit">返回</el-button>
      </span>

    </el-dialog>

  </div>
</template>
<script>
  export default {
    data() {
      const validateAcquaintance = (rule, value, callback) => {
        if (!value) {
          callback(new Error('必须输入分数'))
        }
        value = Number(value)
        if (typeof value === 'number' && !isNaN(value)) {
          if (value < 0 || value > 100) {
            callback(new Error('分数在 0 至 100 %之间'))
          } else {
            callback()
          }
        } else {
          callback(new Error('分数必须为数字'))
        }
      }
      return {
      rules: {
        grade: [{required: true, validator: validateAcquaintance,trigger: 'blur'}]
      },
        works: [],
        studentWorks: [],
        keyword: '',
        dialogTitle: '',
        teacherId: this.$store.state.user.id,
        classesList:[],
        classesNo:'',
        workNo:'',
        totalCount: -1,
        currentPage: 0,
        status:'2',
        grade:60,
        dialogVisible: false,
        studentVisible: false,
        work: {
          id:'',
          workNo:'',
          workName: '',
          description:'',
          releaseTime:'',
          courseNo: '',
          courseName:'',
        },
      };
    },
    mounted: function () {
      this.loadWorks();
    },

    methods: {
      keywordsChange(val){
        if (val === '') {
          this.loadWorks();
        }
      },
      searchWork(){
        this.loadWorks();
      },
      currentChange(currentChange){
        this.currentPage = currentChange;
        this.loadWorks();
      },
      downLoadWork(row) {
        window.location.href =  row.address;
      },
      showStudentWork(row) {
        var _this = this;
        this.workNo = row.workNo;

        //获取学生提交的作业
        this.$axios
          .get('/worksubmission', {params:{
              currentPage: 1,
              size: 9999,
              workNo:row.workNo
            }})
          .then(resp => {
          var data = resp.data.data;
          _this.studentWorks = data.records
      }).catch(failResponse => {
          //alert(555);
        })
        this.studentVisible = true;
      },
      searchWorkByClasses() {
        var _this = this;
        this.$api.get("/workSubmission?currentPage=1&size=9999&workNo=" + this.workNo
          + "&classesNo="+this.classesNo, null, res => {
          _this.studentWorks = res.records
        });
      },
      /* 批改作业 */
      correctingStudentWork(row) {
        var _this = this;
        this.$axios
          .post('/worksubmission/correcting', {
            'id':row.id,
            'grade': this.grade
          })
          .then(resp => {
          _this.$message.success("批改成功");
          //获取学生提交的作业
          this.$axios
            .get('/worksubmission', {params:{
                currentPage: 1,
                size: 9999,
                workNo:row.workNo
              }})
            .then(res => {
            var data = res.data.data;
        _this.studentWorks = data.records
      }).catch(failResponse => {
          //alert(555);
        })
        }).catch(failResponse => {})



      },
     /* 在线预览*/
      onlinePreview(row) {
        var _this = this;

      },
      cancelEdit(){
        this.studentVisible = false;
        this.studentWorks = [];
        this.classesNo = '';
        this.workNo = '';
      },
      loadWorks(){
        var _this = this;
        //获取已发布的作业
        this.$axios
          .get('/workrelease', {params:{
              currentPage: this.currentPage,
              size: 10,
              keyword:this.keyword,
              teacherNo:this.teacherId
            }})
          .then(resp => {
          var data = resp.data.data;
        //alert(data.records);//用于接收后端是否正确将数据传到前端。
        _this.totalCount = data.size;
        _this.works = data.records;
      }).catch(failResponse => {
          //alert(555);之前报错的原因是我没有在返回数据的函数前加上@responsebody注释
        })
      }
    }
  };
</script>
