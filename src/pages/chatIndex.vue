<!--对话/聊天-->
<template>
  <div class="chatHome">
    <!-- 内容部分 -->
    <div class="centainr">
      <div class="centainr_view">
        <el-page-header @back="goBack" content="AI对话"></el-page-header>
        <!--<div class="centainr_title">一级标题</div>-->
        <!--<div class="centainr_dect">sjasndans,dnas,ndn</div>-->
      </div>
      <!--内容中心-->
      <div class="chatWrapper">
        <div class="wrapper_left">
          <div class="wrapper_left_header">
            <el-input placeholder="输入搜索对话" size="mini" prefix-icon="el-icon-search" v-model="input2" @input="getChatList(input2)" clearable></el-input>
            <div class="el-icon-plus" @click="handlAdd"></div>
          </div>
          <div class="wrapper_left_list" >
            <div :class="item.id==activeRoomId? 'wrapper_left_meun_active':'wrapper_left_meun'" v-for="(item,index) in chatList" :key="index">
              <div class="wrapper_left_01" @click="selectRoom(item.id)">
                <div class="wrapper_left_title">{{ item.roomName }}</div>
                <div class="wrapper_left_time">{{ item.createAt }}</div>
              </div>
              <div class="wrapper_left_02">
                <!--<img src="../assets/images/icon12.png" alt="" class="wrapper_left_img" @click="handleOpen(item)">-->
                <!--<img src="../assets/images/icon13.png" alt="" class="wrapper_left_img" @click="handleDelete(item)">-->
              </div>
            </div>
          </div>
        </div>
        <div class="wrapper_right">
          <div class="wrapper_right_header">
            <div class="wrapper_right_01">
              <!--<img src="../assets/images/icon08.png" alt="" class="wrapper_right_img1">-->
              <label class="wrapper_right_label">新对话</label>
            </div>
            <div class="wrapper_right_02">
              <div class="wrapper_right_icon">
                <!--<img src="" alt="" class="wrapper_right_img">-->
              </div>
              <div class="wrapper_right_icon">
                <!--<img src="" alt="" class="wrapper_right_img">-->
              </div>
              <div class="wrapper_right_icon">
                <!--<img src="" alt="" class="wrapper_right_img">-->
              </div>
            </div>
          </div>
          <!--  发送模块-->
          <div v-loading="loading" element-loading-text="记录加载中" element-loading-spinner="el-icon-loading" element-loading-background="#ffffff" element-loading-body="rgb(250, 100, 0)">
            <div ref="chatMain" class="chatView" >
              <div class="chatView_list">
                <div class="chatView_page" v-for="(item,index) in chatRecordList" :key="index">
                  <div v-if="item.role === 'ai'&&item.status==0" class="chatView_page_01">
                    <div class="chatView_page_meun">
                      <div class="chatView_page_logo"></div>
                      <div class="chatView_page_info">
                        <div class="chatView_page_text" id="chatContext">{{ item.context }}</div>
                        <div class="chatView_page_time">{{ item.time }}</div>
                      </div>
                    </div>
                  </div>

                  <div v-if="item.role === 'ai'&&item.status==1" class="chatView_page_01">
                    <div class="chatView_page_meun">
                      <div class="chatView_page_logo"></div>
                      <div class="chatView_page_info">
                        <div class="chatView_page_text" id="chatContext">{{ displayedText }}</div>
                        <div class="chatView_page_time">{{ item.time }}</div>
                      </div>
                    </div>
                  </div>
                  <div v-else-if="item.role === 'user'" class="chatView_page_02">
                    <div class="chatView_page_meun">
                      <div class="chatView_page_info1">
                        <div class="chatView_page_text">{{ item.context }}</div>
                        <div class="chatView_page_time">{{ item.time }}</div>
                      </div>
                      <div class="chatView_page_logo1"></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div class="chatFooter" >
              <div class="send">
                <el-input resize="none" type="textarea" placeholder="输入消息内容（shift+enter换行）" autosize v-model="textarea" clearable @keydown.native="Keydown"></el-input>
                <!--<img src="../assets/images/send.png" alt="" class="send_img" @click="sendMsg(textarea)">-->
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!--    弹框修改对话名称-->
    <el-dialog title="修改对话名称" :visible.sync="dialogVisible" width="20%" :close-on-click-modal="false">
      <el-form :model="form">
        <el-form-item prop="roomName">
          <el-input v-model="form.roomName" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" style="background-color: #FA6400; border: #FA6400;" size="mini" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>

  </div>

