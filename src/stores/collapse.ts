import { ref } from "vue";
import { defineStore } from "pinia";

const useCollapse = defineStore("collapse", () => {
  const collapse = ref<string>();

  function setCollapse(value: string) {
    collapse.value = value;
  }

  function getCollapse() {
    return collapse.value;
  }

  return { collapse, setCollapse, getCollapse };
});

export default useCollapse;
