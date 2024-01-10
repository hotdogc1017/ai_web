import { ref } from 'vue'
import { defineStore } from 'pinia'

let t = ref<number | NodeJS.Timeout | undefined>()

export const useLoading = defineStore('loading', () => {
  const state = ref(false)

  async function load(timeout = 200, duration = 0) {
    clearTimeout && clearTimeout(t.value)
    await new Promise((resolve) => {
      t.value = setTimeout(() => {
        state.value = true
        resolve(true)
      }, timeout)
    })
    return duration > 0
      ? new Promise((rs) =>
          setTimeout(() => {
            unload()
            rs(true)
          }, duration)
        )
      : true
  }

  function unload() {
    clearTimeout && clearTimeout(t.value)
    state.value = false
  }

  return { state, load, unload }
})
