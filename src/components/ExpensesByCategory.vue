<template>
  <div class="bg-white p-4 rounded-lg shadow-md">
    <h2 class="text-lg font-semibold mb-4">Despesas por Categoria</h2>
    <Doughnut :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { Doughnut } from 'vue-chartjs'
import { computed } from 'vue'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const props = defineProps<{
  data: { categoria: string; total: number }[]
}>()

const chartData = computed(() => ({
  labels: props.data.map((item) => item.categoria),
  datasets: [
    {
      data: props.data.map((item) => item.total),
      backgroundColor: ['#f97316', '#3b82f6', '#10b981', '#a855f7', '#f43f5e', '#facc15'],
    },
  ],
}))

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
  },
}
</script>
