<template>
  <div class="bg-white p-4 rounded-lg shadow-md">
    <h2 class="text-lg font-semibold mb-4">Despesas por Status</h2>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { computed } from 'vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps<{
  expenses: {
    valor: number
    paga: boolean
    vencimento: string
  }[]
}>()

const statusTotals = computed(() => {
  const now = new Date()
  let pagas = 0,
    pendentes = 0,
    vencidas = 0

  props.expenses.forEach((expense) => {
    const vencimento = new Date(expense.vencimento)

    if (expense.paga) {
      pagas += expense.valor
    } else if (vencimento > now) {
      pendentes += expense.valor
    } else {
      vencidas += expense.valor
    }
  })

  return { pagas, pendentes, vencidas }
})

const chartData = computed(() => ({
  labels: ['Pagas', 'Pendentes', 'Vencidas'],
  datasets: [
    {
      label: 'R$ por status',
      data: [statusTotals.value.pagas, statusTotals.value.pendentes, statusTotals.value.vencidas],
      backgroundColor: ['#22c55e', '#facc15', '#ef4444'],
    },
  ],
}))

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (tickValue: string | number) => {
          const num = typeof tickValue === 'number' ? tickValue : Number(tickValue)
          return `R$ ${num.toLocaleString('pt-BR')}`
        },
      },
    },
  },
}
</script>
