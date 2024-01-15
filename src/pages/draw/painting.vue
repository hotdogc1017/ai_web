<!--绘画-->

<template>
  <div class="paintingHome">
    <!-- 登录-->
    <Task @close="handleClose()" v-if="isTask"></Task>
    <div class="painting-centainr">
      <div class="chatSidebar">
        <div class="chatSidebar_user" @click="openWin">
          <div class="user_add">新建任务</div>
        </div>
        <div class="wrapper_list">
          <div
            :class="
              activeTask == index ? 'wrapper_meun_active' : 'wrapper_meun'
            "
            v-for="(item, index) in taskList"
            :key="index"
            @click="getTask(item, index)"
          >
            <div class="wrapper_name">{{ item.name }}</div>
            <i class="el-icon-delete" @click="deleteTask(item.id)"></i>
          </div>
        </div>
      </div>
      <div class="wrapper_centent">
        <div class="chatWrapper_header">
          <label class="chatTitle">智能图库</label>
        </div>
        <div class="painting_centent">
          <div class="chatView">
            <div class="painting_data_right">
              <div class="image_view">
                <el-image
                  :src="imageUrl"
                  lazy
                  fit="fill"
                  :preview-src-list="[imageUrl]"
                  style="width: 100%; height: 100%"
                ></el-image>
              </div>
              <div class="upload_text">{{ taskPrompt }}</div>
            </div>
          </div>
          <div class="chatFooter">
            <div class="send">
              <i class="el-icon-circle-plus"></i>
              <el-input
                resize="none"
                type="textarea"
                placeholder="输入您的问题"
                autosize
                v-model="prompt"
                clearable
                class="input"
                maxlength="300"
                show-word-limit
              ></el-input>
              <div class="send_line"></div>
              <div class="send_view" @click="submitDraw">
                <img
                  src="../../assets/images/send.png"
                  alt=""
                  class="send_img"
                />
                <div class="send_text">发送</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--<el-upload-->
    <!--    class="avatar-uploader"-->
    <!--    :action='action'-->
    <!--    :show-file-list="false"-->
    <!--    :on-success="handleAvatarSuccess"-->
    <!--    :before-upload="beforeAvatarUpload">-->
    <!--  <div class="upload_dy">-->
    <!--    <el-button size="small" icon="el-icon-upload" type="text" class="upload_btn">上传本地图片-->
    <!--    </el-button>-->
    <!--  </div>-->
    <!--</el-upload>-->
  </div>
</template>
<script>
import vHead from "@/components/Header.vue";
import bus from "@/utils/bus";
import {
  deleteTaskAPI,
  drawAPI,
  getModuleConfigAPI,
  getTaskListAPI,
} from "@/api";
import Task from "@/pages/draw/task.vue";
import request from "@/utils/request";

