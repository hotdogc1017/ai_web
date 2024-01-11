<script lang="ts" setup>
import { ref } from "vue";

const searchKey = ref("");
</script>

<template>
  <div class="w-full flex justify-center items-center">
    <input
      class="rounded-2xl placeholder:text-[16px] w-full h-14 border-slate-300 border-[1px] border-solid px-4 focus-visible:shadow-sm focus-visible:border-slate-300 focus-visible:outline-none"
      v-model="searchKey"
      placeholder="向 ChatGPT 发起询问..."
    />
  </div>
</template>

<style scoped></style>
