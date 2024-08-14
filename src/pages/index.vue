<script lang="ts" setup>
import Header from "./Header.vue";
</script>

<template>
  <div class="home">
    <Header class="h-[50px] w-full"></Header>
    <div class="flex flex-row">
      <div class="h-[calc(100vh-50px)] w-full">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
