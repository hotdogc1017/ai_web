<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import ChatDetail from "./ChatDetail.vue";
import ChatList from "./ChatList.vue";
import ChatInput from "./ChatInput.vue";
import useLoginInfo from "@/stores/loginInfo";
import { usePostFetch, useGetFetch } from "@/utils/fetch";
import type { Room } from "./types";
import useConnectRoom from "@/stores/connectRoom";
import { ElMessage } from "element-plus";

const loginInfo = useLoginInfo();

async function createRoom() {
  const { data } = await usePostFetch<string>("/createChat?moduleId=ai");
  if (data.value) {
    const response: { data: Room } = JSON.parse(data.value);
    useConnectRoom().setCurrentRoom(response.data);
  } else {
    ElMessage.error("创建聊天室失败");
  }
}

onBeforeMount(async () => {
  // createRoom();
});
</script>

<template>
  <div class="w-full h-full flex">
    <div class="h-full w-[260px]">
      <ChatList></ChatList>
    </div>
    <div class="h-full w-[calc(100%-260px)]">
      <ChatDetail></ChatDetail>
    </div>
  </div>
</template>

<style scoped></style>
