<script lang="ts" setup>
import { ref, computed } from "vue";
// import { messageList as list } from "./faker";
import UserMessage from "../../components/UserMessage.vue";
import ChatInput from "./ChatInput.vue";
import ChatGPTBigIcon from "@/components/ChatGPTBigIcon.vue";

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
  {
    isMe: true,
    content: "在vue3中使用event bus",
  },
  {
    isMe: false,
    content:
      "在Vue 3 中，使用事件总线（Event Bus）的方式与在 Vue 2 中略有不同。Vue 3 推荐使用 createApp API，而不再使用全局的 Vue 对象。以下是在 Vue 3 中使用事件总线的一般步骤：",
  },
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

const isEmpty = computed(() => !!messageList.value?.length);
</script>

<template>
  <div class="w-full h-dvh p-4 bg-white flex justify-center">
    <div
      class="h-full flex flex-col justify-center items-center text-[#374151] lg:w-2/3 xl:w-3/5"
    >
      <div class="h-4/5">
        <template v-if="isEmpty">
          <div class="h-full flex flex-col justify-center items-center">
            <ChatGPTBigIcon></ChatGPTBigIcon>
            <div class="mb-5 text-2xl font-bold text-black">
              今天我能为您提供什么帮助？
            </div>
          </div>
        </template>
        <template v-else>
          <div class="h-full w-full px-5">
            <ul class="scroll-auto">
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
      </div>
      <div class="h-1/5 w-full">
        <ChatInput></ChatInput>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
