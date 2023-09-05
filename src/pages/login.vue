<script>
export default {
  name: "login",
  data() {
    return {
      globalLoading: false,
      formModel: {
        username: "",
        password: "",
        rememberMe: false
      },
      formRules: {
        username: [
          { required: true, message: "请输入账户", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ]
      }
    }
  },
}
</script>

<template>
  <div class="loginHome">
    <div class="loginForm" >
      <div class="login_title">账号登录</div>
      <el-form ref="formRef" :model="formModel" :rules="formRules" class="login-form" status-icon>
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user-solid" v-model.trim="formModel.username" type="text" auto-complete="off" placeholder="请输入账户" @input="formModel.username = $event"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-unlock" v-model.trim="formModel.password" type="password" auto-complete="off" placeholder="请输入密码" @keyup.enter.native="handleSubmitLoginForm(formRef)" @input="formModel.password = $event"></el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-button class="margin-bottom-10" :loading="globalLoading" type="primary" style="width: 100%" @click.native.prevent="handleSubmitLoginForm(formRef)">
            <span v-if="!globalLoading">登 录</span>
            <span v-else>登 录 中...</span>
          </el-button>
        </el-form-item>
      </el-form>
      <div class="login_footer">
        <div class="login_label">注册账号</div>
        <div class="login_label">忘记密码</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.loginHome{
  display: flex;
  align-items: center;
  justify-content: center;
  //background: #FFFFFF;
  height: 100vh;
  .login_title{
    font-size: 24px;
    font-weight: bold;
    color: #FFFFFF;
    letter-spacing: 3px;
    text-align: center;
    margin-bottom: 25px;
  }
  .loginForm{
    width: 380px;
    height: 400px;
    background: rgba(255,255,255,0.5);
    box-shadow: 0px 4px 7px 2px rgba(0,0,0,0.2);
    border-radius: 12px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
  .loginForm_title{
    font-size: 16px;
    font-weight: bold;
    color: #042F77;
    line-height: 27px;
    letter-spacing: 2px;
    margin: 26px 0;
  }
  .login-form {
    width:84%;
    border-radius: 10px;
    .el-input {
      input {
        height: 60px;
      }
    }
    .input-icon {
      height: 39px;
      width: 14px;
      margin-left: 2px;
    }
    .margin-bottom-10{
      background-color: #10a37f !important;
      border-color: #10a37f !important;
      height: 44px;
    }
    .check_text{
      font-size: 12px;
      font-weight: normal;
      color: #5393FF !important;
    }
  }
  .login_footer{
    display: flex;
    align-items: center;
    .login_label{
      font-size: 14px;
      color:#10a37f !important;
      letter-spacing: 2px;
      cursor: pointer;
      margin: 0 20px;
    }
  }
}
</style>