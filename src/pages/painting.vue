<!--绘画-->
<script>
export default {
  name: "painting",
  data() {
    return {
      editForm: {
        name: '',
        imageUrl: ''
      },
      imageUrl: ''
    }
  },
  methods:{
    goBack(){
      this.$router.go(-1)
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
</script>

<template>
  <div class="paintingHome">
    <!--<Header></Header>-->
    <div class="centainr">
      <el-page-header @back="goBack" content="AI绘画"></el-page-header>
      <!--  表单-->
      <div class="paintingList">
        <div class="wrapper_left">
          <div>
            <div>绘画描述</div>
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="editForm.name"></el-input>
          </div>
          <div>
            <div>绘画选择</div>
            <div style="width: 100%">
              <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </div>
          <el-button type="primary" style="width: 100%" size="mini">提交</el-button>
        </div>
        <div class="wrapper_right">

        </div>
      </div>

    </div>
  </div>
</template>

<style scoped lang="less">
.paintingHome{
  padding: 24px;
  .centainr{
    background: linear-gradient(90deg, rgba(255, 244, 242, 1) 0%, rgba(252, 243, 255, 1) 100%);
    margin-top: 20px;
    border-radius: 10px;
    padding: 20px 30px;
  }
  .paintingList{
    display: flex;
    justify-content: space-between;
    height: calc(100vh - 200px);
  }
  .wrapper_right{
    width: 80%;
    margin-left: 20px;
    border: 2px dashed #10a37f;
  }
  .avatar-uploader /deep/.el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
