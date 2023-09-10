<!--对话/聊天-->
<template>
  <div class="chatHome">
    <Header></Header>
    <!-- 内容部分 -->
    <div class="centainr">
      <div class="centainr_view">
        <div class="centainr_title">一级标题</div>
        <div class="centainr_dect">sjasndans,dnas,ndn</div>
      </div>
      <!--tab展示-->
      <tabs-pupup></tabs-pupup>
      <!--内容中心-->
      <div class="chatWrapper">
        <div class="wrapper_left">
          <div class="wrapper_left_header">
            <el-input placeholder="输入搜索对话" size="mini" prefix-icon="el-icon-search" v-model="input2"></el-input>
            <div class="el-icon-plus" @click="handlAdd"></div>
          </div>
          <div class="wrapper_left_list">
            <div class="wrapper_left_meun" v-for="(item,index) in chatList" :key="index">
              <div class="wrapper_left_01">
                <div class="wrapper_left_title">{{item.roomName}}</div>
                <div class="wrapper_left_time">{{item.createAt}}</div>
              </div>
              <div class="wrapper_left_02">
                <img src="../assets/images/icon12.png" alt="" class="wrapper_left_img" @click="handleOpen">
                <img src="../assets/images/icon13.png" alt="" class="wrapper_left_img" @click="handleDelete(item)">
              </div>
            </div>
          </div>
        </div>
        <div class="wrapper_right">
          <div class="wrapper_right_header">
            <div class="wrapper_right_01">
              <img src="../assets/images/icon08.png" alt="" class="wrapper_right_img1">
              <label class="wrapper_right_label">新对话</label>
            </div>
            <div class="wrapper_right_02">
              <div class="wrapper_right_icon">
                <img src="../assets/images/icon09.png" alt="" class="wrapper_right_img">
              </div>
              <div class="wrapper_right_icon">
                <img src="../assets/images/icon10.png" alt="" class="wrapper_right_img">
              </div>
              <div class="wrapper_right_icon">
                <img src="../assets/images/icon11.png" alt="" class="wrapper_right_img">
              </div>
            </div>
          </div>
          <!--  发送模块-->
          <div class="chatView">
            <div class="chatView_page">
              <div class="chatView_page_01">
                <div class="chatView_page_meun">
                  <div class="chatView_page_logo"></div>
                  <div class="chatView_page_info">
                    <div class="chatView_page_text">您好，我是AI助手，欢迎您咨询我任何问题！</div>
                    <div class="chatView_page_time">2023-08-1815:32:03</div>
                  </div>
                </div>
                <div class="chatView_page_meun">
                  <div class="chatView_page_logo"></div>
                  <div class="chatView_page_info">
                    <div class="chatView_page_text">您好，我是AI助手，欢迎您咨询我任何问题！</div>
                    <div class="chatView_page_time">2023-08-1815:32:03</div>
                  </div>
                </div>
              </div>
              <div class="chatView_page_02">
                <div class="chatView_page_meun">
                  <div class="chatView_page_info1">
                    <div class="chatView_page_text">您好，我是回复！</div>
                    <div class="chatView_page_time">2023-08-1815:32:03</div>
                  </div>
                  <div class="chatView_page_logo1"></div>
                </div>
                <div class="chatView_page_meun">
                  <div class="chatView_page_info1">
                    <div class="chatView_page_text">您好，我是回复，欢迎您咨询我任何问题！</div>
                    <div class="chatView_page_time">2023-08-1815:32:03</div>
                  </div>
                  <div class="chatView_page_logo1"></div>
                </div>
              </div>
              <div class="chatView_page_01">
                <div class="chatView_page_meun">
                  <div class="chatView_page_logo"></div>
                  <div class="chatView_page_info">
                    <div class="chatView_page_text">您好，我是AI助手，欢迎您咨询我任何问题！</div>
                    <div class="chatView_page_time">2023-08-1815:32:03</div>
                  </div>
                </div>
                <div class="chatView_page_meun">
                  <div class="chatView_page_logo"></div>
                  <div class="chatView_page_info">
                    <div class="chatView_page_text">您好，我是AI助手，欢迎您咨询我任何问题！</div>
                    <div class="chatView_page_time">2023-08-1815:32:03</div>
                  </div>
                </div>
              </div>
              <div class="chatView_page_02">
                <div class="chatView_page_meun">
                  <div class="chatView_page_info1">
                    <div class="chatView_page_text">您好，我是回复！</div>
                    <div class="chatView_page_time">2023-08-1815:32:03</div>
                  </div>
                  <div class="chatView_page_logo1"></div>
                </div>
                <div class="chatView_page_meun">
                  <div class="chatView_page_info1">
                    <div class="chatView_page_text">您好，我是回复，欢迎您咨询我任何问题！</div>
                    <div class="chatView_page_time">2023-08-1815:32:03</div>
                  </div>
                  <div class="chatView_page_logo1"></div>
                </div>
              </div>
            </div>

          </div>
          <div class="chatFooter" ref="chatMain">
            <div class="send">
              <el-input resize="none" type="textarea" placeholder="输入消息内容（shift+enter换行）" autosize v-model="textarea" @keydown.native="Keydown"></el-input>
              <img src="../assets/images/send.png" alt="" class="send_img">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '@/components/header.vue'
