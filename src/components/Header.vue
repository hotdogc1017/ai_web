<template>
  <div class="header" :class="{'header-collapse':collapse}">
    <div class="sidebar_view" :class="{'sidebar-collapse':collapse}">
      <img src="../assets/logo.png" alt="" class="sidebar_logo"  @click="handleHome()">
      <img src="../assets/images/Paperpig.png" alt="" class="sidebar_title" v-if="!collapse" @click="handleHome()">
    </div>
    <!-- 折叠按钮 -->
    <div class="collapse-btn" >
      <i v-if="!collapse" class="el-icon-s-fold" @click="collapseChage"></i>
      <i v-else class="el-icon-s-unfold" @click="collapseChage"></i>
      <img src="../assets/images/home.png" alt="" class="home_img" @click="handleHome()">
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 全屏显示 -->
        <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
        <div class="userInfo" v-if="tokenStr">
          <!-- 用户头像 -->
          <div class="user-avator">
            <img src="../assets/images/home_user.png"/>
          </div>
          <!-- 用户名下拉菜单 -->
          <el-dropdown class="user-name" trigger="click" @command="handleCommand">
              <span class="el-dropdown-link">
                  {{ username }}
                  <i class="el-icon-caret-bottom"></i>
              </span>
            <el-dropdown-menu slot="dropdown">
              <!--<el-dropdown-item divided command="user">个人中心</el-dropdown-item>-->
              <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div v-else class="login_btn" @click="handleLogin()">登录注册</div>
      </div>
    </div>
    <!-- 登录-->
    <Login @close="handleClose()" v-if="isLogin"></Login>
  </div>
</template>
<script>
import bus from '@/utils/bus'
import Login from "@/pages/login.vue";
export default {
  components: {
    Login
  },
  data() {
    return {
      tokenStr:'',
      collapse: false,
      fullscreen: false,
      name: 'admin',
      isLogin: false,
    };
  },
  computed: {
    username() {
      let username = sessionStorage.getItem('ms_username');
      return username ? username : this.name;
    }
  },
  mounted() {
    this.tokenStr = window.sessionStorage.getItem('token')
    if (document.body.clientWidth < 1500) {
      this.collapseChage();
    }
  },
  //监听路由变化
  watch: {
    $route(to, from) {
      this.tokenStr = window.sessionStorage.getItem('token')
      if (!this.tokenStr) {
        //取消页面跳转
        this.isLogin = true
      }
    },
  },
  methods: {
    // 跳转首页
    handleHome() {
      if(this.$route.path == '/') return;
      this.$router.push('/');
    },
    handleLogin() {
      this.isLogin = true
    },
    handleClose() {
      this.isLogin = false
    },
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      if (command == 'loginout') {
        this.$confirm('是否退出当前账号?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var that = this;
          sessionStorage.removeItem('ms_username');
          sessionStorage.removeItem("token")
          this.$router.push('/');
          //刷新页面
          window.location.reload();
        })
            .catch(() => {
            });

      } else if (command == 'forget') {
        this.forgetPasswordVisible = true
      }
    },
    // 侧边栏折叠
    collapseChage() {
      this.collapse = !this.collapse;
      bus.$emit('collapse', this.collapse);
    },
    // 全屏事件
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
  },
};
</script>
<style scoped >
.header {
  position: relative;
  box-sizing: border-box;
  height: 55px;
  font-size: 22px;
  color: #333;
  background: #FFFFFF;
}
.sidebar_view {
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 55px;
  float: left;
  width: 170px;
}
.userInfo{
  display: flex;
  align-items: center;
}
.sidebar-collapse{
  width: 20px;
}
.sidebar_logo {
  width: 30px;
  height: 30px;
}
.home_img{
  width: 20px;
  height: 20px;
  margin-left: 10px;
}
.sidebar_title {
  width: 80px;
  margin-left: 10px;
}
.collapse-btn {
  float: left;
  padding: 0 10px 0 0;
  cursor: pointer;
  line-height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 55px;
}
.header-collapse{
  margin-left: 0;
  transition: 3s;
}
.header-right {
  float: right;
  padding-right: 30px;
}

.header-user-con {
  display: flex;
  height: 55px;
  align-items: center;
}

.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}

.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}

.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}

.btn-bell .el-icon-bell {
  color: #fff;
}

.user-name {
  margin-left: 10px;
}

.user-avator {
  margin-left: 20px;
}

.user-avator img {
  display: block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.el-dropdown-link {
  color: #555555;
  cursor: pointer;
  margin-left: 10px;
}

.el-dropdown-menu__item {
  text-align: center;
}
.login_btn{
  width: 80px;
  height: 30px;
  border-radius: 100px;
  background: linear-gradient(135deg,rgb(244, 124, 124),rgb(240, 72, 72));
  font-size: 13px;
  color: #FFFFFF;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1px;
}
</style>
