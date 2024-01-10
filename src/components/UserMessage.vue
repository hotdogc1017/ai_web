<script lang="ts" setup>
import {} from "vue";
import logo from "@/assets/logo.png";

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
        <el-image class="w-6 h-6" :src="logo"></el-image>
      </template>
    </div>
    <div>
      <strong>{{ prop.isMe ? "我" : "Peperpig" }}</strong>
      <p class="py-1">
        {{ prop.content }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
