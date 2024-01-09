<script lang="ts" setup>
import {} from "vue";

const prop = defineProps<{ content: string; isMe: boolean }>();
</script>

<template>
  <div class="w-full grid grid-cols-2 gap-3">
    <el-avatar
      size="small"
      src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    ></el-avatar>
    <div class="ml-4">
      <strong>You</strong>
      <p>
        {{ prop.content }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
