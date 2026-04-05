export const useAppStore = defineStore('app', () => {
  const isLoading = ref(false)

  function setLoading(value: boolean): void {
    isLoading.value = value
  }

  return { isLoading, setLoading }
})
