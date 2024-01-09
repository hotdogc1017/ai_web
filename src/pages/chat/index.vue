<script lang="ts" setup>
import { ref } from "vue";
// import { messageList as list } from "./faker";
import UserMessage from "../../components/UserMessage.vue";

let messageList = ref([
  {
    isMe: true,
    content:
      "我是一名电子商务专业的本科生，寒假我想出去找一份实习的工作，你能帮我制作一份简历吗",
  },
]);
let test = ref(2);
</script>

<template>
  <ul class="lg:w-3/4 xl:w-3/5 text-white">
    <li>
      <p class="text-white">eeqeqe</p>
    </li>
    <li
      v-for="({ isMe, content }, index) in [
        {
          isMe: true,
          content:
            '我是一名电子商务专业的本科生，寒假我想出去找一份实习的工作，你能帮我制作一份简历吗',
        },
      ]"
      :key="index"
    >
      <UserMessage :content="content" :is-me="isMe"></UserMessage>
    </li>
  </ul>
</template>

<style scoped></style>
