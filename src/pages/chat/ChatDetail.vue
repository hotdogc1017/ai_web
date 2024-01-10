<script lang="ts" setup>
import { ref } from "vue";
// import { messageList as list } from "./faker";
import UserMessage from "../../components/UserMessage.vue";
import ChatInput from "./ChatInput.vue";

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
  <div class="w-full h-dvh p-4 bg-white flex justify-center">
    <div
      class="h-full flex flex-col justify-center items-center text-[#374151] lg:w-2/3 xl:w-2/3 scroll-auto"
    >
      <ul class="h-full">
        <li
          class="py-4"
          v-for="({ isMe, content }, index) in messageList"
          :key="index"
        >
          <UserMessage :content="content" :is-me="isMe"></UserMessage>
        </li>
      </ul>
      <ChatInput></ChatInput>
    </div>
  </div>
</template>

<style scoped></style>
