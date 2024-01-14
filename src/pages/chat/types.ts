import useLoginInfo from "@/stores/loginInfo";
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
  /**
   * 2: ai回答完毕, 1: 反之
   */
  status: 1 | 2;
  time: string;
}

export interface RoomTitle {
  rooms: [Room];
  createAt: string;
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

/**
 * 创建一个新的对话。注意，创建新对话接口返回的是对话列表，而不是新的对话
 * @returns 新对话的对话列表
 */
export async function createRoom() {
  const { data } = await usePostFetch<string>("/gtpApi/createChat");
  if (data.value) {
    const response: { data: Message[] } = JSON.parse(data.value);
    return response.data;
  } else {
    ElMessage.error("创建聊天室失败");
  }
}

export async function getMessageListByRoomId(roomId: string) {
  if (!roomId) {
    throw new Error(`roomId无效: ${roomId}`);
  }
  const { data } = await useGetFetch<string>(
    `/gtpApi/getChatRecordList?roomId=${roomId}`,
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
