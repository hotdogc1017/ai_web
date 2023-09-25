<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="activeMenu" :collapse="collapse" unique-opened router @select="handleSelect">
      <template v-for="item in menuList">
        <template v-if="item.children">
          <el-submenu :index="item.webUrl" :key="item.webUrl">
            <template slot="title">
              <img :src="item.icon" class="meun_img" />
              <span slot="title" class="meun_title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.children">
              <el-submenu v-if="subItem.children" :index="subItem.webUrl" :key="subItem.webUrl">
                <template slot="title">
                  <img :src="subItem.icon" class="meun_img"></img>
                  <span class="meun_title">{{ subItem.title }}</span>
                </template>
                <el-menu-item v-for="(threeItem,i) in subItem.children" :key="i" :index="threeItem.webUrl">{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.webUrl" :key="subItem.webUrl">
                <img :src="subItem.icon" class="meun_img"></img>
                <span class="meun_title">{{ subItem.title }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.webUrl" :key="item.webUrl">
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
      activeMenu: this.$route.path,
      menuList: [
        {
          icon: require('../assets/images/home.png'),
          webUrl: '/',
          title: '首页'
        },
        {
          icon: require('../assets/images/meunImg01.png'),
          webUrl: '/chatIndex',
          title: 'AI对话'
        },
        {
          icon: require('../assets/images/meunImg02.png'),
          webUrl: '/gptIndex',
          title: '原生GPT4.0'
        },
        {
          icon: require('../assets/images/meunImg03.png'),
          webUrl: '/paintIndex',
          title: '智能做图'
        },
        {
          icon: require('../assets/images/meunImg04.png'),
          webUrl: '/xhsIndex',
          title: '小红书文案'
        },
        {
          icon: require('../assets/images/meunImg05.png'),
          webUrl: '/dyIndex',
          title: '抖音文案'
        },
        {
          icon: require('../assets/images/meunImg06.png'),
          webUrl: '/waIndex',
          title: '独立文案站'
        },
        {
          icon: require('../assets/images/meunImg07.png'),
          webUrl: '/sjIndex',
          title: '社交文案'
        },
        {
          icon: require('../assets/images/meunImg08.png'),
          webUrl: '/kjdsIndex',
          title: '跨境电商文案'
        },
        {
          icon: require('../assets/images/meunImg09.png'),
          webUrl: '/bgIndex',
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
  mounted() {},
  methods: {
    handleSelect(key) {
      console.log(key);
    },
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 55px;
  bottom: 0;
  background: #FFFFFF;
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
