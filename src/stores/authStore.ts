import { defineStore } from 'pinia'
import { login as loginAPI, signup } from '@/services/authService'

interface User {
  id: string
  name: string
  email: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
    user: null as User | null,
  }),
  actions: {
    async login(email: string, password: string) {
      try {
        const response = await loginAPI(email, password)
        this.token = response.token
        this.user = response.user
        return true
      } catch {
        return false
      }
    },
    async signup(name: string, email: string, password: string) {
      try {
        const response = await signup(name, email, password)
        this.token = response.token
        this.user = response.user
        return true
      } catch {
        return false
      }
    },
  },
})
