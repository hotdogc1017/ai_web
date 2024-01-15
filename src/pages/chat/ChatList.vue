<script lang="ts" setup>
import { ref, watch, computed } from "vue";
import ChatGPTIcon from "@/components/ChatGPTIcon.vue";
import { type Room, type RoomTitle } from "./types";
import moment from "moment";
moment.updateLocale("en", {
  relativeTime: {
    past: "%s前",
    s: "今天",
    ss: "今天",
    m: "今天",
    mm: "今天",
    h: "今天",
    hh: "今天",
    d: "昨天",
    dd: "%d 天前",
    w: "上周",
    ww: "%d 周前",
    M: "上月",
    MM: "%d 月前",
    y: "去年",
    yy: "%d 年前",
  },
});
const props = defineProps<{
  list: RoomTitle[];
}>();

const emit = defineEmits(["createRoom", "switchRoom"]);
const switchedId = ref();
const isCreateRoom = ref(false);

const composedList = computed(() => {
  const resultList: RoomTitle[] = [];
  let title: string;
  let rooms: Room[];
  props.list.forEach((roomTitle) => {
    const dateTime = moment(roomTitle.createAt, "YYYY-MM-DD");
    const currentTitle = dateTime.fromNow(true);
    if (title !== currentTitle) {
      if (title && rooms) {
        resultList.push({
          createAt: title,
          rooms,
        });
      }
      title = currentTitle;
      rooms = [];
    }
    rooms.push(roomTitle.rooms[0]);
  });
  return resultList;
});

watch(
  () => props.list,
  (newVal) => {
    if (isCreateRoom.value) {
      switchedId.value = newVal[0]?.rooms[0].id;
      isCreateRoom.value = false;
    }
  },
);

function doCreateRoom() {
  isCreateRoom.value = true;
  emit("createRoom");
}

function handleSwitchRoom(room: Room) {
  switchedId.value = room.id;
  emit("switchRoom", room);
}

defineExpose({ doCreateRoom, isCreateRoom });
</script>

<template>
  <div class="h-full w-full bg-black p-2">
    <div class="h-5/6">
      <!-- 新建对话 -->
      <div
        @click="doCreateRoom()"
        class="flex items-center justify-between p-2 hover:bg-[#202123] rounded-lg cursor-pointer"
      >
        <div class="flex items-center">
          <ChatGPTIcon></ChatGPTIcon>
          <span
            class="ml-2 text-[#ECECF1] grow overflow-hidden text-ellipsis whitespace-nowrap text-sm text-token-text-primary"
            >新建对话</span
          >
        </div>
        <Edit class="w-4 h-4 text-[#ECECF1]" />
      </div>
      <!-- 列表信息 -->
      <el-scrollbar class="h-full overflow-auto pr-3">
        <div
          v-for="({ createAt, rooms }, i) in composedList"
          class="mt-5"
          :key="i"
        >
          <div>
            <h3
              class="h-9 pb-2 pt-3 px-2 text-xs font-medium text-ellipsis overflow-hidden break-all bg-black text-[#666666]"
            >
              {{ createAt }}
            </h3>
          </div>

          <ul class="h-full overflow-auto mt-2 text-[#ececf1]">
            <li
              class="p-2 text-sm rounded-lg cursor-pointer"
              :class="{
                'bg-[#343541]': switchedId === id,
                'hover:bg-[#202123]': switchedId !== id,
              }"
              v-for="({ roomName, id }, index) in rooms"
              :key="index"
              @click="handleSwitchRoom(rooms[index])"
            >
              <span class="antialiased"> {{ roomName }}</span>
            </li>
          </ul>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<style scoped></style>
