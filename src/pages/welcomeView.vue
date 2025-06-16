<template>
  <main
    role="main"
    class="min-h-screen flex flex-col justify-between bg-gradient-to-br from-purple-800 to-indigo-600 p-6"
  >
    <!-- Header -->
    <header id="welcome-heading" class="text-white text-center mt-12">
      <h1 class="text-2xl font-semibold mb-2 md:text-3xl">
        Your Ultimate Solution for Financial Success
      </h1>
      <p class="text-sm text-indigo-100">
        Take control of your financial future with personalized insights.
      </p>
    </header>

    <!-- CTA -->
    <div class="flex gap-3 mt-10">
      <button
        @click="goToSignup"
        class="w-full py-3 rounded-full bg-white text-purple-700 font-semibold hover:bg-purple-100 transition"
        aria-label="Sign up"
      >
        Sign up
      </button>
      <button
        @click="goToLogin"
        class="w-full py-3 rounded-full bg-purple-700 text-white border border-white hover:bg-purple-600 transition"
        aria-label="Log in"
      >
        Log in
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToSignup = () => {
  router.push('/signup')
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<style scoped></style>
