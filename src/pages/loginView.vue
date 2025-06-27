<template>
  <main
    class="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-800 to-indigo-600 p-6"
  >
    <div class="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-2xl font-semibold text-center text-purple-700 mb-4">Login</h2>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div style="margin-bottom: 8px">
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="E-mail"
            required
            class="w-full text-black mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <input
            v-model="password"
            placeholder="********"
            type="password"
            required
            class="w-full mt-1 text-black px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <p v-if="error" class="text-sm text-red-600">{{ error }}</p>

        <button
          type="submit"
          class="w-full bg-purple-700 text-white py-2 rounded-md hover:bg-purple-800 transition"
          style="margin-top: 18px"
        >
          Entrar
        </button>
      </form>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')

const handleLogin = async () => {
  error.value = ''

  const success = await authStore.login(email.value, password.value)

  if (success) {
    router.push('/dashboard')
  } else {
    error.value = 'Email ou senha inválidos.'
  }
}
</script>
