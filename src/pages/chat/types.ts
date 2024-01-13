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

export interface RecordMessage {
  context: string;
  role: "ai";
  status: "1" | "0";
  time: string;
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

export function convertRecordMessage(
  message: RecordMessage,
  roomId: string,
): Message {
  if (!message || !roomId) {
    throw new Error("参数异常");
  }
  return {
    answer: message.context,
    createAt: message.time,
    flag: message.role === "ai" ? 1 : 0,
    id: -1,
    roomId,
  };
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

export async function getMessageListByRoomId(roomId: string) {
  if (!roomId) {
    throw new Error(`roomId无效: ${roomId}`);
  }
  const { data } = await useGetFetch<string>(
    `/getChatRecordList?roomId=${roomId}`,
  );
  if (data.value) {
    const response: { data: RecordMessage[] } = JSON.parse(data.value);
    return response.data.map((message) =>
      convertRecordMessage(message, roomId),
    );
  } else {
    ElMessage.error(`获取roomId: ${roomId} 对应的聊天记录失败`);
  }
}
