import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('auth_token'))
  const user = ref<{ email: string } | null>(null)

  const isAuthenticated = computed(() => !!token.value)

  function login(email: string, authToken: string): void {
    token.value = authToken
    user.value = { email }
    localStorage.setItem('auth_token', authToken)
  }

  function logout(): void {
    token.value = null
    user.value = null
    localStorage.removeItem('auth_token')
  }

  return { token, user, isAuthenticated, login, logout }
})
