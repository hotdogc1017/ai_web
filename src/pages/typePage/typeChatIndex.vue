<!--对话/聊天-->
<template>
  <div class="chatHome">
    <div class="chatcentainr">
      <div
        class="chatSidebar"
        :class="{ chat_sidebar: this.collapseStore.collapse }"
      >
        <div class="wrapper_list">
          <div
            :class="
              item.id == activeRoomId ? 'wrapper_meun_active' : 'wrapper_meun'
            "
            v-for="(item, index) in chatList"
            :key="index"
            @click="selectRoom(item.id)"
          >
            <img :src="item.icon" alt="" class="wrapper_img" />
            <div class="wrapper_name">{{ item.name }}</div>
          </div>
        </div>
      </div>
      <div class="chatWrapper">
        <div class="chatWrapper_header">
          <label class="chatTitle">{{ title }}</label>
        </div>
        <div class="wrapper_right">
          <div
            v-loading="loading"
            element-loading-text="记录加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="#ffffff"
            element-loading-body="rgb(250, 100, 0)"
          >
            <div ref="chatMain" class="chatView">
              <div class="chatView_list">
                <div
                  class="chatView_page"
                  v-for="(item, index) in chatRecordList"
                  :key="index"
                >
                  <div
                    v-if="
                      item.role === 'ai' &&
                      item.status == 0 &&
                      item.context != '您好，请问有什么可以帮助您的吗？'
                    "
                    class="chatView_page_01"
                  >
                    <div class="chatView_page_meun">
                      <div class="chatView_page_logo">
                        <img src="../../assets/images/AIkf.png" alt="" />
                      </div>
                      <div class="chatView_page_info">
                        <div class="chatView_page_text" id="chatContext">
                          {{ item.context }}
                        </div>
                        <div class="chatView_page_time">{{ item.time }}</div>
                      </div>
                    </div>
                  </div>
                  <div
                    v-if="item.role === 'ai' && item.status == 1"
                    class="chatView_page_01"
                  >
                    <div class="chatView_page_meun">
                      <div class="chatView_page_logo">
                        <img src="../../assets/images/AIkf.png" alt="" />
                      </div>
                      <div class="chatView_page_info">
                        <div class="chatView_page_text" id="chatContext">
                          {{ displayedText }}
                        </div>
                        <div class="chatView_page_time">{{ item.time }}</div>
                      </div>
                    </div>
                  </div>
                  <div
                    v-else-if="item.role === 'user'"
                    class="chatView_page_02"
                  >
                    <div class="chatView_page_meun">
                      <div class="chatView_page_info1">
                        <div class="chatView_page_user">
                          <div class="chatView_page_text">
                            {{ item.context }}
                          </div>
                        </div>
                        <div class="chatView_page_time">{{ item.time }}</div>
                      </div>
                      <div class="chatView_page_logo1">
                        <img src="../../assets/images/user_logo.png" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="chatFooter">
              <div class="send">
                <div style="width: 100%; margin-left: 15px">
                  <base-from
                    ref="basefrom"
                    :searchForm="searchForm"
                    :searchValue="searchValue"
                    :get-data="getData"
                  />
                </div>
                <div class="send_line"></div>
                <div class="send_view" @click="sendMsg()">
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
    </div>
    <!-- 登录-->
    <Login @close="handleClose()" v-if="isLogin"></Login>
  </div>
