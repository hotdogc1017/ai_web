import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { Room } from "@/pages/chat/types";

const key = "connectRoom";

const useConnectRoom = defineStore(key, () => {
  const cache = localStorage.getItem(key);
  const currentRoom = ref<Room | null>();
  try {
    if (cache) {
      currentRoom.value = JSON.parse(cache);
    }
  } catch (e) {
    throw new Error("登录信息缓存数据已修改");
  }
  const existRoom = computed(() => !!currentRoom.value);
  function setCurrentRoom(info: Room) {
    currentRoom.value = info;
    localStorage.setItem(key, JSON.stringify(currentRoom.value));
  }
  function removeCurrentRoom() {
    currentRoom.value = null;
    localStorage.removeItem(key);
  }

  return { currentRoom, existRoom, setCurrentRoom, removeCurrentRoom };
});

export default useConnectRoom;
