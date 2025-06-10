<template>
  <v-app>
    <v-main
      class="d-flex align-center justify-center"
      style="min-height: 100vh; background: #e3f2fd"
    >
      <v-card class="pa-6 rounded-xl elevation-10 w-full max-w-sm px-4">
        <v-card-title class="text-h5 text-center mb-4 d-flex justify-center align-center">
          <v-icon class="me-2" size="36">mdi-account-circle</v-icon>
          Bem-vindo ao SaldoZen
        </v-card-title>

        <v-form @submit.prevent="handleLogin" ref="form">
          <v-text-field
            v-model="email"
            label="Usuário"
            type="email"
            prepend-inner-icon="mdi-account"
            outlined
            dense
            class="mb-3"
            required
          />

          <v-text-field
            v-model="password"
            label="Senha"
            type="password"
            prepend-inner-icon="mdi-lock"
            outlined
            dense
            class="mb-4"
            required
          />

          <v-btn :loading="loading" type="submit" block color="primary" size="large">
            Entrar
          </v-btn>

          <v-alert v-if="error" type="error" class="mt-4" dense border="start" border-color="red">
            {{ error }}
          </v-alert>
        </v-form>
      </v-card>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const router = useRouter()
const auth = useAuthStore()

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  const success = await auth.login(email.value, password.value)

  loading.value = false

  if (success) {
    router.push('/dashboard')
  } else {
    error.value = 'Credenciais inválidas'
  }
}
</script>