export default {
  name: "painting",
  components: { Task, vHead },
  data() {
    return {
      action: "http://39.106.69.95:8099/uploadImg",
      uploadFile: "",
      taskData: {
        imgUrl: "",
      },
      activeTask: 0,
      taskId: "",
      isTask: false,
      data: {},
      taskList: [],
      menuList: [],
      activeIndex: 0,
      active: 0,
      tabs: ["文字描述", "快捷模板", "高级自定义"],
      prompt: "",
      editForm: {
        name: "",
        imageUrl: "",
      },
      imageUrl: require("../../assets/images/upload_bg.png"),
      imageUrl2: "",
      width: "30%",
      height: "95%",
      taskPrompt: "请开始你的创造吧",
      taskStatus: 0,
    };
  },
  created() {
    const params = {
      moduleId: sessionStorage.getItem("activeId"),
    };
    getModuleConfigAPI(params).then((res) => {
      if (res.code == 200) {
        this.menuList = res.data;
        this.data = res.data[0];
      }
    });
  },
  mounted() {
    this.handleTaskList();
    this.openWebSocket();
  },
  methods: {
    //开启webSocket

    openWebSocket() {
      let that = this;
      const ws = new WebSocket(
        "ws://39.106.69.95:8099/webSocket/" + sessionStorage.getItem("uid"),
      );
      ws.onopen = function () {
        console.log("打开连接");
        ws.send("发送数据");
      };
      ws.onmessage = function (evt) {
        console.log("数据已接收", evt);
        that.handleTaskList();
      };
      ws.onclose = function () {
        console.log("连接已关闭...");
      };
    },

    //获取任务
    getTask(item, index) {
      this.activeTask = index;
      this.taskId = item.id;
      this.taskPrompt = "";
      if (item.imageUrl) {
        this.imageUrl2 = item.imageUrl;
      } else {
        this.imageUrl2 = "";
      }
      if (item.status == 2) {
        this.taskStatus = 2;
        if (item.imgUrl) {
          this.imageUrl = item.imgUrl;
          this.height = item.height + "px";
          this.width = item.width + "px";
        } else {
          this.imageUrl = require("../../assets/images/upload_bg.png");
        }
        this.taskPrompt = "提示词:" + item.prompt;
      } else if (item.status == 1) {
        this.width = "70%";
        this.height = "70%";
        this.taskStatus = 1;
        this.taskPrompt = "任务正在生成中，请稍后...";
      } else {
        this.width = "90%";
        this.height = "90%";
        this.taskStatus = 0;
        this.taskPrompt = "请开始你的创造吧";
        this.imageUrl = require("../../assets/images/upload_bg.png");
      }
    },

    //删除任务
    deleteTask(id) {
      const params = {
        taskId: id,
      };
      deleteTaskAPI(params).then((res) => {
        if (res.code == 200) {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.handleTaskList();
        }
      });
    },
    //查询任务列表
    handleTaskList() {
      const params = {
        model: "StableDiffusion",
      };
      getTaskListAPI(params).then((res) => {
        if (res.code == 200) {
          this.taskList = res.data;
          //taskId
          if (res.data.length > 0) {
            this.taskId = res.data[0].id;

            if (res.data[0].imageUrl) {
              this.imageUrl2 = res.data[0].imageUrl;
            } else {
              this.imageUrl2 = "";
            }
            if (res.data[0].status == 2) {
              if (res.data[0].imgUrl) {
                console.log(res.data[0].imageUrl);
                this.imageUrl = res.data[0].imgUrl;
                this.height = res.data[0].height + "px";
                this.width = res.data[0].width + "px";
                if (res.data[0].prompt) {
                  this.taskPrompt = "提示词: " + res.data[0].prompt;
                } else {
                  this.taskPrompt = "任务出错了~";
                }
              } else {
                this.imageUrl = require("../../assets/images/upload_bg.png");
              }
            } else if (res.data[0].status == 1) {
              this.width = "60%";
              this.height = "60%";
              this.taskStatus = 1;
              this.taskPrompt = "任务正在生成中，请稍后...";
            } else if (res.data[0].status == 0) {
              this.width = "90%";
              this.height = "90%";
              this.taskStatus = 0;
              this.taskPrompt = "请开始你的创造吧";
              this.imageUrl = require("../../assets/images/upload_bg.png");
            }

            this.getTask(res.data[0], 0);
          }
        }
      });
    },
    openWin() {
      this.isTask = true;
    },
    handleClose() {
      this.isTask = false;
      //刷新页面
      window.location.reload();
    },
    handleSelect(data, index) {
      console.log(data);
      this.data = data;
      this.activeIndex = index;
    },
    handleBack() {
      this.$router.go(-1);
    },
    handleAvatarSuccess(res, file) {
      this.uploadFile = res.data.fileUrl;
      this.imageUrl2 = res.data.fileUrl;
    },
    beforeAvatarUpload(file) {
      console.log(file);
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG/PNG/JPEG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    //绘画
    submitDraw() {
      if (this.prompt == "") {
        this.$message.error("请输入文字描述");
        return;
      }
      const params = {
        taskId: this.taskId,
        prompt: this.prompt,
        imgUrl: this.uploadFile,
      };
      drawAPI(params).then((res) => {
        if (res.code == 200) {
          this.$message({
            message: "任务提交成功，请等待AI生成图片",
            type: "success",
          });
          this.uploadFile = "";
          this.prompt = "";
          this.getTask(res.data, this.activeTask);
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
.paintingHome {
  height: 100%;
  .painting-centainr {
    display: flex;
    width: 100%;
    height: 100%;
  }

  .chatSidebar {
    width: 200px;
    background: #000000;
  }
  .chatSidebar_user {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 200px;
    .user_img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 2px solid rgba(255, 255, 255, 0.5);
      margin-top: 24px;
    }
    .user_add {
      width: 160px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      background: rgba(228, 98, 98, 0.3);
      border: 2px dashed rgb(228, 98, 98);
      box-shadow: 0px 7px 7px 0px rgba(233, 38, 38, 0.25);
      color: #ffffff;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 3px;
      margin-top: 15px;
      cursor: pointer;
    }
  }
  .wrapper_list {
    margin-top: 20px;
    height: calc(100vh - 260px);
    overflow: hidden;
    overflow-y: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    .wrapper_meun {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(255, 255, 255, 0.3);
      width: 160px;
      min-height: 48px;
      height: 48px;
      padding: 0 0 0 10px;
      border-radius: 5px;
      cursor: pointer;
      box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.06);
      margin-bottom: 10px;
    }
    .wrapper_meun_active {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(228, 98, 98, 0.8);
      width: 160px;
      min-height: 48px;
      height: 48px;
      padding: 0 0 0 10px;
      border-radius: 5px;
      cursor: pointer;
      box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.06);
      margin-bottom: 10px;
    }
    .wrapper_name {
      font-size: 13px;
      color: #ffffff;
      font-weight: bold;
      letter-spacing: 3px;
      //  一行展示，超出显示省略号
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .wrapper_img {
      width: 18px;
      height: 18px;
      margin-right: 10px;
      margin-left: 10px;
    }
    .el-icon-delete {
      color: #ffffff;
      font-size: 16px;
      margin-right: 10px;
    }
  }

  .painting_centent {
    height: calc(100vh - 100px);
    position: relative;
    margin: 15px 24px;
    border-radius: 10px;
    .chatView {
      height: calc(100vh - 240px);
      border-right: 5px;
      padding: 20px;
      overflow: hidden;
      overflow-y: auto;
      .painting_data_right {
        width: 245px;
      }
      .image_view {
        width: 245px;
        height: 300px;
        border-radius: 15px;
        background: rgba(255, 255, 255, 0.3);
      }
      .upload_text {
        font-size: 14px;
        color: #ffffff;
        margin-top: 10px;
        text-align: center;
      }
    }
    .chatFooter {
      margin: 0 24px;
      .input /deep/.el-textarea__inner {
        border: none;
        margin: 0 10px;
        font-size: 13px;
        color: #ffffff;
        background: #000000;
      }
      /deep/.el-textarea .el-input__count {
        display: none !important;
      }
      .el-icon-circle-plus {
        color: #ffffff;
        font-size: 20px;
        margin-left: 15px;
        margin-right: -10px;
        cursor: pointer;
      }
      .send {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: flex-end;
        background: #000000;
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-sizing: border-box;
        border-radius: 10px;
        align-items: center;
        overflow: hidden;
        overflow-y: auto;
        border-radius: 100px;
        .send_view {
          display: flex;
          align-items: center;
          width: 80px;
        }
        .send_line {
          width: 1px;
          min-height: 35px;
          background: rgba(255, 255, 255, 0.4);
          margin: 0 20px;
        }
        .send_img {
          width: 15px;
          height: 15px;
          margin-right: 5px;
          cursor: pointer;
        }
        .send_text {
          font-size: 14px;
          color: #f47c7c;
        }
      }
    }
  }
  .wrapper_centent {
    width: 100%;
    .chatWrapper_header {
      display: flex;
      align-items: center;
      margin: 0 24px 20px 24px;

      .chatTitle {
        font-weight: bold;
        font-size: 14px;
        color: #ffffff;
      }
    }
  }

  .avatar {
    height: 300px;
    display: block;
    margin: 0 20px;
    border-radius: 10px;
    text-align: center;
  }
}
</style>
