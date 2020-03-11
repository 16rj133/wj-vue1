<template>
  <div style="margin-top: 30px;">
    <el-container>
      <el-form :model="workRelease" :rules="rules" ref="workRelease" label-width="100px" class="demo-ruleForm">
        <el-form-item label="作业名称" prop="workName">
          <el-input v-model="workRelease.workName"></el-input>
        </el-form-item>
        <el-form-item label="所属课程" prop="courseNo">
          <el-select v-model="workRelease.courseNo" clearable style="width: 150px" size="mini" placeholder="请选择课程">
            <el-option
              v-for="item in courseList"
              :key="item.courseId"
              :label="item.courseName"
              :value="item.courseId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作业描述" prop="description">
          <el-input type="textarea" v-model="workRelease.description"></el-input>
        </el-form-item>
        <el-form-item label="选择作业" prop="address">
          <el-upload
            class="upload-demo"
            ref="upload"
            :action = "uploadAction"
            :data="{type:'1',username: teacherId}"
            :limit="limit"
            :on-exceed="handleExceed"
            :on-success="handleSuccess"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('workRelease')">立即发布</el-button>
          <el-button @click="resetForm('workRelease')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-container>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        workRelease: {
          workName: '',
          courseNo: '',
          description: '',
          address: ''
        },
        teacherId: this.$store.state.user.id,
        courseList:this.$store.state.course,
        /* 上传文件 */
        limit:1,
        uploadAction: 'http://localhost:8223/api/import',
        rules: {
          workName: [
            { required: true, message: '请输入作业名', trigger: 'change' }
          ],
          courseNo: [
            { required: true, message: '请选择课程', trigger: 'change' }
          ],
          address: [
            { required: true, message: '请选择文件', trigger: 'change' }
          ]
        }
      };
    },
    mounted: function () {
      this.loadCourseList();
    },
    methods: {
      handleSuccess(response){/*
        if (response.code === '200') {*/
          this.workRelease.address = response.data;
          this.$message.success("文件上传成功");
          console.info(response.data);
       // }
      },
      handleExceed() {
        this.$message.warning("只能选择一个文件上传")
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      loadCourseList() {
        var _this = this;
        //获取班级
        //获取课程
        this.$axios
          .get('/course', {params:{
              currentPage: 0,
              size: 9999,
              tid:this.teacherId
            }})
          .then(resp => {
          var data = resp.data.data;
          _this.$store.commit('setCourse', data.records);
          alert(data.records);

      }).catch(failResponse => {
          alert(555);//之前报错的原因是我没有在返回数据的函数前加上@responsebody注释
        });
        console.info(_this.courseList);
      },
      submitForm(formName) {
        var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            /*this.$api.post("/workrelease", this.workRelease, res => {
              _this.$message.success("发布成功");
              _this.resetForm('workRelease')
            })*/
            //添加
            this.$axios.post("/workrelease/add", this.workRelease
            ).then(resp =>
            {
              _this.$message.success("发布成功");
            _this.resetForm('workRelease')
          }).
            catch(failResponse => {
              alert("添加失败"
          )
            ;
          })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs.upload.clearFiles();
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
