<!--绘画-->

<template>
  <div class="paintingHome">
    <v-head></v-head>
    <!-- 登录-->
    <Task @close="handleClose()" v-if="isTask"></Task>
    <div class="painting-centainr">
      <div class="wrapper_sidebar" :class="{'painting_sidebar': collapse}">
        <div class="sidebar_list">
          <div :class="activeIndex == index ? 'sidebar_meun_active' : 'sidebar_meun' " v-for="(item,index) in menuList"
               :key="index" @click="handleSelect(item,index)">
            <img :src="item.icon" alt="" class="sidebar_img">
            <label class="sidebar_label">{{ item.name }}</label>
          </div>
        </div>
      </div>
      <div class="wrapper_centent">
        <div class="chatWrapper_header">
          <img src="../../assets/images/chat_arrow.png" alt="" class="chatImg" @click="handleBack()">
          <label class="chatTitle">智能做图</label>
        </div>
        <div class="painting_centent">
          <div class="painting_data">
            <el-row :gutter="20">
              <el-col :span="17">
                <div class="painting_data_right">
                  <div style="padding:0 20px;width: 100%;  ">
                    <el-image :src="imageUrl" lazy
                              :style="'width: '+this.width+'; height:'+this.height+';  text-align: center;'"></el-image>
                  </div>
                  <div :class="'upload_text_'+taskStatus">{{ taskPrompt }}</div>
                </div>
              </el-col>
              <el-col :span="7">
                <div class="painting_data_left">
                  <div class="left_title">{{ data.introduce }}</div>
                  <div class="left_btn" @click="openWin">
                    <i class="el-icon-plus"></i>
                    <label class="left_btn_text">新建任务</label>
                  </div>
                  <div class="left_list">
                    <div :class="activeTask == index ? 'list_meun_active' : 'list_meun' " class="list_meun"
                         v-for="(item,index) in taskList" :key="index" @click="getTask(item,index)">
                      <div class="list_meun_left">
                        <img src="../../assets/images/Frame_1.png" alt="" class="list_meun_img" v-if="">
                        <span class="list_meun_text">{{ item.name }} </span>
                      </div>
                      <i class="el-icon-delete" @click="deleteTask(item.id)"></i>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="painting_data">
            <el-row :gutter="20">
              <el-col :span="17">
                <div class="painting_data_rightup">
                  <div class="painting_data_header">
                    <div class="rightup_tabs">
                      <div v-for="(item,index) in tabs" :key="index"
                           :class="active == index ? 'rightup_tabs_active' : 'rightup_tabs_text'">{{ item }}
                      </div>
                    </div>
                    <div class="rightup_footer">
                      <el-upload
                          class="avatar-uploader"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess"
                          :before-upload="beforeAvatarUpload">
                        <div class="upload_dy">
                          <el-button size="small" icon="el-icon-upload" type="text" class="upload_btn">上传本地图片
                          </el-button>
                        </div>
                      </el-upload>
                      <div class="tabs_btn" @click="submitDraw">提交</div>
                    </div>

                  </div>
                  <div class="painting_data_input">
                    <textarea rows="10" cols="133" maxlength="300" placeholder="请输入文字描述" v-model="prompt"
                              class="rightup_input"></textarea>
                  </div>
                </div>
              </el-col>
              <el-col :span="7">
                <div class="painting_data_leftup">
                  <div class="painting_more">更多功能</div>
                  <div class="painting_view">
                    <div>
                      <img src="../../assets/images/Group_01.png" alt="" class="group_img">
                      <div class="group_text">文字生图</div>
                    </div>
                    <div>
                      <img src="../../assets/images/Group_02.png" alt="" class="group_img">
                      <div class="group_text">灵魂绘图</div>
                    </div>
                    <div>
                      <img src="../../assets/images/Group_03.png" alt="" class="group_img">
                      <div class="group_text">更多</div>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import vHead from "@/components/Header.vue";
import bus from "@/utils/bus";
import {deleteTaskAPI, drawAPI, getModuleConfigAPI, getTaskListAPI} from "@/api";
import Task from "@/pages/draw/task.vue";
import request from "@/utils/request";

