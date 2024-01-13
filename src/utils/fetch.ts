import { createFetch } from "@vueuse/core";
import { storeToRefs } from "pinia";
import useLoginInfo from "@/stores/loginInfo";

const { loginInfo } = storeToRefs(useLoginInfo());
export function getDefaultFetch(options: HeadersInit) {
  return createFetch({
    baseUrl: "http://39.106.69.95:8099",
    options: {
      async beforeFetch({ options }) {
        if (!options.headers) {
          throw new Error("配置fetch失败");
        }
        options.headers = {
          ...options.headers,
          Authtoken: loginInfo.value ? loginInfo.value.token : "",
          "Content-Type": "application/json;charset=UTF-8",
        };
        return { options };
      },
    },
    fetchOptions: {
      ...options,
      mode: "cors",
    },
  });
}

export const usePostFetch = getDefaultFetch({
  method: "post",
});

export const useGetFetch = getDefaultFetch({
  method: "get",
});
