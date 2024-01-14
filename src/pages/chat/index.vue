<script lang="ts" setup>
import { ref, onBeforeMount, nextTick, onBeforeUnmount } from "vue";
import ChatDetail from "./ChatDetail.vue";
import ChatList from "./ChatList.vue";
import ChatInput from "./ChatInput.vue";
import useLoginInfo from "@/stores/loginInfo";
import { usePostFetch, useGetFetch } from "@/utils/fetch";
import { type Room, type RoomTitle, createRoom } from "./types";
import useConnectRoom from "@/stores/connectRoom";
import { ElMessage } from "element-plus";
import { ro } from "element-plus/es/locale/index.mjs";

const loginInfo = useLoginInfo();
const chatList = ref<RoomTitle[]>([]);
const currentRoom = ref<Room | null>();
const chatListRef = ref<InstanceType<typeof ChatList> | null>();

function handleSwitchRoom(room: Room) {
  currentRoom.value = room;
}

function handleCreateRoom(action: null | (() => void)) {
  nextTick(async () => {
    await createRoom();
    await nextTick();
    if (chatListRef.value) {
      chatListRef.value.isCreateRoom = true;
    }
    // 创建新的对话需要更新聊天列表
    await listChat();
    currentRoom.value = chatList.value[0].rooms[0];
    await nextTick();
    action && action();
  });
}

async function listChat() {
  const { data } = await useGetFetch<string>(`/gtpApi/getChatList`);
  if (data.value) {
    const response: { data: Room[] } = JSON.parse(data.value);
    chatList.value = response.data.map((r) => {
      return {
        rooms: [r],
        createAt: r.createAt,
      };
    });
  } else {
    ElMessage.error("获取聊天列表失败");
  }
}

onBeforeMount(async () => {
  await listChat();
});
</script>

<template>
  <div class="w-full h-full flex">
    <div class="h-full w-[260px]">
      <ChatList
        @switch-room="handleSwitchRoom"
        @create-room="handleCreateRoom"
        :list="chatList"
        ref="chatListRef"
      ></ChatList>
    </div>
    <div class="h-full w-[calc(100%-260px)]">
      <ChatDetail
        :current-room="currentRoom"
        @create-room="handleCreateRoom"
      ></ChatDetail>
    </div>
  </div>
</template>

<style scoped></style>
