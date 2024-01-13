<script lang="ts" setup>
import { ref } from "vue";
import ChatGPTLightIcon from "@/components/ChatGPTLightIcon.vue";
import useLoginInfo from "@/stores/loginInfo";
// import logo from "@/assets/logo.png";
// import ChatGPT from "@/assets/svg/ChatGPT.svg";

const prop = defineProps<{ content: string; isMe: boolean }>();

const content = ref(prop.content);

function appendAskContent(char: string) {
  content.value ??= "";
  content.value += char;
}

defineExpose({ appendAskContent });
</script>

<template>
  <div class="w-full flex gap-3 text-base">
    <div class="flex justify-end">
      <template v-if="prop.isMe">
        <el-avatar
          class="w-6 h-6"
          size="small"
          :src="useLoginInfo().loginInfo?.user.avatar"
        ></el-avatar>
      </template>
      <template v-else>
        <ChatGPTLightIcon></ChatGPTLightIcon>
        <!-- <el-image class="w-6 h-6" :src="logo"></el-image> -->
      </template>
    </div>
    <div>
      <span class="font-[bold]">{{ prop.isMe ? "你" : "ChatGPT" }}</span>
      <p class="py-1">
        {{ content ?? "思考中..." }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
