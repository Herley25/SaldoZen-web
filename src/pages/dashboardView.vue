<template>
  <main class="p-6 text-white bg-gradient-to-br from-indigo-700 to-purple-700 min-h-screen">
    <header class="mb-6">
      <h1 class="text-2xl font-bold">Dashboard Financeiro</h1>
      <div class="flex gap-4 mt-4">
        <select v-model="month" class="text-black rounded px-2 py-1">
          <option v-for="m in 12" :key="m" :value="m">{{ m }}</option>
        </select>
        <select v-model="year" class="text-black rounded px-2 py-1">
          <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
        </select>
        <button @click="loadData" class="bg-white text-purple-700 px-4 py-1 rounded">
          Atualizar
        </button>
      </div>
    </header>

    <section v-if="summary" class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div class="bg-white text-purple-700 p-4 rounded shadow">
        💸 Despesas: R$ {{ summary.total_despesas.toFixed(2) }}
      </div>
      <div class="bg-white text-purple-700 p-4 rounded shadow">
        ✅ Pagas: R$ {{ summary.total_pagas.toFixed(2) }}
      </div>
      <div class="bg-white text-purple-700 p-4 rounded shadow">
        ⌛ Pendentes: R$ {{ summary.pendentes.toFixed(2) }}
      </div>
      <div class="bg-white text-purple-700 p-4 rounded shadow">
        ⚠️ Vencidas: R$ {{ summary.total_vencidas.toFixed(2) }}
      </div>
      <div class="bg-white text-purple-700 p-4 rounded shadow">
        📈 Receitas: R$ {{ summary.receitas.toFixed(2) }}
      </div>
      <div class="bg-white text-purple-700 p-4 rounded shadow">
        🧮 Saldo: R$ {{ summary.saldo.toFixed(2) }}
      </div>
    </section>

    <section class="mt-10">
      <h2 class="text-xl font-semibold mb-4">Despesas do Mês</h2>
      <div class="overflow-x-auto rounded shadow bg-white">
        <table class="min-w-full text-sm text-left text-gray-700">
          <thead class="text-xs uppercase bg-purple-100 text-purple-700">
            <tr>
              <th class="px-6 py-3">Descrição</th>
              <th class="px-6 py-3">Valor (R$)</th>
              <th class="px-6 py-3">Categoria</th>
              <th class="px-6 py-3">Vencimento</th>
              <th class="px-6 py-3">Status</th>
              <th class="px-6 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="expense in expenses"
              :key="expense.user_id"
              class="border-b hover:bg-purple-50"
            >
              <td class="px-6 py-4">{{ expense.descricao }}</td>
              <td class="px-6 py-4">R$ {{ expense.valor.toFixed(2) }}</td>
              <td class="px-6 py-4">{{ expense.categoria }}</td>
              <td class="px-6 py-4">{{ new Date(expense.vencimento).toLocaleDateString() }}</td>
              <td class="px-6 py-4">
                <span
                  :class="
                    expense.paga ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'
                  "
                >
                  {{ expense.paga ? 'Paga' : 'Pendente' }}
                </span>
              </td>
              <td class="px-6 py-4 flex gap-2">
                <button class="text-blue-600 hover:underline" @click="handleEdit(expense)">
                  Editar
                </button>
                <button class="text-red-600 hover:underline" @click="handleDelete(expense.user_id)">
                  Excluir
                </button>
              </td>
            </tr>
            <tr v-if="expenses.length === 0">
              <td colspan="6" class="px-6 py-4 text-center text-gray-500">
                Nenhuma despesa encontrada.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Adicionar aqui depois: Lista de despesas e gráficos -->
  </main>

  <ExpenseModal
    :visible="showModal"
    :expense="selectedExpense"
    @close="showModal = false"
    @update="handleUpdate"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getExpenses, getMonthlySummary } from '../services/authService'
import { useAuthStore } from '@/stores/authStore'
import { deleteExpense } from '../services/authService'

const auth = useAuthStore()
interface Summary {
  total_despesas: number
  total_pagas: number
  pendentes: number
  total_vencidas: number
  receitas: number
  saldo: number
}
interface Expense {
  user_id: string
  descricao: string
  valor: number
  vencimento: string
  paga: boolean
  categoria: string
  observacoes: string
}

const summary = ref<Summary | null>(null)
const expenses = ref<Expense[]>([]) // Ajuste o tipo conforme necessário
const month = ref<number>(new Date().getMonth() + 1)
const year = ref<number>(new Date().getFullYear())
const years = Array.from({ length: 5 }, (_, i) => 2023 + i)

const showModal = ref(false)
const selectedExpense = ref<Expense | null>(null)

function handleEdit(expense: Expense) {
  selectedExpense.value = expense
  showModal.value = true
}

function handleUpdate(updated: Expense) {
  // Aqui você pode chamar o service de update
  const index = expenses.value.findIndex((e) => e.user_id === updated.user_id)
  if (index !== -1) expenses.value[index] = updated
}

async function loadData() {
  if (!auth.user) return
  summary.value = await getMonthlySummary(auth.user.id, month.value, year.value)
  expenses.value = await getExpenses(auth.user.id, month.value, year.value)
}

async function handleDelete(expenseId: string) {
  if (confirm('Deseja realmente excluir esta despesa?')) {
    await deleteExpense(auth.user!.id, expenseId)
    expenses.value = expenses.value.filter((e) => e.user_id !== expenseId)
  }
}

onMounted(loadData)
</script>