export default {
  name: "painting",
  components: {Task, vHead},
  data() {
    return {
      taskData: {
        imgUrl: ''
      },
      activeTask: 0,
      taskId: '',
      isTask: false,
      data: {},
      taskList: [],
      menuList: [],
      collapse: false,
      activeIndex: 0,
      active: 0,
      tabs: ['文字描述', '快捷模板', '高级自定义'],
      prompt: '',
      editForm: {
        name: '',
        imageUrl: ''
      },
      imageUrl: require('../../assets/images/upload_bg.png'),
      width: '95%',
      height: '95%',
      taskPrompt: '请开始你的创造吧',
      taskStatus: 0
    }
  },
  created() {
    const params = {
      moduleId: sessionStorage.getItem('activeId')
    }
    getModuleConfigAPI(params).then(res => {
      if (res.code == 200) {
        this.menuList = res.data;
        this.data = res.data[0]
      }
    });


    bus.$on('collapse', msg => {
      this.collapse = msg;
    });
  },
  mounted() {
    this.handleTaskList();
    this.openWebSocket();
  },
  methods: {
    //开启webSocket

    openWebSocket() {
      const ws = new WebSocket('ws://39.106.69.95:8099/webSocket/' + sessionStorage.getItem('uid'));
      ws.onopen = function () {
        console.log('打开连接');
        ws.send('发送数据');
      };
      ws.onmessage = function (evt) {
        console.log('数据已接收', evt);
      };
      ws.onclose = function () {
        console.log('连接已关闭...');
      };
    },

    //获取任务
    getTask(item, index) {
      this.activeTask = index
      this.taskId = item.id
      this.taskPrompt = ''
      if (item.status == 2) {
        this.taskStatus = 2
        if (item.imgUrl) {
          this.imageUrl = item.imgUrl
          this.height = item.height + 'px'
          this.width = item.width + 'px'
        } else {
          this.imageUrl = require('../../assets/images/upload_bg.png')
        }
        this.taskPrompt = '提示词:'+ item.prompt
      } else if (item.status == 1) {
        this.width = '70%'
        this.height = '70%'
        this.taskStatus = 1
        this.imageUrl = require('../../assets/images/loading.gif')
        this.taskPrompt = '任务正在生成中，请稍后...'
      } else {
        this.width = '90%'
        this.height = '90%'
        this.taskStatus = 0
        this.taskPrompt = '请开始你的创造吧'
        this.imageUrl = require('../../assets/images/upload_bg.png')
      }


    },

    //删除任务
    deleteTask(id) {
      const params = {
        taskId: id
      }
      deleteTaskAPI(params).then(res => {
        if (res.code == 200) {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.handleTaskList()
        }
      });
    },
    //查询任务列表
    handleTaskList() {
      const params = {
        model: "StableDiffusion"
      }
      getTaskListAPI(params).then(res => {
        if (res.code == 200) {
          this.taskList = res.data;
          //taskId
          if (res.data.length > 0){
            this.taskId = res.data[0].id
            if (res.data[0].status == 2) {
              if (res.data[0].imageUrl) {
                this.imageUrl = res.data[0].imageUrl
                this.height = res.data[0].height + 'px'
                this.width = res.data[0].width + 'px'
                if (res.data[0].prompt) {
                  this.taskPrompt =  '提示词: '+res.data[0].prompt
                } else {
                  this.taskPrompt = '任务出错了~'
                }
              } else {
                this.imageUrl = require('../../assets/images/upload_bg.png')
              }
            } else if (res.data[0].status == 1) {
              this.width = '60%'
              this.height = '60%'
              this.taskStatus = 1
              this.imageUrl = require('../../assets/images/loading.gif')
              this.taskPrompt = '任务正在生成中，请稍后...'
            }else if (res.data[0].status==0){
              this.width = '90%'
              this.height = '90%'
              this.taskStatus = 0
              this.taskPrompt = '请开始你的创造吧'
              this.imageUrl = require('../../assets/images/upload_bg.png')
            }
          }



        }
      });
    },
    openWin() {

      this.isTask = true
    },
    handleClose() {
      this.isTask = false
      //刷新页面
      window.location.reload();
    },
    handleSelect(data, index) {
      console.log(data)
      this.data = data
      this.activeIndex = index
    },
    handleBack() {
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
    },

    //绘画
    submitDraw() {
      if (this.prompt == '') {
        this.$message.error('请输入文字描述');
        return
      }
      const params = {
        taskId: this.taskId,
        prompt: this.prompt
      }
      drawAPI(params).then(res => {
        if (res.code == 200) {
          this.$message({
            message: '任务提交成功，请等待AI生成图片',
            type: 'success'
          });
        }
      });
    },

  }
}
</script>

