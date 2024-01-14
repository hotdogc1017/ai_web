import { ref, computed } from 'vue'
import type {Ref} from 'vue'
import { useLocalStorage } from "@vueuse/core"
import defaultLoadingAnimation from '@/assets/animations/loading_honeybee.json?url'

const key = 'DataHub@loadingAnimationUrl'
const url: Ref<string> = useLocalStorage(key, defaultLoadingAnimation)

export const useLoadingAnimationUrl = () => {

  function setUrl(u: string) {
    url.value = u
  }

  return { url, setUrl }
}