</template>
<script>
import {askQuestionAPI, createChatAPI, deleteChatAPI, editChatNameAPI, getChatListAPI, getChatRecordAPI} from "@/api";  //tab展示
export default {
  components: {},
  name: "chatIndex",
  data() {
    return {
      loading: false,
      activeRoomId: '',
      form: {
        id: '',
        roomName: ''
      },
      input2: '',
      textarea: '',
      chatList: [],
      chatRecordList: [],
      dialogVisible: false,
      displayedText: '',
      text: '',

    }
  },
  mounted() {
    this.getChatList();

  },
  watch: {
    activeRoomId: function (val) {
      this.getChatRecord();
    },
    text: function (val) {
      this.typeWriter();
    }
  },
  methods: {
    goBack() {
      this.$router.push('/')
    },
    //打字机效果
    typeWriter() {
      let i = 0;
      let speed = 100;
      let timer = setInterval(() => {
        if (i < this.text.length) {
          this.displayedText += this.text.charAt(i);
          i++;
        } else {
          clearInterval(timer);
          //把chatRecordList最后一条的时间改成当前时间
          this.chatRecordList[this.chatRecordList.length - 1].status = 0

        }
      }, speed);
    },

    getChatRecord() {
      const params = {
        roomId: this.activeRoomId
      }
      getChatRecordAPI(params).then(res => {
        if (res.code == 200) {
          this.chatRecordList = res.data
          this.changeHeight()
        } else {
          this.$message.error(res.msg);
        }
      })
    },

    selectRoom(data) {
      this.activeRoomId = data
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    sendMsg(data) {
      console.log(data)
      const params = {
        roomId: this.activeRoomId,
        question: data
      }
      const resData = {
        role: 'user',
        context: data,
        time: new Date().toLocaleString()
      }
      this.chatRecordList.push(resData)
      const resData2 = {
        role: 'ai',
        context: '思考中.。。。',
        status: 0,
        time: ''
      }
      this.chatRecordList.push(resData2)
      askQuestionAPI(params).then(res => {
        if (res.code == 200) {
          //删除最后一条
          this.chatRecordList.splice(this.chatRecordList.length - 1, 1)
          this.text = res.data.answer
          const resData = {
            role: 'ai',
            context: res.data.answer,
            status: 1,
            time: new Date().toLocaleString()
          }
          this.chatRecordList.push(resData)

        } else {
          this.$message.error(res.msg);
        }
      })
      this.textarea = ''
    },


    submitForm() {
      const params = {
        roomId: this.form.id,
        roomName: this.form.roomName
      }
      editChatNameAPI(params).then(res => {
        if (res.code == 200) {
          this.dialogVisible = false;
          this.getChatList();
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    //弹窗
    handleOpen(data) {
      this.selectRoom(data.id)
      this.dialogVisible = true;
      this.form.id = data.id;
      this.form.roomName = data.roomName;
    },
    //删除对话
    handleDelete(data) {
      this.selectRoom(data.id)
      //二次确认
      this.$confirm('此操作将永久删除该对话, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          roomId: data.id
        }
        deleteChatAPI(params).then(res => {
          if (res.code == 200) {
            this.getChatList();
          } else {
            this.$message.error(res.msg);
          }
        })
      }).catch(() => {

      });
    },
    //获得对话列表
    getChatList(data) {
      const params = {
        roomName: data
      }
      getChatListAPI(params).then(res => {
        if (res.code == 200) {
          this.chatList = res.data
          //默认选中第一个
          if (this.chatList.length > 0) {
            this.activeRoomId = this.chatList[0].id
          }
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    //创建新会话
    handlAdd() {
      createChatAPI().then(res => {
        if (res.code == 200) {
          this.getChatList();
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    Keydown(e) {
      if (e.keyCode === 13 && e.shiftKey) {
        this.textarea += '\n'
      } else if (e.keyCode === 13) { // enter
        this.sendMsg(this.textarea)
        this.textarea = ''
      }
    },
    //自适应高度，滚动到最底部
    changeHeight() {
      this.$nextTick(() => {
        let chatboxContainer = this.$refs.chatMain // 获取对
        var container = this.$el.querySelector(".chatView");
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      })
    },
  }
}
</script>
<style scoped lang="less">
.chatHome {
  padding: 24px;

  .centainr {
    //height: calc(100vh - 160px);
    background: linear-gradient(90deg, rgba(255, 244, 242, 1) 0%, rgba(252, 243, 255, 1) 100%);
    margin-top: 20px;
    border-radius: 10px;
    padding: 20px 30px;
  }

  .centainr_view {
    .centainr_title {
      font-size: 14px;
      color: #000;
      font-weight: bold;
      letter-spacing: 2px;
    }

    .centainr_dect {
      font-size: 12px;
      color: #888888;
      letter-spacing: 4px;
      margin-top: 5px;
    }
  }

  .chatWrapper {
    margin-top: 20px;
    display: flex;

    .wrapper_left {
      width: 350px;
      height: calc(100vh - 150px);
      background: #fff;
      padding: 10px 15px;

      .wrapper_left_header {
        display: flex;
        align-items: center;
      }

      .el-icon-plus {
        width: 50px;
        height: 35px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #eeeeee;
        margin-left: 10px;
      }

      .wrapper_left_list {
        margin-top: 30px;
        height: calc(100vh - 220px);
        overflow: hidden;
        overflow-y: auto;

        .wrapper_left_meun {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1px solid #FA6400;
          border-radius: 5px;
          height: 60px;
          padding-left: 15px;
          margin-bottom: 10px;
        }

        .wrapper_left_meun:hover {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 3px solid #FA6400;
          border-radius: 5px;
          height: 60px;
          padding-left: 15px;
          margin-bottom: 10px;
        }

        .wrapper_left_meun_active {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 3px solid #FA6400;
          border-radius: 5px;
          background-color: rgba(174, 185, 203, 0.48);
          height: 60px;
          padding-left: 15px;
          margin-bottom: 10px;
        }

        .wrapper_left_title {
          font-size: 15px;
          color: #FA6400;
          font-weight: bold;
        }

        .wrapper_left_time {
          font-size: 10px;
          color: #888888;
          margin-top: 6px;
        }

        .wrapper_left_img {
          width: 15px;
          height: 15px;
          margin-right: 12px;
        }
      }

    }

    .wrapper_right {
      width: 100%;
      height: calc(100vh - 150px);
      position: relative;

      .wrapper_right_header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #FFFFFF;
        height: 60px;
        padding: 0 20px;

        .wrapper_right_01 {
          display: flex;
          align-items: center;
        }

        .wrapper_right_label {
          font-size: 14px;
          color: #333333;
          margin-left: 10px;
          font-weight: bold;
        }

        .wrapper_right_02 {
          display: flex;
          align-items: center;
        }

        .wrapper_right_icon {
          width: 35px;
          height: 35px;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #eeeeee;
          margin-right: 10px;
        }

        .wrapper_right_img {
          width: 12px;
          height: 12px;
        }

        .wrapper_right_img1 {
          width: 15px;
          height: 16px;
        }
      }

      .chatView {
        background: #FFFFFF;
        margin: 30px;
        height: calc(100vh - 270px);
        border-right: 5px;
        padding: 24px;
        overflow: hidden;
        overflow-y: auto;

        .chatView_list {
          padding-bottom: 50px;
        }

        .chatView_page_02 {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .chatView_page_meun {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }

        .chatView_page_logo {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #FA6400;
          margin-right: 10px;
          //不被压缩
          flex-shrink: 0;
        }

        .chatView_page_logo1 {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #FA6400;
          margin-left: 10px;
        }

        .chatView_page_info {
          display: flex;
          flex-direction: column;
          max-width: 50%;
          .chatView_page_text {
            font-size: 14px;
            color: #FFFFFF;
            background: rgb(250, 100, 0);
            border-radius: 10px 10px 10px 0px;
            padding: 15px 15px;
            line-height: 25px;
          }

          .chatView_page_time {
            font-size: 10px;
            color: #636A77;
            margin-top: 10px;
          }
        }

        .chatView_page_info1 {
          display: flex;
          flex-direction: column;

          .chatView_page_text {
            font-size: 14px;
            color: #333333;
            background: #FFFFFF;
            border-radius: 15px 15px 15px 0px;
            padding: 20px 15px;
            border: 1px solid #eeeeee;
          }

          .chatView_page_time {
            font-size: 10px;
            color: #636A77;
            margin-top: 10px;
          }
        }
      }

      .chatFooter {
        width: 95%;
        background: #FFFFFF;
        height: 70px;
        position: absolute;
        bottom: -20px;
        margin: 0 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
      }

      .send {
        width: 90%;
        display: flex;
        align-items: flex-end;

        .send_img {
          width: 40px;
          height: 40px;
          margin-left: 10px;
          cursor: pointer;
        }
      }
    }
  }


}
</style>
