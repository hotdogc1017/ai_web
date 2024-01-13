<script lang="ts" setup>
import {
  ref,
  computed,
  watchEffect,
  nextTick,
  watch,
  onBeforeMount,
} from "vue";
import UserMessage from "../../components/UserMessage.vue";
import ChatInput from "./ChatInput.vue";
import ChatGPTBigIcon from "@/components/ChatGPTBigIcon.vue";
import {
  type Message,
  type Room,
  createRoom,
  getMessageListByRoomId,
} from "./types.ts";
import useConnectRoom from "@/stores/connectRoom";
import useLoginInfo from "@/stores/loginInfo";
import { storeToRefs } from "pinia";
import { ElMessage } from "element-plus";

const { currentRoom } = storeToRefs(useConnectRoom());
const messageList = ref<Message[]>([]);
const isEmpty = computed(
  () => !messageList.value || messageList.value?.length === 0,
);
const scrollRef = ref<HTMLElement | null>();
const messageRefs = ref<InstanceType<typeof UserMessage>[]>();
const websocket = ref<WebSocket | null>();
const websocketOpened = ref(false);

watch(currentRoom, (newVal) => {
  if (newVal?.id) {
    getMessageListByRoomId(newVal.id).then((data = []) => {
      messageList.value = data;
    });
  }
});

watch(websocket, () => {
  if (websocket.value) {
    websocket.value.addEventListener("message", (event) => {
      messageList.value.push({
        answer: "",
        createAt: "",
        flag: 1,
        id: -1,
        roomId: currentRoom.value?.mid ?? "",
      });
      const char = event.data;
      nextTick(() => {
        if (messageRefs.value) {
          const [lastMessage, ..._] = messageRefs.value.toReversed();
          lastMessage.appendAskContent(char);
          scrollRef.value?.scrollIntoView(false);
        }
      });
    });
  }
});

function initWebsocket() {
  if (!websocket.value) {
    websocket.value = new WebSocket(
      `wss://api.123chat.chat/webSocket/${useLoginInfo().loginInfo?.uid}`,
    );
    websocket.value.onopen = () => {
      console.log("websocket已准备就绪");
      websocketOpened.value = true;
    };
  }
}

function handleSearch(searchKey: string) {
  if (!websocket.value) {
    return;
  } else if (websocket.value.readyState !== 1) {
    ElMessage.error("出错了, 与服务器断开对话连接");
    throw new Error(
      `websocket异常, readyStatue为: ${websocket.value.readyState}`,
    );
  }
  websocket.value.send(searchKey);
  messageList.value.push({
    answer: searchKey,
    createAt: "",
    flag: 0,
    id: -1,
    roomId: currentRoom.value?.mid ?? "",
  });
}

onBeforeMount(() => initWebsocket());
</script>

<template>
  <div class="w-full h-full bg-white flex flex-col">
    <el-scrollbar
      ref="scrollRef"
      view-class="mx-4 sm:mx-0 flex justify-center h-full"
      class="flex-1 w-full overflow-hidden text-[#374151]"
    >
      <div class="flex w-full lg:w-4/5">
        <div class="overflow-auto w-full px-12">
          <template v-if="isEmpty">
            <div
              class="h-full w-full flex flex-col justify-center items-center"
            >
              <ChatGPTBigIcon></ChatGPTBigIcon>
              <div class="mb-5 text-2xl font-bold text-black">
                今天我能为您提供什么帮助？
              </div>
            </div>
          </template>
          <template v-else>
            <UserMessage
              ref="messageRefs"
              class="py-4"
              v-for="({ flag, answer }, index) in messageList"
              :key="index"
              :content="answer"
              :is-me="flag !== 1"
            ></UserMessage>
          </template>
        </div>
      </div>
    </el-scrollbar>
    <div class="w-full flex justify-center bg-gray">
      <div class="w-full px-2 lg:px-0 lg:w-4/5">
        <ChatInput
          :disabled-input="!websocketOpened"
          @search="handleSearch"
        ></ChatInput>
        <div class="py-4"></div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
