<script lang="ts" setup>
import {} from "vue";
import ChatGPTLightIcon from "@/components/ChatGPTLightIcon.vue";
// import logo from "@/assets/logo.png";
// import ChatGPT from "@/assets/svg/ChatGPT.svg";

const prop = defineProps<{ content: string; isMe: boolean }>();
</script>

<template>
  <div class="w-full flex gap-3 text-base">
    <div class="flex justify-end">
      <template v-if="prop.isMe">
        <el-avatar
          class="w-6 h-6"
          size="small"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        ></el-avatar>
      </template>
      <template v-else>
        <ChatGPTLightIcon></ChatGPTLightIcon>
        <!-- <el-image class="w-6 h-6" :src="logo"></el-image> -->
      </template>
    </div>
    <div>
      <span class="font-[bold]">{{ prop.isMe ? "你" : "ChatGPT" }}</span>
      <p class="py-1">
        {{ prop.content }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
