<script setup lang="ts">
import { ref, watch, computed } from "vue";

const props = defineProps<{ target?: HTMLDivElement }>();

watch(
  () => props.target,
  (val) => {
    val?.addEventListener("scroll", () => {
      if (props.target) {
        props.target.style.scrollBehavior = "smooth";
      }
      scrollTop.value = props.target?.scrollTop ?? 0;
    });
  },
);

function scrollToBottom() {
  if (props.target) {
    props.target.scrollTop = 99999;
  }
}

const scrollTop = ref(0);
const show = computed(() => {
  if (props?.target) {
    const selfHeight = props?.target?.clientHeight;
    const scrollHeight = props?.target?.scrollHeight;
    const position = scrollHeight - selfHeight - scrollTop.value;
    return position > 150;
  }
  return false;
});

defineExpose({ scrollToBottom });
</script>

<template>
  <Transition name="fade">
    <button
      v-show="show"
      style="z-index: 999"
      @click="scrollToBottom()"
      class="shadow-none bg-white cursor-pointer absolute z-999 rounded-full bg-clip-padding border text-gray-600 dark:border-white/10 dark:bg-white/10 dark:text-gray-200 right-1/2 border-black/10 bg-token-surface-primary bottom-5"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        class="m-1 text-black dark:text-white"
      >
        <path
          d="M17 13L12 18L7 13M12 6L12 17"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    </button>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
