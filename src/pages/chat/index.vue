<script lang="ts" setup>
import { ref } from "vue";
import ChatDetail from "./ChatDetail.vue";
import ChatList from "./ChatList.vue";
import ChatInput from "./ChatInput.vue";
</script>

<template>
  <div class="w-full flex">
    <ChatList></ChatList>
    <ChatDetail></ChatDetail>
  </div>
</template>

<style scoped></style>
