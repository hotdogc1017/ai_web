<template>
  <div class="taskHome">
    <div class="taskForm">
      <div class="task_title">新建任务</div>
      <i class="el-icon-close" @click="handleClose(1)"></i>
      <el-form
        ref="formRef"
        :model="formModel"
        :rules="formRules"
        class="task-form"
        :validate-on-rule-change="false"
      >
        <el-form-item prop="taskName">
          <el-input
            v-model.trim="formModel.taskName"
            type="text"
            placeholder="请输入任务名称"
            clearable
            maxlength="20"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-button
            class="margin-bottom-10"
            :loading="globalLoading"
            type="primary"
            style="width: 100%"
            @click.native.prevent="handleSubmitLoginForm()"
          >
            <span v-if="!globalLoading">创 建</span>
            <span v-else>新 建 中...</span>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--  注册-->
  </div>
</template>

<script>
import { EmailCodeAPI, registerAPI, createTaskAPI } from "@/api";

export default {
  name: "task",
  data() {
    return {
      globalLoading: false,
      formModel: {
        model: "StableDiffusion",
        taskName: "",
      },
      formRules: {
        taskName: [
          { required: true, message: "请输入任务名称", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 创建任务
    handleSubmitLoginForm() {
      this.$refs["formRef"].validate((valid) => {
        if (valid) {
          createTaskAPI(this.formModel).then((res) => {
            this.globalLoading = false;
            if (res.code === 200) {
              this.$notify({
                title: "创建成功",
                message: "请开始您的创作吧",
                type: "success",
              });
              this.$emit("close");
            } else {
              this.$message.error(res.msg);
            }
          });
        }
      });
    },

    handleClose() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped lang="less">
.taskHome {
  display: flex;
  align-items: center;
  justify-content: center; //
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.45);
  position: fixed;
  z-index: 999;
  top: 0;
  width: 100%;
  .el-icon-close {
    color: #333;
    position: absolute;
    right: 0;
    top: 0;
    padding: 10px;
    font-size: 20px;
    cursor: pointer;
  }
  .task_title {
    font-size: 18px;
    font-weight: bold;
    color: #333333;
    letter-spacing: 3px;
    text-align: center;
    margin-bottom: 25px;
  }

  .taskForm {
    width: 380px;
    height: 230px;
    margin-bottom: 300px;
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

  .codeView {
    display: flex;
    align-items: center;
    position: relative;

    .check_text {
      font-size: 12px;
      font-weight: normal;
      color: #10a37f;
      position: absolute;
      right: 0;
      border-left: 1px solid #eeeeee;
      padding-left: 20px;
      margin-right: 15px;
    }
  }

  .taskForm_title {
    font-size: 16px;
    font-weight: bold;
    color: #042f77;
    line-height: 27px;
    letter-spacing: 2px;
    margin: 26px 0;
  }

  .task-form {
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

  .task_footer {
    display: flex;
    align-items: center;

    .task_label {
      font-size: 14px;
      color: #10a37f !important;
      letter-spacing: 2px;
      cursor: pointer;
      margin: 0 20px;
    }
  }
}
</style>
