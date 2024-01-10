<script lang="ts" setup>
import { ref } from "vue";
import logo from "@/assets/logo.png";

const chatList = ref(
  Array.from({ length: 50 }).fill({
    title: "Vue3中事件总线的使用",
  }),
);
</script>

<template>
  <div class="h-svh lg:w-1/3 xl:w-1/5 bg-black p-2 text-white">
    <!-- 新建对话 -->
    <div
      class="flex justify-between p-2 hover:bg-[#181818] rounded-lg cursor-pointer"
    >
      <div class="flex items-center">
        <el-image class="w-6 h-6" :src="logo"></el-image>
        <span class="ml-4">新建对话</span>
      </div>
      <Edit class="w-6 h-6" />
    </div>
    <!-- 对话列表 -->
    <ul class="h-full overflow-scroll mt-2">
      <li
        class="p-2 hover:bg-[#181818] rounded-lg cursor-pointer"
        v-for="({ title }, index) in chatList"
      >
        <span>{{ index + 1 }}. </span>
        <span> {{ title }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