import TabsPupup from '@/components/tabs.vue'
import {createChatAPI, deleteChatAPI, getChatListAPI} from "@/api";  //tab展示
export default {
  components: {
    Header,TabsPupup
  },
  name: "chatIndex",
  data() {
    return {
      input2: '',
      textarea: '',
      chatList:[],
    }
  },
  mounted() {
  this.getChatList();
  },
  methods: {
    //弹窗
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    //删除对话
    handleDelete(data) {
      //二次确认
      this.$confirm('此操作将永久删除该对话, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params={
          roomId:data.id
        }
        deleteChatAPI(params).then(res => {
          if (res.code == 200) {
            this.getChatList();
          } else {
            this.$message.error(res.msg);
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //获得对话列表
    getChatList() {
      getChatListAPI().then(res => {
        if (res.code == 200) {
        this.chatList = res.data
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
      } else if (e.keyCode === 13) {
        e.preventDefault()
        this.textarea = ''
      }
    },
    //自适应高度
    changeHeight() {
      this.$refs.chatMain.scrollTop=this.$refs.chatMain.scrollHeight
      // 监听window的resize事件
      window.onresize=()=>{this.$refs.chatMain.scrollTop=this.$refs.chatMain.scrollHeight}
    },
  }
}
</script>
<style scoped lang="less">
.chatHome {
  padding: 24px;
  .centainr{
    //height: calc(100vh - 160px);
    background: linear-gradient(90deg, rgba(255, 244, 242, 1) 0%, rgba(252, 243, 255, 1) 100%);
    margin-top: 20px;
    border-radius: 10px;
    padding: 20px 30px;
  }
  .centainr_view{
    .centainr_title{
      font-size: 14px;
      color: #000;
      font-weight: bold;
      letter-spacing: 2px;
    }
    .centainr_dect{
      font-size: 12px;
      color: #888888;
      letter-spacing: 4px;
      margin-top: 5px;
    }
  }
  .chatWrapper{
    margin-top: 20px;
    display: flex;
    .wrapper_left{
      width: 350px;
      height: calc(100vh - 150px);
      background: #fff;
      padding: 10px 15px;
      .wrapper_left_header{
        display: flex;
        align-items: center;
      }
      .el-icon-plus{
        width: 50px;
        height: 35px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #eeeeee;
        margin-left: 10px;
      }
      .wrapper_left_list{
        margin-top: 30px;
        height: calc(100vh - 220px);
        overflow: hidden;
        overflow-y: auto;
        .wrapper_left_meun{
          display:flex;
          align-items: center;
          justify-content: space-between;
          border: 1px solid #FA6400;
          border-radius: 5px;
          height: 60px;
          padding-left: 15px;
          margin-bottom: 10px;
        }
        .wrapper_left_title{
          font-size: 15px;
          color: #FA6400;
          font-weight: bold;
        }
        .wrapper_left_time{
          font-size: 10px;
          color: #888888;
          margin-top: 6px;
        }
        .wrapper_left_img{
          width: 15px;
          height: 15px;
          margin-right: 12px;
        }
      }

    }
    .wrapper_right{
      width: 100%;
      height: calc(100vh - 150px);
      position: relative;
      .wrapper_right_header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #FFFFFF;
        height: 60px;
        padding: 0 20px;
        .wrapper_right_01{
          display: flex;
          align-items: center;
        }
        .wrapper_right_label{
          font-size: 14px;
          color:#333333;
          margin-left: 10px;
          font-weight: bold;
        }
        .wrapper_right_02{
          display: flex;
          align-items: center;
        }
        .wrapper_right_icon{
          width: 35px;
          height: 35px;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #eeeeee;
          margin-right: 10px;
        }
        .wrapper_right_img{
          width: 12px;
          height: 12px;
        }
        .wrapper_right_img1{
          width: 15px;
          height: 16px;
        }
      }
      .chatView{
        background: #FFFFFF;
        margin: 30px;
        height: calc(100vh - 270px);
        border-right: 5px;
        padding: 24px;
        overflow: hidden;
        overflow-y: auto;
        .chatView_page{
          padding-bottom: 50px;
        }
        .chatView_page_02{
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        .chatView_page_meun{
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }
        .chatView_page_logo{
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #FA6400;
          margin-right: 10px;
        }
        .chatView_page_logo1{
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #FA6400;
          margin-left: 10px;
        }
        .chatView_page_info{
          display: flex;
          flex-direction: column;
          .chatView_page_text{
            font-size: 14px;
            color: #FFFFFF;
            background: rgb(250, 100, 0);
            border-radius: 15px 15px 15px 0px;
            padding: 20px 15px;
          }
          .chatView_page_time{
            font-size: 10px;
            color: #636A77;
            margin-top: 10px;
          }
        }
        .chatView_page_info1{
          display: flex;
          flex-direction: column;
          .chatView_page_text{
            font-size: 14px;
            color: #333333;
            background: #FFFFFF;
            border-radius: 15px 15px 15px 0px;
            padding: 20px 15px;
            border: 1px solid #eeeeee;
          }
          .chatView_page_time{
            font-size: 10px;
            color: #636A77;
            margin-top: 10px;
          }
        }
      }
      .chatFooter{
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
      .send{
        width: 90%;
        display: flex;
        align-items: flex-end;
        .send_img{
          width: 40px;
          height: 40px;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
