<script>
import {EmailCodeAPI, loginAPI, registerAPI} from "@/api";

export default {
  name: "login",
  data() {
    return {
      isRegister: false,
      globalLoading: false,
      formModel: {
        username: "601681659@qq.com",
        password: "wzy19931015",
      },
      formRules: {
        username: [
          {required: true, message: "请输入账户", trigger: "blur"}
        ],
        password: [
          {required: true, message: "请输入密码", trigger: "blur"}
        ]
      },
      codeMsg: '获取验证码',
      editForm: {
        username: "",
        code: "",
        password: "",
        confirmPassword: "",
      },
      editFormRules: {
        username: [
          {required: true, message: "请输入账户", trigger: "blur"}
        ],
        code: [
          {required: true, message: "请输入验证码", trigger: "blur"}
        ],
        password: [
          {required: true, message: "请输入密码", trigger: "blur"}
        ],
        confirmPassword: [
          {required: true, message: "请确认密码", trigger: "blur"}
        ]
      }
    }
  },
  methods: {

    // 登录事件
    handleSubmitLoginForm() {
      this.$refs["formRef"].validate((valid) => {
        if (valid) {
          loginAPI(this.formModel).then(res => {
            this.globalLoading = false;
            if (res.code === 200) {
              window.sessionStorage.setItem('token', res.data.token);
              window.sessionStorage.setItem('uid', res.data.uid);
              this.$notify({
                title: '登录成功',
                message: '欢迎登录AI智能管平台',
                type: 'success'
              });
              this.$router.push({ path: "/" });
              //刷新页面
              window.location.reload();
            } else {
              this.$message.error(res.msg);
            }
          })
        }
      });
    },
    //   获取验证码
    getCode() {
      let that = this
      let time = 60;
      if (this.editForm.username === '') {
        this.$message.warning('请输入邮箱');
        return
      }
      let params = {
        email: this.editForm.username
      }
      EmailCodeAPI(params).then(res => {
        if (res.code === 200) {
          this.$message.success('发送成功');
          let timer = setInterval(() => {
            time--;
            this.codeMsg = time + 's后重新获取';
            if (time <= 0) {
              clearInterval(timer);
              this.codeMsg = '获取验证码';
            }
          }, 1000)
        } else {
          that.$message.error(res.msg);
        }
      })

    },
    handleClick() {
      this.isRegister = !this.isRegister;
    },
    //   注册
    handleSubmitRegisterForm() {
      this.$refs["editForm"].validate((valid) => {
        if (valid) {
          this.globalLoading = true;
          registerAPI(this.editForm).then(res => {
            this.globalLoading = false;
            if (res.code === 200) {
              this.$message.success('注册成功');
              this.isRegister = false;
            } else {
              this.$message.error(res.msg);
            }
          })
        }
      });
    },
    handleClose() {
      this.$emit('close')
    }
  }
}
</script>

<template>
  <div class="loginHome">
    <!--登录-->
    <div v-if="!isRegister" class="loginForm">
      <div class="login_title">账号登录</div>
      <i class="el-icon-close" @click="handleClose(1)"></i>
      <el-form ref="formRef" :model="formModel" :rules="formRules" class="login-form" :validate-on-rule-change="false">
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user-solid" v-model.trim="formModel.username" type="text" placeholder="请输入账户"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-unlock" v-model.trim="formModel.password" type="password" placeholder="请输入密码" @keyup.enter.native="handleSubmitLoginForm()"></el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-button class="margin-bottom-10" :loading="globalLoading" type="primary" style="width: 100%" @click.native.prevent="handleSubmitLoginForm()">
            <span v-if="!globalLoading">登 录</span>
            <span v-else>登 录 中...</span>
          </el-button>
        </el-form-item>
      </el-form>
      <div class="login_footer">
        <div class="login_label" @click="handleClick(0)">注册账号</div>
        <div class="login_label">忘记密码</div>
      </div>
    </div>
    <!--  注册-->
    <div class="registerForm" v-else>
      <div class="login_title">账号注册</div>
      <i class="el-icon-close" @click="handleClose(1)"></i>
      <el-form ref="editForm" :model="editForm" :rules="editFormRules" class="login-form" :validate-on-rule-change="false">
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user-solid" v-model.trim="editForm.username" type="text" placeholder="请输入账户"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <div class="codeView">
            <el-input prefix-icon="el-icon-unlock" v-model.trim="editForm.code" type="text" maxlength="6" placeholder="请输入验证码"></el-input>
            <!--  获取验证码-->
            <el-button class="check_text" type="text" @click="getCode()">{{ codeMsg }}</el-button>
          </div>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-unlock" v-model.trim="editForm.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input prefix-icon="el-icon-unlock" v-model.trim="editForm.confirmPassword" type="password" placeholder="请确认密码" @keyup.enter.native="handleSubmitRegisterForm()"></el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-button class="margin-bottom-10" :loading="globalLoading" type="primary" style="width: 100%" @click.native.prevent="handleSubmitRegisterForm()">
            <span v-if="!globalLoading">注 册</span>
            <span v-else>注 册 中...</span>
          </el-button>
        </el-form-item>
      </el-form>
      <div class="login_footer">
        <div class="login_label" @click="handleClick(1)">账号登录</div>
        <div class="login_label">忘记密码</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.loginHome {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.45);
  position: fixed;
  z-index: 999;
  top: 0;
  width: 100%;
  .el-icon-close{
    color: #333;
    position: absolute;
    right: 0;
    top: 0;
    padding: 10px;
    font-size: 20px;
    cursor: pointer;
  }
  .login_title {
    font-size: 24px;
    font-weight: bold;
    color: #333333;
    letter-spacing: 3px;
    text-align: center;
    margin-bottom: 25px;
  }

  .loginForm {
    width: 380px;
    height: 330px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 4px 7px 2px rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    animation: bounceInDown; /* referring directly to the animation's @keyframe declaration */
    animation-duration: 0.8s;
    position: relative;
  }

  .registerForm {
    width: 380px;
    height: 430px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 4px 7px 2px rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    position: relative;
    animation: bounceInRight; /* referring directly to the animation's @keyframe declaration */
    animation-duration: 0.8s; /* don't forget to set a duration! */
    position: relative;
  }

  .codeView {
    display: flex;
    align-items: center;
    position: relative;

    .check_text {
      font-size: 12px;
      font-weight: normal;
      color: #ef5c5c;
      position: absolute;
      right: 0;
      border-left: 1px solid #eeeeee;
      padding-left: 20px;
      margin-right: 15px;
    }
  }

  .loginForm_title {
    font-size: 16px;
    font-weight: bold;
    color: #042F77;
    line-height: 27px;
    letter-spacing: 2px;
    margin: 26px 0;
  }

  .login-form {
    width: 84%;
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

    .margin-bottom-10 {
      background-color: #ef5c5c !important;
      border-color: #ef5c5c !important;
      height: 44px;
    }
  }

  .login_footer {
    display: flex;
    align-items: center;

    .login_label {
      font-size: 14px;
      color: #ef5c5c !important;
      letter-spacing: 2px;
      cursor: pointer;
      margin: 0 20px;
    }
  }
}
</style>
