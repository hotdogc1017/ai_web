<script lang="ts" setup>
import { ref, computed, nextTick, watch, onBeforeMount } from "vue";
import UserMessage from "../../components/UserMessage.vue";
import ChatInput from "./ChatInput.vue";
import ChatGPTBigIcon from "@/components/ChatGPTBigIcon.vue";
import BackBottom from "@/components/BackBottom.vue";
import {
  type Message,
  type Room,
  type RecordMessage,
  getMessageListByRoomId,
} from "./types";
import useLoginInfo from "@/stores/loginInfo";
import { ElMessage, type ElScrollbar } from "element-plus";
import { usePostFetch } from "@/utils/fetch";

const props = defineProps<{ currentRoom: Room | null | undefined }>();
const emit = defineEmits(["createRoom"]);

const messageList = ref<Message[]>([]);
const backBottomRef = ref<InstanceType<typeof BackBottom> | null>();
const testRef = ref<HTMLDivElement | undefined>();
const messageRefs = ref<InstanceType<typeof UserMessage>[]>();
const lastMessageRef = ref<InstanceType<typeof UserMessage>>();
const websocket = ref<WebSocket | null>();
const websocketOpened = ref(false);
const disabledGetMessageListByUpdatingRoom = ref(false);

const isEmpty = computed(
  () => !messageList.value || messageList.value?.length === 0,
);

watch(
  () => props.currentRoom,
  (newVal) => {
    console.log("检测到当前room已更新");
    if (!disabledGetMessageListByUpdatingRoom.value && newVal?.id) {
      getMessageList(newVal.id);
    }
  },
);

watch(websocket, () => {
  if (websocket.value) {
    websocket.value.addEventListener("message", (event) => {
      const data: string = event.data;
      const message: RecordMessage = JSON.parse(data);
      if (!lastMessageRef.value) {
        throw new Error("未获取到最后一个对话元素");
      }
      lastMessageRef.value.thinking = message.status === 1;
      lastMessageRef.value.appendAnswerContent(message.context);
      lastMessageRef.value.scrollToBottom();
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
    ElMessage.error("出错了, 与服务器断开对话连接");
    throw new Error(`websocket还未准备就绪`);
  } else if (websocket.value.readyState !== 1) {
    ElMessage.error("出错了, 与服务器断开对话连接");
    throw new Error(
      `websocket异常, readyStatue为: ${websocket.value.readyState}`,
    );
  }
  async function doIt() {
    await nextTick();
    if (!props.currentRoom) {
      throw new Error("无法获取对话内容, 因为未指定一个有效的对话");
    }
    if (isEmpty.value) {
      await getMessageList(props.currentRoom?.id);
    }
    await nextTick();
    enterAIAnsweringState(searchKey);
    await askAI(searchKey);
  }
  if (!props.currentRoom) {
    // 禁止通过room更新获取聊天列表，改为手动获取
    disabledGetMessageListByUpdatingRoom.value = true;
    emit("createRoom", doIt);
  } else {
    doIt();
  }
}

async function getMessageList(roomId: string) {
  const list = await getMessageListByRoomId(roomId);
  messageList.value = list ?? [];
}

async function askAI(question: string) {
  await usePostFetch("/gtpApi/ask", {
    body: JSON.stringify({
      model: "GPT4.0",
      roomId: props.currentRoom?.id,
      question,
    }),
  });
}

async function enterAIAnsweringState(searchKey: string) {
  messageList.value.push(createMessage(searchKey, true));
  messageList.value.push(createMessage("", false));
  await nextTick();
  if (messageRefs.value) {
    const [ref, ..._] = messageRefs.value.toReversed();
    lastMessageRef.value = ref;
    lastMessageRef.value?.scrollToBottom();
    backBottomRef.value?.scrollToBottom();
    lastMessageRef.value && (lastMessageRef.value.thinking = true);
  }
}

function createMessage(content: string, isMe: boolean): Message {
  return {
    answer: content,
    createAt: "",
    flag: isMe ? 0 : 1,
    id: -1,
    roomId: props.currentRoom?.mid ?? "",
  };
}

onBeforeMount(() => {
  initWebsocket();
  props.currentRoom && getMessageList(props.currentRoom.id);
});
</script>

<template>
  <div class="w-full h-full bg-white flex flex-col">
    <div class="flex-1 relative w-full overflow-hidden text-[#374151]">
      <BackBottom ref="backBottomRef" :target="testRef"></BackBottom>
      <el-scrollbar always view-class="mx-4 sm:mx-0 flex justify-center h-full">
        <div class="flex w-full lg:w-4/5">
          <div ref="testRef" class="overflow-auto w-full px-12">
            <template v-if="isEmpty">
              <div
                class="h-full w-full flex flex-col justify-center items-center"
              >
                <ChatGPTBigIcon></ChatGPTBigIcon>
                <div class="mb-5 text-2xl font-bold text-black">
                  今天能为您提供什么帮助？
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
    </div>
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