</template>
<script>
import {
  ask2QuestionAPI,
  askQuestionAPI,
  createChatAPI,
  deleteChatAPI,
  editChatNameAPI,
  getChatListAPI,
  getChatRecord2API,
  getChatRecordAPI,
  getModuleConfigAPI,
  getModuleConfigDetailAPI,
} from "@/api";
import vHead from "@/components/Header.vue";
import Login from "@/pages/login.vue";
import bus from "@/utils/bus";
import baseFrom from "@/components/baseFrom/baseFrom.vue";
import { mapStores } from "pinia";
import useCollapse from "@/stores/collapse.ts";
export default {
  components: { Login, vHead, baseFrom },
  name: "chatIndex",
  data() {
    return {
      searchForm: [],
      searchValue: {
        id: this.$route.query.id,
      },
      formData: {
        mobile: "",
      },
      moduleConfig: {
        icon: "",
        title: "",
      },
      icon: "",
      title: "",
      menuIcon: "",
      isLogin: false,
      loading: false,
      activeRoomId: "",
      tabsActive: 0,
      tabs: ["GPTAI3.5", "GPTAI4.0"],
      form: {
        id: "",
        roomName: "",
      },
      chatList: [],
      chatRecordList: [],
      dialogVisible: false,
      displayedText: "",
      text: "",
    };
  },
  computed: {
    ...mapStores(useCollapse),
  },
  created() {
    this.title = sessionStorage.getItem("menuTitle");
    this.menuIcon = sessionStorage.getItem("menuIcon");
    this.activeRoomId = this.$route.query.id;
  },
  mounted() {
    this.getChatList();
    this.getModuleList();
    this.getModuleConfig();
    this.getChatRecord();
  },
  watch: {
    //监听路由变化
    $route(to, from) {
      this.title = sessionStorage.getItem("menuTitle");
    },
    text: function (val) {
      this.typeWriter();
    },
  },
  methods: {
    // 切换
    getModuleConfig() {
      const params = {
        id: this.activeRoomId,
      };
      getModuleConfigDetailAPI(params).then((res) => {
        if (res.code == 200) {
          this.moduleConfig = res.data;
          this.icon = this.moduleConfig.icon;
          this.searchForm = this.moduleConfig.searchForm;
        }
      });
    },
    getModuleList() {
      const params = {
        moduleId: sessionStorage.getItem("activeId"),
      };
      getModuleConfigAPI(params).then((res) => {
        if (res.code == 200) {
          this.cardList = res.data;
          // this.data = res.data[0]
        }
      });
    },
    handlTabs(data) {
      this.tabsActive = data;
    },
    goBack() {
      this.$router.push("/");
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
          this.chatRecordList[this.chatRecordList.length - 1].status = 0;
        }
      }, speed);
    },

    getChatRecord() {
      const params = {
        moduleId: sessionStorage.getItem("activeId"),
      };
      getChatRecord2API(params).then((res) => {
        if (res.code == 200) {
          this.chatRecordList = res.data;
          this.changeHeight();
        } else {
          this.$message.error(res.msg);
        }
      });
    },

    selectRoom(data) {
      this.activeRoomId = data;
      this.getModuleConfig(data);
    },
    getData(data) {
      // 校验是否登录
      const tokenStr = window.sessionStorage.getItem("token");
      if (tokenStr == null || tokenStr == "") return (this.isLogin = true);
      // 登录后调用接口
      const params = {
        configId: this.$route.query.id,
        configMap: this.searchValue,
      };
      const resData = {
        role: "user",
        context: data,
        time: new Date().toLocaleString(),
      };
      this.chatRecordList.push(resData);
      const resData2 = {
        role: "ai",
        context: "思考中.。。。",
        status: 0,
        time: "",
      };
      this.chatRecordList.push(resData2);
      ask2QuestionAPI(params).then((res) => {
        if (res.code == 200) {
          //删除最后一条
          this.chatRecordList.splice(this.chatRecordList.length - 1, 1);
          this.text = res.data.answer;
          const resData = {
            role: "ai",
            context: res.data.answer,
            status: 1,
            time: new Date().toLocaleString(),
          };
          this.chatRecordList.push(resData);
        } else {
          this.$message.error(res.msg);
        }
      });
      this.searchValue = {
        id: this.$route.query.id,
      };
    },
    //获得对话列表
    getChatList(data) {
      const params = {
        roomName: data,
        moduleId: sessionStorage.getItem("activeId"),
      };
      getModuleConfigAPI(params).then((res) => {
        if (res.code == 200) {
          this.chatList = res.data;
          //默认选中第一个
          if (this.chatList.length > 0) {
            for (let i = 0; i < this.chatList.length; i++) {
              if (this.$route.query.id == this.chatList[i].id) {
                this.activeRoomId = this.$route.query.id;
              }
            }
          }
        } else if (res.code == 203) {
          // this.$message.error('登录失效，请重新登录');
          this.isLogin = true;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //自适应高度，滚动到最底部
    changeHeight() {
      this.$nextTick(() => {
        let chatboxContainer = this.$refs.chatMain; // 获取对
        var container = this.$el.querySelector(".chatView");
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    },
    handleClose() {
      this.isLogin = false;
    },
    handleBack() {
      //返回上一页
      this.$router.go(-1);
    },
    sendMsg() {
      this.$refs.basefrom.customGetData();
    },
  },
};
</script>
<style scoped lang="less">
.chatHome {
  height: 100%;

  .chat_sidebar {
    animation: fadeOutLeft; /* referring directly to the animation's @keyframe declaration */
    animation-duration: 0.8s;
    display: none;
  }

  .chatcentainr {
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

  .wrapper_title {
    font-size: 14px;
    color: #ffffff;
    font-weight: bold;
    margin-top: 30px;
    margin-left: 15px;
    letter-spacing: 3px;
  }
  .wrapper_list {
    margin-top: 20px;
    height: calc(100vh - 100px);
    overflow: hidden;
    overflow-y: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    .wrapper_meun {
      display: flex;
      align-items: center;
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
    }
  }

  .chatWrapper {
    width: 100%;
    .chatWrapper_header {
      display: flex;
      align-items: center;
      margin: 0 24px 20px 24px;
      .chatImg {
        width: 30px;
        height: 30px;
      }
      .chatTitle {
        font-weight: bold;
        font-size: 14px;
        color: #ffffff;
      }
    }

    .wrapper_right {
      height: calc(100vh - 100px);
      position: relative;
      margin: 15px 24px;
      border-radius: 10px;
      .chatView {
        height: calc(100vh - 240px);
        border-right: 5px;
        //padding: 20px;
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
          //align-items: center;
          margin-bottom: 10px;
        }
        .chatView_page_user {
          display: flex;
          justify-content: flex-end;
        }

        .chatView_page_logo {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 10px;
          //background:#F9F9F9;
          //不被压缩
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 30px;
            height: 30px;
          }
        }

        .chatView_page_logo1 {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-left: 10px;
          img {
            width: 30px;
            height: 30px;
          }
        }

        .chatView_page_info {
          display: flex;
          flex-direction: column;
          max-width: 50%;
          .chatView_page_text {
            font-size: 14px;
            color: #ffffff;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 10px 10px 10px 0px;
            padding: 15px 15px;
            line-height: 25px;
          }

          .chatView_page_time {
            font-size: 10px;
            color: #ffffff;
            margin-top: 10px;
          }
        }

        .chatView_page_info1 {
          display: flex;
          flex-direction: column;

          .chatView_page_text {
            font-size: 14px;
            color: #ffffff;
            border-radius: 10px 10px 0 10px;
            padding: 15px;
            background: rgba(228, 98, 98, 0.3);
            width: 50%;
          }

          .chatView_page_time {
            font-size: 10px;
            color: #ffffff;
            margin-top: 10px;
            text-align: right;
          }
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
        .send {
          width: 100%;
          height: 60px;
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
            cursor: pointer;
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
  }
}
</style>
