<template>
  <div class="sidebar">
    <div class="sidebar_view">
      <img src="../assets/logo.png" alt="" class="sidebar_logo">
      <img src="../assets/images/Paperpig.png" alt="" class="sidebar_title" v-if="!collapse">
    </div>
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" unique-opened router>
      <template v-for="item in menuList">
        <template v-if="item.children">
          <el-submenu :index="item.path" :key="item.path">
            <template slot="title">
              <img :src="item.icon" class="meun_img" />
              <span slot="title" class="meun_title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.children">
              <el-submenu v-if="subItem.children" :index="subItem.path" :key="subItem.path">
                <template slot="title">
                  <img :src="subItem.icon" class="meun_img"></img>
                  <span class="meun_title">{{ subItem.title }}</span>
                </template>
                <el-menu-item v-for="(threeItem,i) in subItem.children" :key="i" :index="threeItem.path">{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.path" :key="subItem.path">
                <img :src="subItem.icon" class="meun_img"></img>
                <span class="meun_title">{{ subItem.title }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.path" :key="item.path">
            <img :src="item.icon" class="meun_img"></img>
            <span slot="title" class="meun_title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from '@/utils/bus';
import request from "@/utils/request";

export default {
  data() {
    return {
      collapse: false,
      menuList: [
        {
          icon: require('../assets/images/meunImg01.png'),
          webUrl: 'companyList',
          title: 'AI对话'
        },
        {
          icon: require('../assets/images/meunImg02.png'),
          webUrl: 'fileType',
          title: '原生GPT4.0'
        },
        {
          icon: require('../assets/images/meunImg03.png'),
          webUrl: 'fileList',
          title: '智能做图'
        },
        {
          icon: require('../assets/images/meunImg04.png'),
          webUrl: 'memberList',
          title: '小红书文案'
        },
        {
          icon: require('../assets/images/meunImg05.png'),
          webUrl: 'memberList',
          title: '抖音文案'
        },
        {
          icon: require('../assets/images/meunImg06.png'),
          webUrl: 'memberList',
          title: '独立文案站'
        },
        {
          icon: require('../assets/images/meunImg07.png'),
          webUrl: 'memberList',
          title: '社交文案'
        },
        {
          icon: require('../assets/images/meunImg08.png'),
          webUrl: 'memberList',
          title: '跨境电商文案'
        },
        {
          icon: require('../assets/images/meunImg09.png'),
          webUrl: 'memberList',
          title: '办公写作'
        }
      ],
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace('/', '');
    }
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on('collapse', msg => {
      this.collapse = msg;
      bus.$emit('collapse-content', msg);
    });
  },
  mounted() {
  },
  methods: {}
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: #FFFFFF;
}

.sidebar_view {
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 60px;
}

.sidebar_logo {
  width: 30px;
  height: 30px;
}

.sidebar_title {
  width: 80px;
  margin-left: 10px;
}

.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar .el-menu {
  border: none !important;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 200px;
}

.sidebar > ul {
  height: 100%;
}
.meun_img{
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
.muun_title{
  font-size: 14px;
  color: #333333;
}
</style>
