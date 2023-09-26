<!--对话/聊天-->
<template>
  <div class="chatHome">
    <v-head></v-head>
    <div class="chatcentainr">
      <div class="chatSidebar">
        <div class="chatSidebar_user">
          <img src="../assets/images/home_user.png" alt="" class="user_img">
          <div class="user_add" @click="handlAdd">新对话</div>
        </div>
        <div class="wrapper_title">聊天列表</div>
        <div class="wrapper_list" >
          <div :class="item.id==activeRoomId? 'wrapper_meun_active':'wrapper_meun'" v-for="(item,index) in chatList" :key="index">
            <div class="wrapper_name">{{ item.roomName }}</div>
            <img src="../assets/images/icon_del.png" alt="" class="wrapper_img" @click="handleDelete(item)">
          </div>
        </div>
      </div>
      <div class="chatWrapper">
        <div class="chatWrapper_header">
          <img src="../assets/images/chat_arrow.png" alt="" class="chatImg">
          <label class="chatTitle">原生GTP4.0</label>
        </div>
        <div class="wrapper_right">
          <div class="chatTab">
            <div v-for="(item,index) in tabs" :key="index" class="chatTab_text" :class="{'chatTabbg':tabsActive == index}" @click="handlTabs(index)">{{ item }}</div>
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
              <div class="chatFooter_dect">
                <div class="chatFooter_dect_active" @click="handlShare">生成海报</div>
                <div class="chatFooter_dect_active" @click="handlAddTip">添加提示词</div>
                <div class="chatFooter_dect_active" @click="handlFeedback">问题反馈</div>
              </div>
              <div class="send">
                <el-input resize="none" type="textarea" placeholder="输入您的问题（Shift+Enter换行" autosize v-model="textarea" clearable @keydown.native="Keydown" class="input" maxlength="300" show-word-limit></el-input>
                <div class="send_line"></div>
                <img src="../assets/images/send.png" alt="" class="send_img" @click="sendMsg(textarea)">
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
import {askQuestionAPI, createChatAPI, deleteChatAPI, editChatNameAPI, getChatListAPI, getChatRecordAPI} from "@/api";
import vHead from "@/components/Header.vue";  //tab展示
export default {
  components: {vHead},
  name: "chatIndex",
  data() {
    return {
      loading: false,
      activeRoomId: '',
      tabsActive:0,
      tabs: ['GPTAI3.5', 'GPTAI4.0'],
      form: {
        id: '',
        roomName: ''
      },
      input2: '',
      textarea: '',
      chatList: [{
        roomName: '对话1',
      },{
        roomName: '对话2',
      },{
        roomName: '对话3',
      },{
        roomName: '对话4',
      },{
        roomName: '对话5',
      },{
        roomName: '对话6',
      }],
      chatRecordList: [{
        context: '你好',
        time: '2021-01-01 12:00:00',
        role: 'ai',
        status: 0
      },{
        context: '就打架大家的大家都觉得就',
        time: '2021-01-01 12:00:00',
        role: 'user',
        status: 1
      },{
        context: '你好',
        time: '2021-01-01 12:00:00',
        role: 'ai',
        status: 0
      },{
        context: '就打架大家的大家都觉得就',
        time: '2021-01-01 12:00:00',
        role: 'user',
        status: 1
      },{
        context: '你好',
        time: '2021-01-01 12:00:00',
        role: 'ai',
        status: 0
      },{
        context: '就打架大家的大家都觉得就',
        time: '2021-01-01 12:00:00',
        role: 'user',
        status: 1
      },{
        context: '你好',
        time: '2021-01-01 12:00:00',
        role: 'ai',
        status: 0
      },{
        context: '就打架大家的大家都觉得就',
        time: '2021-01-01 12:00:00',
        role: 'user',
        status: 1
      },],
      dialogVisible: false,
      displayedText: '',
      text: '',

    }
  },
  mounted() {
    // this.getChatList();

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
    handlTabs(data){
      this.tabsActive = data
    },
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
    handlShare() {
      this.$message.success('生成海报');
    },
    handlAddTip() {
      this.$message.success('添加提示词');
    },
    handlFeedback() {
      this.$message.success('问题反馈');
    }
  }
}
</script>
<style scoped lang="less">
.chatHome {
  height: 100%;
  .chatcentainr{
    display: flex;
    width: 100%;
    height: 100%;
  }
  .chatSidebar{
    background: linear-gradient(rgb(255, 157, 157),rgb(241, 76, 76));
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    width: 200px;

  }
  .chatSidebar_user{
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 200px;
    .user_img{
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 2px solid rgba(255, 255, 255, 0.5);
      margin-top: 24px;
    }
    .user_add{
      width: 100px;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      background: #FFFFFF;
      box-shadow: 0px 7px 7px 0px rgba(233, 38, 38, 0.25);
      color: rgb(240, 72, 72);
      font-family: 阿里巴巴普惠体;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 3px;
      margin-top: 15px;
    }
  }
  .wrapper_title{
    font-size: 14px;
    color: #FFFFFF;
    font-weight: bold;
    margin-top: 30px;
    margin-left: 15px;
    letter-spacing: 3px;
  }
  .wrapper_list {
    margin-top: 20px;
    height: calc(100vh - 220px);
    overflow: hidden;
    overflow-y: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    .wrapper_meun {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(255, 255, 255, 0.35);
      width: 160px;
      height: 48px;
      padding: 0 0 0 10px;
      border-radius: 5px;
      cursor: pointer;
      box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.06);
      margin-bottom: 10px;
    }
    .wrapper_name {
      font-size: 13px;
      color: #FFFFFF;
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
  }

  .chatWrapper {
    //display: flex;
    width: 100%;
    .chatWrapper_header{
      display: flex;
      align-items: center;
      margin: 20px 24px;
      .chatImg{
        width: 30px;
        height: 30px;
      }
      .chatTitle{
        font-weight: bold;
        font-size: 14px;
        color:333333 ;
        margin-left: 10px;
      }
    }
    .wrapper_right {
      height: calc(100vh - 150px);
      position: relative;
      background: #FFFFFF;
      margin: 15px 24px ;
      border-radius: 10px;
      .chatTab{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 240px;
        height: 60px;
        background: rgb(241, 76, 76);
        border-radius: 8px;
        margin: auto;
        position: relative;
        top: 20px;
        .chatTab_text{
          width: 105px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgb(255, 255, 255);
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 1px;
          cursor: pointer;
        }
        .chatTabbg{
          width: 105px;
          height: 45px;
          background: #FFFFFF;
          border-radius: 5px;
          color: rgb(241, 76, 76);
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 1px;
          cursor: pointer;
        }
      }
      .chatView {
        height: calc(100vh - 380px);
        border-right: 5px;
        padding: 20px;
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
        background: #FFFFFF;
        height: 150px;
        margin: 0 24px;
        .chatFooter_dect{
          display: flex;
          width: 100%;
          margin-bottom: 15px;
          .chatFooter_dect_active{
            width: 120px;
            height: 40px;
            background: rgb(255, 238, 238);
            border-radius:100px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgb(244, 124, 124);
            font-size: 13px;
            font-weight: 400;
            letter-spacing: 2px;
            margin-right: 10px;
            cursor: pointer;
          }
        }
      }
      .input /deep/.el-textarea__inner{
        border: none;
        margin: 0 10px;
        font-size: 13px;
        color: #333333;
        font-weight: bold;
        letter-spacing: 2px;
      }
      .send {
        width: 100%;
        height: 60px;
        display: flex;
        align-items: flex-end;
        border: 1px solid rgb(241, 76, 76);
        box-sizing: border-box;
        border-radius: 10px;
        align-items: center;
        overflow: hidden;
        overflow-y: auto;
        .send_line{
          width: 1px;
          min-height: 40px;
          background: rgba(243, 116, 116, 0.36);
          margin: 0 20px;
        }
        .send_img {
          width: 35px;
          height: 35px;
          margin-right: 20px;
          cursor: pointer;
        }
      }
    }
  }


}
</style>
