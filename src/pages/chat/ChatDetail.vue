<script lang="ts" setup>
import { ref } from "vue";
// import { messageList as list } from "./faker";
import UserMessage from "../../components/UserMessage.vue";

let messageList = ref([
  {
    isMe: true,
    content: "在vue3中使用event bus",
  },
  {
    isMe: false,
    content:
      "在Vue 3 中，使用事件总线（Event Bus）的方式与在 Vue 2 中略有不同。Vue 3 推荐使用 createApp API，而不再使用全局的 Vue 对象。以下是在 Vue 3 中使用事件总线的一般步骤：",
  },
]);
</script>

<template>
  <div class="w-full flex justify-center">
    <ul class="text-white">
      <li
        class="py-4"
        v-for="({ isMe, content }, index) in messageList"
        :key="index"
      >
        <UserMessage :content="content" :is-me="isMe"></UserMessage>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
