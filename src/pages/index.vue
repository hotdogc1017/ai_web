<script lang="ts" setup>
import {} from "vue";
import Header from "./Header.vue";
import vSidebar from "@/components/Sidebar.vue";
import vHome from "@/pages/home.vue";
import bus from "@/utils/bus";
</script>

<template>
  <div class="home">
    <Header class="h-[50px] w-full"></Header>
    <div class="flex flex-row">
      <v-sidebar></v-sidebar>
      <div class="h-[calc(100vh-50px)] w-full">
        <router-view></router-view>
        <!-- <transition name="move" mode="out-in">
          <router-view></router-view>
        </transition> -->
      </div>
    </div>
  </div>
</template>

<style scoped></style>
