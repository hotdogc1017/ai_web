<script lang="ts" setup>
import { ref, watch, computed } from "vue";
import ChatGPTIcon from "@/components/ChatGPTIcon.vue";
import { type Room, type RoomTitle } from "./types";
import moment from "moment";

const props = defineProps<{
  list: RoomTitle[];
}>();

const emit = defineEmits(["createRoom", "switchRoom"]);

moment.locale("zh-cn");
const switchedId = ref();
const isCreateRoom = ref(false);

const composedList = computed(() =>
  props.list.map((roomTitle) => {
    const dateTime = moment(
      roomTitle.createAt,
      "YYYY-MM-DD HH:mm:ss",
    ).daysInMonth();
    console.log(dateTime);
  }),
);

watch(
  () => props.list,
  (newVal) => {
    if (isCreateRoom.value) {
      switchedId.value = newVal[0]?.rooms[0].id;
      isCreateRoom.value = false;
    }
    newVal.map((roomTitle) => {
      console.log(moment.locale());
      const dateTime = moment(
        roomTitle.createAt,
        "YYYY-MM-DD HH:mm:ss",
        "zh-cn",
      );
      console.log(dateTime.calendar());
      console.log(dateTime.year(), dateTime.month(), dateTime.days());
    });
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
              class="p-2 text-sm rounded-lg cursor-pointer"
              :class="{
                'bg-[#343541]': switchedId === id,
                'hover:bg-[#202123]': switchedId !== id,
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
