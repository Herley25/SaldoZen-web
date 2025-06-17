<template>
  <div class="w-full max-w-3xl mx-auto">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script lang="ts" setup>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { computed } from 'vue'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

interface Props {
  title?: string
  labels: string[]
  values: number[]
}

const props = defineProps<Props>()

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: props.title || 'Resumo Mensal',
      backgroundColor: '#42A5F5',
      data: props.values,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: {
      display: !!props.title,
      text: props.title,
    },
  },
}
</script>
