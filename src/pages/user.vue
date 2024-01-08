<!--我的-->
<template>
  <div class="userHome">
    <!--<v-head></v-head>-->
    <!-- 内容部分 -->
    <div class="user_centainr">
      <!--<div class="wrapper_sidebar" :class="{'painting_sidebar': collapse}">-->
      <!--  <div class="sidebar_list">-->
      <!--    <div :class="activeIndex == index ? 'sidebar_meun_active' : 'sidebar_meun' " v-for="(item,index) in menuList" :key="index" @click="handleSelect(item,index)">-->
      <!--      <img :src="item.icon" alt="" class="sidebar_img">-->
      <!--      <label class="sidebar_label">{{item.name}}</label>-->
      <!--    </div>-->
      <!--  </div>-->
      <!--</div>-->
      <!--内容中心-->
      <div class="wrapper">
        <div class="wrapper_centent">
          <div class="wrapper_logo">
            <img :src='userInfo.headImg' alt="" style="width: 100%">
            <el-upload
                class="avatar-uploader"
                :action='action'
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
              <div class="upload_dy">
                <div class="logo_edit">修改</div>
              </div>
            </el-upload>

          </div>
          <div class="wrapper_info">
            <div class="wrapper_info_view">
              <div class="wrapper_info_text">昵称：<span class="wrapper_info_name">{{ userInfo.username }}</span><span class="wrapper_info_dect">修改</span></div>
              <!--<div class="wrapper_info_text">实名认证：-->
              <!--  <el-tag type="success" style="margin-left: 5px;">个人实名认证/企业认证</el-tag>-->
              <!--  &lt;!&ndash;<span class="wrapper_info_dect">详情</span>&ndash;&gt;-->
              <!--</div>-->
            </div>
            <div class="wrapper_info_view">
              <div class="wrapper_info_text">ID：<span class="wrapper_info_name">{{userInfo.uid}}</span></div>
              <div class="wrapper_info_text">会员：
                <el-button type="primary" size="mini" class="wrapper_info_btn">一级会员</el-button>
                <el-button type="info" size="mini" class="wrapper_info_btn1">开通会员</el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="wrapper_from">
          <div class="wrapper_from_title">账户绑定</div>
          <div class="wrapper_from_meun">
            <label class="wrapper_label">手机:</label>
            <el-input v-model="userInfo.phone" class="ruleForm_input" placeholder="请设置你的手机"></el-input>
          </div>
          <div class="wrapper_from_meun">
            <label class="wrapper_label">邮箱:</label>
            <el-input v-model="userInfo.email" class="ruleForm_input" placeholder="请设置你的邮箱"></el-input>
          </div>
          <div class="wrapper_from_title" style="margin-top: 30px;">安全设置</div>
          <div class="wrapper_from_meun">
            <label class="wrapper_label">密码:</label>
            <el-input v-model="userInfo.password" class="ruleForm_input"  type='password' placeholder="请设置你的密码"></el-input>
          </div>
          <div class="ruleForm_footer">
            <div class="ruleForm_dect">请注意，一旦注销账户，您的所有用户数据将被清除</div>
            <div style="display: flex;">
              <div class="ruleForm_btn" style="margin-right: 10px" @click="handleLoginout"><img src="../assets/images/icon_01.png" alt="" >注销账号</div>
              <div class="ruleForm_btn" @click="handleSubmitEditForm"><img src="../assets/images/icon_02.png" alt="" >保存信息</div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vHead from "@/components/Header.vue";
