import { ref, computed } from "vue";
import { defineStore } from "pinia";

interface LoginInfo {
  token: string;
  uid: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
}

const key = "loginInfo";

const useLoginInfo = defineStore(key, () => {
  const cache = localStorage.getItem(key);
  const loginInfo = ref<LoginInfo | null>();
  try {
    if (cache) {
      loginInfo.value = JSON.parse(cache);
    }
  } catch (e) {
    throw new Error("登录信息缓存数据已修改");
  }
  const isLogin = computed(() => !!loginInfo.value);
  function setLoginInfo(info: LoginInfo) {
    loginInfo.value = info;
    localStorage.setItem(key, JSON.stringify(loginInfo.value));
  }
  function removeLoginInfo() {
    loginInfo.value = null;
    localStorage.removeItem(key);
  }

  return { loginInfo, isLogin, setLoginInfo, removeLoginInfo };
});

export default useLoginInfo;
