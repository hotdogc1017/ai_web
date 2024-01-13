<script lang="ts" setup>
import { ref, computed } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
import { usePostFetch } from "@/utils/fetch";
import useLoginInfo from "@/stores/loginInfo";

const emit = defineEmits(["success", "fail"]);

const username = ref("test@test.com");
const password = ref("123456");
const loading = ref(false);
const loginInfo = useLoginInfo();

const commitEnabled = computed(() => !!username.value && !!password.value);

function login() {
  loading.value = true;
  doLogin()
    .then(() => emit("success"))
    .catch((e) => {
      console.error(e);
      emit("fail");
    })
    .finally(() => (loading.value = false));
}

async function doLogin() {
  const { data } = await usePostFetch<string | null>("/api/login", {
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
  });
  if (data.value) {
    const entity: {
      data: { token: string; uid: string; username: string; headImg: string };
    } = JSON.parse(data.value);
    const {
      data: { token, username, uid, headImg },
    } = entity;
    loginInfo.setLoginInfo({
      token,
      uid,
      user: {
        id: uid,
        name: username,
        avatar: headImg,
      },
    });
  } else {
    throw new Error("登录接口异常");
  }
}
</script>

<template>
  <div class="w-full h-full flex flex-col gap-5">
    <div>
      <el-input
        :prefix-icon="User"
        size="large"
        v-model.trim="username"
        type="text"
        placeholder="请输入账户"
        clearable
      ></el-input>
    </div>
    <div>
      <el-input
        :prefix-icon="Lock"
        size="large"
        v-model.trim="password"
        type="password"
        placeholder="请输入密码"
        clearable
      ></el-input>
    </div>
    <div>
      <el-button
        :disabled="!commitEnabled"
        class="bg-primary"
        :loading="loading"
        type="primary"
        style="width: 100%"
        size="large"
        @click="login()"
      >
        <span>{{ loading ? "登 录 中..." : "登 录" }}</span>
      </el-button>
    </div>
    <div class="flex">
      <div class="m-auto flex gap-4">
        <el-button disabled="" text>注册账号</el-button>
        <el-button disabled="" text>忘记密码</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
