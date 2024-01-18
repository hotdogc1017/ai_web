<script lang="ts" setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import router from "@/router/index.js";
import logo from "@/assets/logo.png";
import useLoginInfo from "@/stores/loginInfo";
import Login from "@/components/Login.vue";
import { usePostFetch } from "@/utils/fetch";
import { ElMessage, ElMessageBox } from "element-plus";

const { isLogin, loginInfo } = storeToRefs(useLoginInfo());
const showLoginOrRegister = ref(false);

function handleLoginSuccess() {
  showLoginOrRegister.value = false;
}

function handleCommand(command: "user" | "logout") {
  if (command === "user") {
    router.push("/user");
  } else if (command === "logout") {
    ElMessageBox.alert("是否退出当前账号?", "温馨提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(() => {
      useLoginInfo().removeLoginInfo();
      ElMessage.success("账号已退出 bye~");
    });
  } else {
    throw new Error(`未知的命令: ${command}`);
  }
}
</script>

<template>
  <div class="w-full bg-[#262626]">
    <div class="h-full px-10 flex justify-between items-center">
      <!-- logo -->
      <span class="text text-[30px] text-white font-black">AI</span>
      <!-- <img class="h-10 w-10" :src="logo" /> -->
      <!-- 用户 -->
      <div class="h-full flex items-center">
        <template v-if="isLogin">
          <div class="flex items-center gap-2">
            <el-avatar :size="30" :src="loginInfo?.user.avatar" />
            <el-dropdown trigger="click" @command="handleCommand">
              <span class="text-[white]"
                >{{ loginInfo?.user.name
                }}<el-icon style="vertical-align: middle"
                  ><arrow-down /></el-icon
              ></span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="user"> 个人中心 </el-dropdown-item>
                  <el-dropdown-item command="logout">
                    退出登录
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </template>
        <template v-else>
          <div>
            <el-button
              class="bg-primary"
              @click="showLoginOrRegister = true"
              type="primary"
              round
              >登录注册</el-button
            >
          </div>
        </template>
      </div>
    </div>
    <el-dialog
      class="w-5/6 sm:w-1/2 md:w-1/3 xl:w-1/4 rounded-xl"
      modal-class=""
      title="登录注册"
      v-model="showLoginOrRegister"
    >
      <Login @success="handleLoginSuccess()"></Login>
    </el-dialog>
  </div>
</template>

<style scoped></style>
