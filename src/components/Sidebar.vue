<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="activeMenu" :collapse="collapse" unique-opened router @select="handleSelect">
      <template v-for="item in menuList">
        <template v-if="item.children">
          <el-submenu :index="item.webUrl" :key="item.webUrl">
            <template slot="title">
              <img :src="item.icon" class="meun_img" />
              <span slot="title" class="meun_title">{{ item.title }}
              </span>

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
            <span slot="title" class="meun_title">{{ item.title }}
             <img v-if="item.title=='原生GPT4.0'" :src="require('@/assets/images/meunImg02_hot.png')" class="arrow" />
            </span>

          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from '@/utils/bus';
import request from "@/utils/request";
import {getModuleListAPI} from "@/api";

export default {
  data() {
    return {
      collapse: false,
      activeMenu: this.$route.path,
      menuList: [ ],
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace('/home', '');
    }
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on('collapse', msg => {
      this.collapse = msg;
      bus.$emit('collapse-content', msg);
    });

    //查询菜单列表
    getModuleListAPI().then(res => {
      if (res.code == 200) {
        this.menuList = res.data;
      }
    });
  },
  mounted() {},

  methods: {
    handleSelect(key) {
      let activeId='';
      //判断id是多少
      for (let i = 0; i < this.menuList.length; i++) {
        if (this.menuList[i].webUrl == key) {
          activeId = this.menuList[i].id;
          sessionStorage.setItem('menuTitle', this.menuList[i].title);
          sessionStorage.setItem('menuIcon', this.menuList[i].icon);
        }
      }
    sessionStorage.setItem('activeId', activeId);
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
.arrow{
  width: 20px;
  position: relative;
  top: -2px;
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
/deep/.el-menu-item.is-active {
  background: rgb(255, 247, 247);
  border-right: 3px solid #F04848;
  color: #333333 !important;
}
</style>
