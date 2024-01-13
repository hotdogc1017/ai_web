<script lang="ts" setup>
import {
  ref,
  computed,
  watchPostEffect,
  onMounted,
  nextTick,
  watch,
} from "vue";

const prop = defineProps<{ disabledInput: boolean }>();
const emit = defineEmits(["search"]);

const searchKey = ref("");
const btn = ref<HTMLButtonElement | null>();
const textarea = ref<HTMLTextAreaElement | null>();

const enabledInput = computed(() => {
  const enabled = searchKey.value && !prop.disabledInput;
  nextTick(() => {
    if (enabled) {
      btn.value?.removeAttribute("disabled");
      textarea.value?.removeAttribute("disabled");
    } else {
      btn.value?.setAttribute("disabled", "");
      textarea.value?.setAttribute("disabled", "");
    }
  });
  return enabled;
});

function doSearch() {
  if (!enabledInput.value) {
    emit("search", searchKey.value);
  }
}

function doEnter() {
  if (!enabledInput.value) {
    emit("search", searchKey.value);
    searchKey.value = "";
  }
}

onMounted(() => {
  textarea.value?.addEventListener("keydown", (event) => {
    if (event.keyCode === 13 || event.key === "Enter") {
      event.preventDefault();
    }
  });
});
</script>

<template>
  <div
    class="border-[#0003] flex flex-1 flex-col w-full flex-grow relative border rounded-2xl bg-white focus-within:shadow-ml"
  >
    <textarea
      ref="textarea"
      v-model="searchKey"
      @keyup.enter.exact="doEnter()"
      tabindex="0"
      rows="1"
      :placeholder="
        prop.disabledInput
          ? '稍等片刻, 正在和服务器建立连接...'
          : '向 ChatGPT 发起询问...'
      "
      class="text-[16px] m-0 w-full resize-none border-0 bg-transparent py-[10px] focus:outline-0 focus-visible:outline-0 pr-10 focus:ring-0 focus-visible:ring-0 md:py-3.5 md:pr-12 placeholder-black/50 pl-3 md:pl-4"
      style="max-height: 200px; height: 52px; overflow-y: hidden"
      disabled
      >{{ searchKey }}</textarea
    ><button
      @click="doSearch()"
      ref="btn"
      disabled
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
</template>

<style scoped></style>