import {logoutAPI, updateUserInfoAPI, userInfoAPI} from "@/api";
export default {
  name: 'user',
  components: {vHead},
  data() {
    return {
      action: 'http://39.106.69.95:8099/uploadImg',
      collapse: false,
      activeIndex: 0,
      userInfo: {
        uid: '',
        email: '',
        phone: '',
        username: '',
        headImg: '../assets/images/home_user.png',
      },
      active: 0,
      menuList:[{
        icon:require('@/assets/images/user_edit.png'),
        name:'基本信息'
      }],

      rules:{
        ID: [{ required: true, message: '请输入ID', trigger: 'blur' },],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' },],
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' },],
        name: [{ required: true, message: '请输入昵称', trigger: 'blur' },],
      }
    }
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    //注销账号
    handleLoginout() {
      this.$confirm('确认注销账号吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        logoutAPI().then(res => {
          if (res.code === 200){
            this.$message.success('注销成功')
            window.sessionStorage.clear();
            this.$router.push({path: '/'})
          }
        })
      }).catch(() => {

      });
    },
    handleAvatarSuccess(res, file) {
      this.userInfo.headImg =res.data.fileUrl
    },
    beforeAvatarUpload(file) {
      console.log(file)
      const isJPG = (file.type === 'image/jpeg'||file.type === 'image/png'||file.type === 'image/jpg');
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG/PNG/JPEG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    //修改用户信息
    handleSubmitEditForm() {
    if (this.userInfo.name === '' || this.userInfo.email === '' || this.userInfo.phone === '' || this.userInfo.password === ''){
      this.$message.error('请填写完整信息')
      return
    }
    //二次确认
    this.$confirm('确认修改信息吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      const params = {
        id: this.userInfo.uid,
        email: this.userInfo.email,
        phone: this.userInfo.phone,
        username: this.userInfo.username,
        password: this.userInfo.password,
        headImg: this.userInfo.headImg,
      }
      updateUserInfoAPI(params).then(res => {
        if (res.code === 200){
          this.$message.success('修改成功')
          window.sessionStorage.clear();
          this.$router.push({path: '/'})
        }
      })
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消修改'
      });
    });
    },
    getUsers() {
      userInfoAPI().then(res => {
        if (res.code === 200){
          this.userInfo = res.data
        }
      })
    },
    handletab(index) {
      this.active = index
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>
<style scoped lang="less">
.userHome {
  height: 100%;
  .user_centainr{
    display: flex;
    .wrapper_sidebar{
      background: rgba(255, 255, 255, 0.1);
      box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
      width: 200px;
      .sidebar_list{
        height: calc(100vh - 100px);
        overflow: hidden;
        overflow-y: auto;
        margin-top: 10px;
      }
      .sidebar_meun{
        display: flex;
        align-items: center;
        height: 60px;
        padding: 0 20px;
      }
      .sidebar_meun_active{
        display: flex;
        align-items: center;
        height: 60px;
        padding: 0 20px;
        background: rgb(255, 247, 247);
        border-right: 3px solid #F04848;
      }
      .sidebar_img{
        width: 20px;
        height: 20px;
        border-radius: 50%;
      }
      .sidebar_label{
        margin-left: 10px;
        font-size: 13px;
        color: #FFFFFF;
      }
    }
  }
  .wrapper{
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    height: calc(100vh - 150px);
    border-radius: 5px;
    margin: 24px;
    padding:10px 0;
    overflow: hidden;
    overflow-y: auto;
    .wrapper_from{
      margin-top: 15px;
      width: 100%;
      background: rgba(255, 255, 255, 0.1);
      padding: 24px;
      border-radius: 10px;
      .ruleForm_input{
        width: 300px;
      }
      .wrapper_from_title{
        font-size: 14px;
        color: #FFFFFF;
        letter-spacing: 4px;
        margin-bottom: 20px;
        font-weight: bold;
      }
      .wrapper_from_meun{
        margin-bottom: 15px;
      }
      .wrapper_label{
        width: 100px;
        margin-right: 10px;
        font-size: 13px;
        color: #FFFFFF;
        letter-spacing: 1px;
        font-weight: bold;
      }
    }

    .wrapper_centent{
      padding: 20px 24px;
      background: rgba(255, 255, 255, 0.1);
      box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.06);
      border-radius: 20px;
      display: flex;
      align-items: center;
      .wrapper_info_view{
        display: flex;
        align-items: center;
        margin-bottom: 15px;
      }
      .wrapper_info_name{
        color: #FFFFFF;
        font-size: 15px;
        font-weight: bold;
      }
      .wrapper_info_dect{
        margin-left: 10px;
        color: rgb(30, 146, 255);
        font-size: 13px;
        cursor: pointer;
      }
      .wrapper_logo{
        width: 100px;
        height: 100px;
        background: #FFFFFF;
        border-radius: 5px;
        margin-bottom: 4px;
        border-radius: 50%;
        position: relative;
        z-index: 99;
        overflow: hidden;
      }
      .logo_edit{
        position: absolute;
        left: 0;
        right: 0;
        top: 68px;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: #FFFFFF;
        letter-spacing: 2px;
        display: none;
      }
      .wrapper_logo:hover .logo_edit{
        display: flex;
        cursor: pointer;
      }
      .wrapper_info_btn{
        background: linear-gradient(90.00deg, rgb(255, 157, 157),rgb(241, 76, 76) 77.365%);
        border: none;
        font-size: 12px;
        color: #FFFFFF;
        letter-spacing: 2px;
        padding: 10px 15px;
      }
      .wrapper_info_btn1{
        background: rgb(232, 232, 232);
        border: none;
        font-size: 12px;
        color: #333333;
        letter-spacing: 2px;
        padding: 10px 15px;
      }
      .wrapper_info{
        display: flex;
        flex-direction: column;
        margin-left: 20px;
        .wrapper_info_text{
          font-size: 13px;
          margin-right: 20px;
          width: 300px;
          color: #FFFFFF;
          font-size: 14px;
        }
      }

    }
  }
  .ruleForm_footer{
    margin-top: 30px;
    .ruleForm_btn{
      width: 120px;
      height: 40px;
      box-sizing: border-box;
      border: 1px solid rgb(241, 76, 76);
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgb(241, 76, 76);
      font-family: 阿里巴巴普惠体;
      font-size: 14px;
      font-weight: 400;
      img{
        width: 18px;
        margin-right: 5px;
      }
    }
    .ruleForm_dect{
      color: #FFFFFF;
      margin-bottom: 10px;
    }
  }

}
</style>