<!--suppress CssInvalidPropertyValue -->
<style scoped lang="less">
.paintingHome {
  height: 100%;

  .painting_centent {
    height: calc(100vh - 150px);
    overflow: hidden;
    overflow-y: auto;
  }

  .painting_sidebar {
    animation: fadeOutLeft; /* referring directly to the animation's @keyframe declaration */
    animation-duration: 0.8s;
    display: none;
  }

  .painting-centainr {
    display: flex;
    width: 100%;
    height: 100%;
  }

  .wrapper_sidebar {
    background: #FFFFFF;
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
    width: 200px;

    .sidebar_list {
      height: calc(100vh - 100px);
      overflow: hidden;
      overflow-y: auto;
      margin-top: 10px;
    }

    .sidebar_meun {
      display: flex;
      align-items: center;
      height: 60px;
      padding: 0 20px;
    }

    .sidebar_meun_active {
      display: flex;
      align-items: center;
      height: 60px;
      padding: 0 20px;
      background: rgb(255, 247, 247);
      border-right: 3px solid #F04848;
    }

    .sidebar_img {
      width: 25px;
      height: 25px;
      border-radius: 50%;
    }

    .sidebar_label {
      margin-left: 10px;
      font-size: 13px;
      color: #333333;
    }
  }

  .wrapper_centent {
    width: 100%;

    .chatWrapper_header {
      display: flex;
      align-items: center;
      margin: 20px 24px;

      .chatImg {
        width: 30px;
        height: 30px;
        cursor: pointer;
      }

      .chatTitle {
        font-weight: bold;
        font-size: 14px;
        color: #333333;
        margin-left: 10px;
      }
    }

    .painting_data {
      //display: flex;
      position: relative;
      margin: 15px 24px;

      .painting_data_left {
        border: #eecaca 1px solid;
        width: 100%;
        height: 565px;
        background: #FFFFFF;
        box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.06);
        border-radius: 10px;

        .left_title {
          color: rgba(51, 51, 51, 0.6);
          //font-family: 阿里巴巴普惠体;
          font-size: 14px;
          font-weight: bold;
          letter-spacing: 2px;
          padding: 10px 30px;
        }

        .left_list {
          display: flex;
          align-items: center;
          //justify-content: center;
          flex-direction: column;
          margin-top: 15px;
          overflow: hidden;
          overflow-y: auto;
          height: 200px;

          .list_meun {
            background: rgb(255, 238, 238);
            border-radius: 8px;
            width: 80%;
            padding-top: 12px;
            padding-bottom: 12px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-left: 15px;
            margin-bottom: 10px;
            padding-right: 15px;

            .list_meun_left {
              display: flex;
              align-items: center;
            }

            .list_meun_img {
              width: 20px;
              height: 20px;
            }

            .list_meun_text {
              color: rgb(51, 51, 51);
              font-family: 阿里巴巴普惠体;
              font-size: 14px;
              font-weight: 400;
              margin-left: 10px;
            }

            .el-icon-delete {
              color: #F04848;
              font-size: 16px;
            }
          }

          .list_meun_active {
            background: #FCCECEFF;
            border-radius: 8px;
            width: 80%;
            padding-top: 12px;
            padding-bottom: 12px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-left: 15px;
            margin-bottom: 10px;
            padding-right: 15px;

            .list_meun_left {
              display: flex;
              align-items: center;
            }


            .list_meun_img {
              width: 20px;
              height: 20px;
            }

            .list_meun_text {
              color: rgb(51, 51, 51);
              //font-family: 阿里巴巴普惠体;
              font-size: 14px;
              font-weight: 400;
              margin-left: 10px;
            }

            .el-icon-delete {
              color: #F04848;
              font-size: 16px;
            }
          }
        }

        .left_btn {
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgb(240, 72, 72);
          border-radius: 8px;
          width: 85%;
          height: 40px;
          margin: auto;

          .el-icon-plus {
            color: #F04848;
            font-size: 20px;
          }

          .left_btn_text {
            font-size: 14px;
            color: #F04848;
            margin-left: 10px;
          }

        }

        .left_btn:hover {
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid rgb(240, 72, 72);
          border-radius: 6px;
          width: 85%;
          height: 38px;
          margin: auto;

          .el-icon-plus {
            color: #F04848;
            font-size: 20px;
            font-weight: bolder;
          }

          .left_btn_text {
            font-size: 14px;
            font-weight: bolder;
            color: #F04848;
            margin-left: 10px;
          }

        }
      }

      .painting_data_right {
        border: #eecaca 1px solid;
        width: 100%;
        height: 530px;
        background: #FFFFFF;
        box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.06);
        border-radius: 10px;
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 20px 0;
        text-align: center;
      }

      .painting_data_leftup {
        width: 100%;
        height: 200px;
        background: #FFFFFF;
        box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.06);
        border-radius: 10px;
        margin-right: 20px;

        .painting_more {

          font-size: 13px;
          color: #333333;
          font-weight: bold;
          letter-spacing: 1px;
          padding: 20px 30px;
        }

        .painting_view {

          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 10px 0;
          height: 100px;
        }

        .group_img {
          width: 40px;
          height: 42px;
        }

        .group_text {
          color: rgb(0, 0, 0);
          //font-family: 阿里巴巴普惠体;
          font-size: 13px;
          font-weight: 400;
          margin-top: 10px;
        }
      }

      .painting_data_rightup {
        width: 100%;
        height: 200px;
        background: #FFFFFF;
        box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.06);
        border-radius: 10px;

        .rightup_footer {
          display: flex;
          align-items: center;
        }

        .painting_data_input {
          padding: 10px 24px;

          .rightup_input {
            width: 100%;
            height: 100px;
            background: rgb(255, 247, 247);
            border: 1px solid rgba(240, 72, 72, 0.26);
            border-radius: 8px;
            padding: 10px;
            order: none;
            outline: none;
            font-size: 13px;
            color: #333333;
            font-weight: 400;
            letter-spacing: 2px;
          }
        }

        .painting_data_header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 30px 0 30px;
        }

        .rightup_tabs {
          display: flex;
        }

        .rightup_tabs_text {
          width: 100px;
          height: 30px;
          color: #333333;
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
        }

        .rightup_tabs_active {
          width: 100px;
          height: 30px;
          color: #FFFFFF;
          font-size: 13px;
          font-weight: bold;
          letter-spacing: 2px;
          background: linear-gradient(179.26deg, rgb(244, 124, 124) 22.803%, rgb(240, 72, 72) 96.018%), linear-gradient(151.34deg, rgb(116, 190, 254) 22.35%, rgb(13, 117, 254) 69.27%);
          border-radius: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
        }

        .upload_btn {
          width: 130px;
          height: 30px;
          color: #FFFFFF;
          font-size: 13px;
          font-weight: bold;
          letter-spacing: 2px;
          background: linear-gradient(179.26deg, rgb(244, 124, 124) 22.803%, rgb(240, 72, 72) 96.018%), linear-gradient(151.34deg, rgb(116, 190, 254) 22.35%, rgb(13, 117, 254) 69.27%);
          border-radius: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 10px;
        }

        .tabs_btn {
          width: 80px;
          height: 30px;
          color: #FFFFFF;
          font-size: 13px;
          font-weight: bold;
          letter-spacing: 2px;
          background: linear-gradient(179.26deg, rgb(244, 124, 124) 22.803%, rgb(240, 72, 72) 96.018%), linear-gradient(151.34deg, rgb(116, 190, 254) 22.35%, rgb(13, 117, 254) 69.27%);
          border-radius: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
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

  .upload_text_0 {
    color: #ECA2A8E8;
    //font-family: 阿里巴巴普惠体;
    font-weight: bolder;
    font-size: 13px;
    font-weight: 400;
    //margin-top: 10px;
  }
  .upload_text_1 {
    color: rgba(155, 87, 11, 0.91);
    //font-family: 阿里巴巴普惠体;
    font-weight: bolder;
    font-size: 13px;
    font-weight: 400;
    //margin-top: 10px;
  }
  .upload_text_2 {
    color: rgba(7, 7, 7, 0.91);
    //font-family: 阿里巴巴普惠体;

    font-size: 13px;
    font-weight: bolder;
    //margin-top: 10px;
  }
}
</style>
