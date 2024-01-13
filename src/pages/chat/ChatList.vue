<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import ChatGPTIcon from "@/components/ChatGPTIcon.vue";
import { usePostFetch, useGetFetch } from "@/utils/fetch";
import { ElMessage } from "element-plus";
import { type Room, createRoom } from "./types.ts";
import useConnectRoom from "@/stores/connectRoom";

const list = ref<{ rooms: [Room]; createAt: string }[]>();
const switchedId = ref();
const chatList = ref([
  {
    dateTime: "昨天",
    list: [
      {
        title: "Vue3中事件总线的使用",
      },
      {
        title: "数据库中的DDL是什么",
      },
    ],
  },
  {
    dateTime: "前天",
    list: [
      {
        title: "电商专业就业前景怎么样",
      },
    ],
  },
  {
    dateTime: "前天",
    list: [
      {
        title: "电商专业就业前景怎么样",
      },
    ],
  },
  {
    dateTime: "前天",
    list: [
      {
        title: "电商专业就业前景怎么样",
      },
    ],
  },
  {
    dateTime: "前天",
    list: [
      {
        title: "电商专业就业前景怎么样",
      },
    ],
  },
  {
    dateTime: "前天",
    list: [
      {
        title: "电商专业就业前景怎么样",
      },
    ],
  },
  {
    dateTime: "前天",
    list: [
      {
        title: "电商专业就业前景怎么样",
      },
    ],
  },
  {
    dateTime: "前天",
    list: [
      {
        title: "电商专业就业前景怎么样",
      },
    ],
  },
]);

async function listChat() {
  const { data } = await useGetFetch<string>(`/getChatList?moduleId=ai`);
  if (data.value) {
    const response: { data: Room[] } = JSON.parse(data.value);
    list.value = response.data.map((r) => {
      return {
        rooms: [r],
        createAt: r.createAt,
      };
    });
  } else {
    ElMessage.error("获取聊天列表失败");
  }
}

function handleSwitchRoom(room: Room) {
  useConnectRoom().setCurrentRoom(room);
  switchedId.value = room.id;
}

onBeforeMount(async () => await listChat());
</script>

<template>
  <div class="h-full w-full bg-black p-2">
    <div class="h-5/6">
      <!-- 新建对话 -->
      <div
        class="flex items-center justify-between p-2 hover:bg-[#202123] rounded-lg cursor-pointer"
      >
        <div class="flex items-center">
          <ChatGPTIcon></ChatGPTIcon>
          <span class="ml-2 text-[#ECECF1] font-bold">新建对话</span>
        </div>
        <Edit class="w-4 h-4 text-[#ECECF1]" />
      </div>
      <!-- 列表信息 -->
      <el-scrollbar class="h-full overflow-auto pr-3">
        <div v-for="({ createAt, rooms }, i) in list" class="mt-5" :key="i">
          <div>
            <h3
              class="h-9 pb-2 pt-3 px-2 text-xs font-medium text-ellipsis overflow-hidden break-all bg-black text-[#666666]"
            >
              {{ createAt }}
            </h3>
          </div>

          <ul class="h-full overflow-auto mt-2 text-[#ececf1]">
            <li
              class="p-2 text-sm hover:bg-[#202123] rounded-lg cursor-pointer"
              :style="{
                backgroundColor: switchedId === id ? '#343541' : 'none',
              }"
              v-for="({ roomName, id }, index) in rooms"
              :key="index"
              @click="handleSwitchRoom(rooms[index])"
            >
              <span> {{ roomName }}</span>
            </li>
          </ul>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<style scoped></style>
