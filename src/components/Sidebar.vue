<template>
  <div class="sidebar">
    <div class="el_meun_list">
      <div
        class="el_meun"
        :class="activeIndex == 0 ? 'el_meun_active' : ''"
        @click="handleTabs(0, '/')"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M29.9336 7.14294H20.5712C10.4285 7.14294 5.35718 12.7034 5.35718 23.8243C5.35718 34.6696 10.1802 40.2267 19.8264 40.4955V43.7169C19.8264 43.9872 19.9473 44.2343 20.1388 44.3552C20.3303 44.4761 20.5594 44.45 20.7307 44.2878L24.7246 40.5057H29.9336C40.0763 40.5057 45.1476 34.9452 45.1476 23.8243C45.1476 12.7034 40.0763 7.14294 29.9336 7.14294ZM17.8051 28.0151C19.8443 28.0151 21.4975 26.2578 21.4975 24.0901C21.4975 21.9224 19.8443 20.1651 17.8051 20.1651C15.7658 20.1651 14.1127 21.9224 14.1127 24.0901C14.1127 26.2578 15.7658 28.0151 17.8051 28.0151ZM36.3922 24.0901C36.3922 26.2578 34.739 28.0151 32.6998 28.0151C30.6605 28.0151 29.0074 26.2578 29.0074 24.0901C29.0074 21.9224 30.6605 20.1651 32.6998 20.1651C34.739 20.1651 36.3922 21.9224 36.3922 24.0901Z"
            fill="white"
          />
          <path
            d="M23.1245 24.0901C23.1245 25.3393 24.0772 26.352 25.2523 26.352C26.4275 26.352 27.3802 25.3393 27.3802 24.0901C27.3802 22.8409 26.4275 21.8282 25.2523 21.8282C24.0772 21.8282 23.1245 22.8409 23.1245 24.0901Z"
            fill="white"
          />
        </svg>
        <span class="el_meun_title">首页</span>
      </div>
      <div
        class="el_meun"
        :class="activeIndex == 1 ? 'el_meun_active' : ''"
        @click="handleTabs(1, '')"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="23.1819"
            y="26.3636"
            width="17.2727"
            height="17.2727"
            rx="6"
            transform="rotate(90 23.1819 26.3636)"
            fill="white"
          />
          <rect
            x="23.1819"
            y="6.36365"
            width="17.2727"
            height="17.2727"
            rx="6"
            transform="rotate(90 23.1819 6.36365)"
            fill="white"
          />
          <rect
            x="44.0911"
            y="26.3636"
            width="17.2727"
            height="17.2727"
            rx="6"
            transform="rotate(90 44.0911 26.3636)"
            fill="white"
          />
          <rect
            opacity="0.6"
            x="35.4546"
            y="4.54541"
            width="14.785"
            height="14.785"
            rx="4"
            transform="rotate(45 35.4546 4.54541)"
            fill="white"
          />
        </svg>
        <span class="el_meun_title">更多</span>
      </div>
      <div
        class="el_meun"
        :class="activeIndex == 2 ? 'el_meun_active' : ''"
        @click="handleTabs(2, '/chat')"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M29.9336 7.14294H20.5712C10.4285 7.14294 5.35718 12.7034 5.35718 23.8243C5.35718 34.6696 10.1802 40.2267 19.8264 40.4955V43.7169C19.8264 43.9872 19.9473 44.2343 20.1388 44.3552C20.3303 44.4761 20.5594 44.45 20.7307 44.2878L24.7246 40.5057H29.9336C40.0763 40.5057 45.1476 34.9452 45.1476 23.8243C45.1476 12.7034 40.0763 7.14294 29.9336 7.14294ZM17.8051 28.0151C19.8443 28.0151 21.4975 26.2578 21.4975 24.0901C21.4975 21.9224 19.8443 20.1651 17.8051 20.1651C15.7658 20.1651 14.1127 21.9224 14.1127 24.0901C14.1127 26.2578 15.7658 28.0151 17.8051 28.0151ZM36.3922 24.0901C36.3922 26.2578 34.739 28.0151 32.6998 28.0151C30.6605 28.0151 29.0074 26.2578 29.0074 24.0901C29.0074 21.9224 30.6605 20.1651 32.6998 20.1651C34.739 20.1651 36.3922 21.9224 36.3922 24.0901Z"
            fill="white"
          />
          <path
            d="M23.1245 24.0901C23.1245 25.3393 24.0772 26.352 25.2523 26.352C26.4275 26.352 27.3802 25.3393 27.3802 24.0901C27.3802 22.8409 26.4275 21.8282 25.2523 21.8282C24.0772 21.8282 23.1245 22.8409 23.1245 24.0901Z"
            fill="white"
          />
        </svg>
        <span class="el_meun_title">AI对话</span>
      </div>
      <div
        class="el_meun"
        :class="activeIndex == 3 ? 'el_meun_active' : ''"
        @click="handleTabs(3, '/gptIndex')"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M29.9336 7.14294H20.5712C10.4285 7.14294 5.35718 12.7034 5.35718 23.8243C5.35718 34.6696 10.1802 40.2267 19.8264 40.4955V43.7169C19.8264 43.9872 19.9473 44.2343 20.1388 44.3552C20.3303 44.4761 20.5594 44.45 20.7307 44.2878L24.7246 40.5057H29.9336C40.0763 40.5057 45.1476 34.9452 45.1476 23.8243C45.1476 12.7034 40.0763 7.14294 29.9336 7.14294ZM17.8051 28.0151C19.8443 28.0151 21.4975 26.2578 21.4975 24.0901C21.4975 21.9224 19.8443 20.1651 17.8051 20.1651C15.7658 20.1651 14.1127 21.9224 14.1127 24.0901C14.1127 26.2578 15.7658 28.0151 17.8051 28.0151ZM36.3922 24.0901C36.3922 26.2578 34.739 28.0151 32.6998 28.0151C30.6605 28.0151 29.0074 26.2578 29.0074 24.0901C29.0074 21.9224 30.6605 20.1651 32.6998 20.1651C34.739 20.1651 36.3922 21.9224 36.3922 24.0901Z"
            fill="white"
          />
          <path
            d="M23.1245 24.0901C23.1245 25.3393 24.0772 26.352 25.2523 26.352C26.4275 26.352 27.3802 25.3393 27.3802 24.0901C27.3802 22.8409 26.4275 21.8282 25.2523 21.8282C24.0772 21.8282 23.1245 22.8409 23.1245 24.0901Z"
            fill="white"
          />
        </svg>
        <span class="el_meun_title">原生TGP4.0</span>
      </div>
    </div>
    <div
      class="meun_submenu"
      :class="level2Hover ? 'submenu_show' : 'submenu_hidden'"
    >
      <div
        class="meun_submenu_list"
        v-for="(item, index) in menuList"
        :key="index"
        @click="handleSelect(item)"
      >
        <img src="../assets/images/icon_home.png" class="meun_img" />
        <span class="meun_title">{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "@/utils/bus";
import request from "@/utils/request";
import { getModuleListAPI } from "@/api";

export default {
  data() {
    return {
      level2Hover: false,
      collapse: false,
      activeMenu: this.$route.path,
      menuList: [],
      activeIndex: 0,
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/home", "");
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      getModuleListAPI().then((res) => {
        if (res.code == 200) {
          this.menuList = res.data;
        }
      });
    },
    // 一级菜单点击
    handleTabs(index, webUrl) {
      this.activeIndex = index;
      if (index == 1) {
        this.level2Hover = !this.level2Hover;
      } else {
        this.level2Hover = false;
      }
      if (webUrl !== "") {
        this.$router.push({
          path: webUrl,
        });
      }
    },
    // 跳转路由
    handleSelect(item) {
      let activeId = "";
      if (item) {
        activeId = item.id;
        sessionStorage.setItem("menuTitle", item.title);
        sessionStorage.setItem("menuIcon", item.icon);
      }
      sessionStorage.setItem("activeId", activeId);
      this.$router.push({
        path: item.webUrl,
      });
      this.level2Hover = false;
    },
  },
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 55px;
  bottom: 0;
  background: #262626;
}

.sidebar::-webkit-scrollbar {
  width: 0;
}

.el_meun_list {
  width: 115px;

  .el_meun {
    cursor: pointer;
    font-family: Alibaba PuHuiTi;
    font-size: 20px;
    letter-spacing: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    border-radius: 5px;
    margin: 10px 15px;
    padding: 10px 8px;
  }

  .el_meun_title {
    font-size: 13px;
    font-family: Medium;
    color: #ffffff;
    margin-top: 5px;
  }

  .el_meun:hover {
    background-color: #333333;
  }

  .el_meun_active {
    background-color: #333333;
  }
}

.meun_submenu {
  position: absolute;
  top: 0;
  left: 115px;
  overflow: hidden;
  height: calc(100vh - 10px);
  background: #000;
  z-index: 9999;

  .meun_submenu_list {
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    .meun_img {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }

    .meun_title {
      font-size: 12px;
      font-family: Medium;
      color: #ffffff;
    }
  }

  .meun_submenu_list:hover {
    cursor: pointer;
    background: rgba(255, 255, 255, 0.06);
  }
}

.submenu_hidden {
  width: 0;
}

.submenu_show {
  width: 200px;
}
</style>
