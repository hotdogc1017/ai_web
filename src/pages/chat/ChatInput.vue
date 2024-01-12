<script lang="ts" setup>
import { ref } from "vue";

const searchKey = ref("");
</script>

<template>
  <div class="w-full flex justify-center items-center">
    <div
      class="flex focus-within:shadow-sm flex-col w-full flex-grow relative border rounded-2xl bg-white"
    >
      <textarea
        :value="searchKey"
        tabindex="0"
        rows="1"
        placeholder="向 ChatGPT 发起询问..."
        class="m-0 w-full resize-none border-0 bg-transparent py-[10px] focus:outline-0 focus-visible:outline-0 pr-10 focus:ring-0 focus-visible:ring-0 md:py-3.5 md:pr-12 placeholder-black/50 pl-3 md:pl-4"
        style="max-height: 200px; height: 52px; overflow-y: hidden"
        >{{ searchKey }}</textarea
      ><button
        class="absolute md:bottom-3 md:right-3 right-2 disabled:bg-black disabled:opacity-10 disabled:text-gray-400 enabled:bg-black text-white p-0.5 border border-black rounded-lg bottom-1.5 transition-colors"
      >
        <span class=""
          ><svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            class="text-white"
          >
            <path
              d="M7 11L12 6L17 11M12 18V7"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path></svg
        ></span>
      </button>
    </div>
    <!-- <input
      class="rounded-2xl placeholder:text-[16px] w-full h-14 border-slate-300 border-[1px] border-solid px-4 focus-visible:shadow-sm focus-visible:border-slate-300 focus-visible:outline-none"
      v-model="searchKey"
      placeholder="向 ChatGPT 发起询问..."
    /> -->
  </div>
</template>

<style scoped></style>
