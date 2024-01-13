import useConnectRoom from "@/stores/connectRoom";
import useLoginInfo from "@/stores/loginInfo";
import { storeToRefs } from "pinia";
import { usePostFetch, useGetFetch } from "@/utils/fetch";
import { ElMessage } from "element-plus";
export interface Message {
  answer: string;
  createAt: string;
  flag: 1 | 0;
  id: number;
  roomId: string;
}

export interface Room {
  chatRecordList: Message[];
  createAt: string;
  flag: 1 | 0;
  id: string;
  mid: string;
  moduleId: "ai" | "gpt";
  roomName: string;
}

export async function createRoom() {
  const { data } = await usePostFetch<string>("/createChat?moduleId=ai");
  if (data.value) {
    const response: { data: Room } = JSON.parse(data.value);
    useConnectRoom().setCurrentRoom(response.data);
  } else {
    ElMessage.error("创建聊天室失败");
  }
}
