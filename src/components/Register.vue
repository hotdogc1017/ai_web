<script lang="ts" setup>
import { ref } from "vue";

const username = ref();
const password = ref();
const loading = ref();
</script>

<template>
  <div class="w-full h-full flex flex-col gap-5">
    <div>
      <el-input
        prefix-icon="el-icon-user-solid"
        v-model.trim="username"
        type="text"
        placeholder="请输入账户"
      ></el-input>
    </div>
    <div>
      <el-input
        prefix-icon="el-icon-unlock"
        v-model.trim="password"
        type="password"
        placeholder="请输入密码"
      ></el-input>
    </div>
    <div>
      <el-button :loading="loading" type="primary" style="width: 100%">
        <span>{{ loading ? "注 册 中..." : "注 册" }}</span>
      </el-button>
    </div>
    <div class="flex">
      <div class="m-auto flex gap-4">
        <el-button text>账号登录</el-button>
        <el-button text>忘记密码</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
