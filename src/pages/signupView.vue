<template>
  <div class="min-h-screen flex flex-col justify-center p-6 bg-white">
    <h2 class="text-2xl font-bold text-center text-purple-800 mb-6">Create Your Account</h2>

    <form @submit.prevent="handleSignup" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Nome</label>
        <input
          v-model="name"
          type="text"
          placeholder="Name"
          class="w-full text-black mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full text-black mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Senha</label>
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full text-black mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>

      <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>

      <button type="submit" class="w-full py-3 rounded-full bg-purple-700 text-white font-semibold">
        Sign up
      </button>
    </form>

    <button @click="goToLogin" class="mt-4 text-purple-700 text-sm underline mx-auto">
      Already have an account? Log in
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')

const authStore = useAuthStore()
const router = useRouter()

const handleSignup = async () => {
  error.value = ''
  const success = await authStore.signup(name.value, email.value, password.value)

  if (success) {
    router.push('/dashboard')
  } else {
    error.value = 'Erro ao criar conta. Tente novamente.'
  }
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<style scoped></style>
