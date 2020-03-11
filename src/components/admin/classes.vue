<template>
  <div>
    <el-container>
      <el-header style="margin: 30px; padding: 0px;display:flex;justify-content:space-between;align-items: center">
        <div style="display: inline">
          <el-row>
            <el-input
              placeholder="通过班级号或班级名搜索班级。。。"
              clearable
              @change="keywordsChange"
              style="width: 250px;margin: 0px;padding: 0px;"
              size="mini"
              @keyup.enter.native="searchClasses"
              prefix-icon="el-icon-search"
              v-model="keyword">
            </el-input>
            <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="searchClasses">搜索
            </el-button>
            <el-button type="primary" size="mini" style="margin-left: 10px" icon="el-icon-refresh" @click="resetSearch">重置
            </el-button>
            <el-button type="primary" size="mini"  style="margin-left: 40px"  icon="el-icon-plus"
                       @click="showAddClassesView">
              添加班级
            </el-button>
          </el-row>
        </div>
      </el-header>
      <el-main style="padding-left: 0px;padding-top: 0px">
        <div>
          <el-table
            :data="classess"
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
              prop="cid"
              align="left"
              label="班级号"
              sortable
              width="150px">
            </el-table-column>
            <el-table-column
              prop="cname"
              width="150px"
              sortable
              label="班级名">
            </el-table-column>
            <el-table-column
              label="操作"
              width="195">
              <template slot-scope="scope">
                <el-button @click="showEditClassesView(scope.row)" style="padding: 3px 4px 3px 4px;margin: 2px"
                           size="mini">编辑
                </el-button>
                <el-button type="danger" style="padding: 3px 4px 3px 4px;margin: 2px" size="mini"
                           @click="deleteClasses(scope.row)">删除
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
    <el-form :model="classes" :rules="rules" ref="addClassesForm" style="margin: 0px;padding: 0px;">
      <div style="text-align: left">
        <el-dialog
          :title="dialogTitle"
          style="padding: 0px;"
          :close-on-click-modal="false"
          :visible.sync="dialogVisible"
          width="30%">
          <el-row>
            <div>
              <el-form-item label="班级号:" prop="cid">
                <el-input prefix-icon="el-icon-edit" v-model="classes.cid" size="mini" style="width: 150px"
                          placeholder="请输入班级号"></el-input>
              </el-form-item>
            </div>
          </el-row>
          <el-row>
            <div>
              <el-form-item label="班级名:" prop="cname">
                <el-input prefix-icon="el-icon-edit" v-model="classes.cname" size="mini" style="width: 150px"
                          placeholder="请输入班级名"></el-input>
              </el-form-item>
            </div>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="cancelEdit">取 消</el-button>
            <el-button size="mini" type="primary" @click="addClasses('addClassesForm')">确 定</el-button>
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
        classess: [],
        keyword: '',
        dialogTitle: '',
        professionList: this.$store.state.professions,
        professionNo:'',
        totalCount: -1,
        currentPage: 0,
        dialogVisible: false,
        classes: {
          cid:'',
          cname:'',
        },
        rules: {
          cname: [{required: true, message: '必填:班级名', trigger: 'blur'}],
          cid: [{required: true, message: '必填:班级号', trigger: 'blur'}],
        }
      };
    },
    mounted: function () {
      this.loadClassess();
    },
    methods: {
      deleteClasses(row){
        this.$confirm('此操作将永久删除[' + row.cname + '], 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var _this = this;
          //删除
        this.$axios.post("/classes/delete/" + row.cid, null).
        then(resp =>{//then可以连用，但是刚刚等号和箭头之间不应该有空格，eg:= >
          //alert("sc666");
          _this.loadClassess();
      }).catch(failResponse => {
          alert("删除失败");//之前报错的原因是我没有在返回数据的函数前加上@responsebody注释
      })
        //更新
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
        //alert("获取班级");
      }).catch(failResponse => {
          alert(555111);
      })
        }).catch(() => {
        });
      },
      keywordsChange(val){
        if (val === '') {
          this.loadClassess();
        }
      },
      searchClasses(){
        this.loadClassess();
      },
      currentChange(currentChange){
        this.currentPage = currentChange;
        this.loadClassess();
      },
      loadClassess(){
        var _this = this;
        //获取班级
        this.$axios
          .get('/classes', {params:{
              currentPage: 0,
              size: 9999,
              keyword:this.keyword,
            }})
          .then(pro => {
          var data = pro.data.data;
        _this.$store.commit('setClasses', data.records);
        this.classess = data.records;
        //alert("获取班级");//用于接收后端是否正确将数据传到前端。
        //_this.students = data.records;

      }).catch(failResponse => {
          alert(555111);//之前报错的原因是我没有在返回数据的函数前加上@responsebody注释
      })
      },
      addClasses(formName){
        var _this = this;
        this.$refs[formName].validate((valid) => {

          if(valid) {
            if (this.classes.cid) {
              //更新
             /* this.$axios.post("/classes/update", this.classes
              ).then(resp =>
              {
                //alert(this.student.id+this.student.email);
                _this.dialogVisible = false;
              _this.emptyClassesData();
              _this.loadClassess();
            }).
              catch(failResponse => {
                alert("更新失败");
            })*/
            //添加
            this.$axios.post("/classes/add", this.classes
            ).then(resp =>
            {
              //alert(this.student.id+this.student.email);
              _this.dialogVisible = false;
            _this.emptyClassesData();
            _this.loadClassess();
          }).
            catch(failResponse => {
              alert("添加失败"
          )
            ;
          })
          } else {/////

          }
          //
          //获取班级
          this.$axios
            .get('/classes', {
              params: {
                currentPage: 0,
                size: 9999,
                keyword: ''
              }
            })
            .then(pro => {
            var data = pro.data.data;
        _this.$store.commit('setClasses', data.records);
        //alert("获取班级");//用于接收后端是否正确将数据传到前端。
        //_this.students = data.records;

      }).
        catch(failResponse => {
          alert(555111);//之前报错的原因是我没有在返回数据的函数前加上@responsebody注释
      })
          } else {
            return false;
          }
        });
      },
      cancelEdit(){
        this.dialogVisible = false;
        this.emptyClassesData();
      },
      resetSearch() {
        this.keyword = '';
        this.professionNo = '';
      },
      showEditClassesView(row){
        this.dialogTitle = "编辑班级";
        this.classes = row;
        this.classes.cid = row.cid;
        this.classes.cname = row.cname;
        this.dialogVisible = true;
      },
      showAddClassesView(){
        this.dialogTitle = "添加班级";
        this.dialogVisible = true;
      },
      emptyClassesData(){
        this.classes = {
          cid:'',
          cname: '',
        }
      }
    }
  };
</script>
