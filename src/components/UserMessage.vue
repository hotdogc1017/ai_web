<script lang="ts" setup>
import { ref } from "vue";
import ChatGPTLightIcon from "@/components/ChatGPTLightIcon.vue";
import useLoginInfo from "@/stores/loginInfo";

const props = defineProps<{
  content: string;
  isMe: boolean;
}>();

const answer = ref("");
const thinking = ref(false);
const messageRef = ref<HTMLElement | null>();

function appendAnswerContent(char: string) {
  answer.value ??= "";
  answer.value += char;
}

function scrollToBottom() {
  messageRef.value?.scrollIntoView({
    behavior: "smooth",
    block: "end",
  });
}

defineExpose({ appendAnswerContent, scrollToBottom, thinking });
</script>

<template>
  <div ref="messageRef" class="w-full flex gap-3 text-base">
    <div class="flex justify-end">
      <template v-if="props.isMe">
        <el-avatar
          class="w-6 h-6"
          size="small"
          :src="useLoginInfo().loginInfo?.user.avatar"
        ></el-avatar>
      </template>
      <template v-else>
        <ChatGPTLightIcon></ChatGPTLightIcon>
      </template>
    </div>
    <div>
      <span class="font-[bold]">{{ props.isMe ? "你" : "ChatGPT" }}</span>
      <p class="py-1 items-center">
        <span>{{
          !!(props.content || props.content.trim()) ? props.content : answer
        }}</span>
        <span v-show="thinking" class="think mx-1"></span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.think {
  display: inline-block;
  width: 12px;
  height: 12px;
  background-color: #0f0f0f;
  border-radius: 50%;
  animation: pulseSize 1.25s ease-in-out infinite;
  transform-origin: center;
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
  box-sizing: border-box;
}

@keyframes pulseSize {
  0%,
  100% {
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }

  50% {
    -webkit-transform: scale3d(1.25, 1.25, 1);
    transform: scale3d(1.25, 1.25, 1);
  }
}
</style>
