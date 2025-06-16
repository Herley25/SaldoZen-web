<template>
  <div class="bg-white p-4 rounded-lg shadow-md">
    <h2 class="text-lg font-semibold mb-4">Distribuição por Categoria</h2>
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { computed } from 'vue'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const props = defineProps<{
  expenses: { categoria: string; valor: number }[]
}>()

// Agrupar valores por categoria
const categoryTotals = computed(() => {
  const totals: Record<string, number> = {}
  props.expenses.forEach((expense) => {
    if (!totals[expense.categoria]) totals[expense.categoria] = 0
    totals[expense.categoria] += expense.valor
  })
  return totals
})

// Dados do gráfico
const chartData = computed(() => ({
  labels: Object.keys(categoryTotals.value),
  datasets: [
    {
      label: 'Despesas por categoria',
      data: Object.values(categoryTotals.value),
      backgroundColor: [
        '#6b21a8',
        '#9333ea',
        '#c084fc',
        '#f472b6',
        '#60a5fa',
        '#34d399',
        '#facc15',
        '#f97316',
      ],
      borderWidth: 1,
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
