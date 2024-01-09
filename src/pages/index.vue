<template>
  <div class="home">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div class="content-box" :class="{ 'content-collapse': collapse }">
      <div class="content">
        <router-view></router-view>
        <!-- <transition name="move" mode="out-in">
          <router-view></router-view>
        </transition> -->
      </div>
    </div>
  </div>
</template>

<script>
import vHead from "@/components/Header.vue";
import vSidebar from "@/components/Sidebar.vue";
import vHome from "@/pages/home.vue";
import bus from "@/utils/bus";
export default {
  components: {
    vHead,
    vSidebar,
    vHome,
  },
  name: "home",
  data() {
    return {
      collapse: false,
    };
  },
  created() {
    bus.$on("collapse-content", (msg) => {
      this.collapse = msg;
    });
  },
  mounted() {},
  methods: {},
};
</script>
<style scoped lang="less">
.home {
}
</style>
