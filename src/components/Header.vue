<template>
  <div class="header" :class="{'header-collapse':collapse}">
    <!-- 折叠按钮 -->
    <div class="collapse-btn"  @click="collapseChage">
      <i v-if="!collapse" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 全屏显示 -->
        <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
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
            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
import bus from '@/utils/bus'

export default {
  data() {
    return {
      collapse: false,
      fullscreen: false,
      name: 'admin',
    };
  },
  computed: {
    username() {
      let username = sessionStorage.getItem('ms_username');
      return username ? username : this.name;
    }
  },
  mounted() {
    if (document.body.clientWidth < 1500) {
      this.collapseChage();
    }
  },
  methods: {
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
          this.$router.push('/login');
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
  margin-left: 200px;
}

.collapse-btn {
  float: left;
  padding: 0 10px;
  cursor: pointer;
  line-height: 55px;
}
.header-collapse{
  margin-left: 70px;
}
.header-right {
  float: right;
  padding-right: 50px;
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
</style>
