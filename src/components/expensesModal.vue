<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white p-6 rounded-lg w-full max-w-md">
      <h2 class="text-lg font-semibold mb-4">Editar Despesa</h2>

      <form @submit.prevent="submit">
        <label class="block mb-2">
          Descrição:
          <input
            v-model="localExpense.descricao"
            class="w-full border rounded px-2 py-1 mt-1"
            required
          />
        </label>

        <label class="block mb-2">
          Valor (R$):
          <input
            v-model.number="localExpense.valor"
            type="number"
            step="0.01"
            class="w-full border rounded px-2 py-1 mt-1"
            required
          />
        </label>

        <label class="block mb-2">
          Categoria:
          <input
            v-model="localExpense.categoria"
            class="w-full border rounded px-2 py-1 mt-1"
            required
          />
        </label>

        <label class="block mb-2">
          Vencimento:
          <input
            v-model="localExpense.vencimento"
            type="date"
            class="w-full border rounded px-2 py-1 mt-1"
            required
          />
        </label>

        <label class="block mb-4">
          <input v-model="localExpense.paga" type="checkbox" class="mr-2" />
          Pago
        </label>

        <div class="flex justify-end gap-2">
          <button type="button" class="text-gray-500" @click="$emit('close')">Cancelar</button>
          <button
            type="submit"
            class="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Expense {
  descricao: string
  valor: number
  categoria: string
  vencimento: string
  paga: boolean
}

const props = withDefaults(
  defineProps<{
    visible: boolean
    expense: Expense | null
    onClose: () => void
    onUpdate: (expense: Expense) => void
  }>(),
  {
    expense: null,
  },
)

const emit = defineEmits(['close', 'update'])

const localExpense = ref({ ...props.expense })

watch(
  () => props.expense,
  (newVal) => {
    localExpense.value = { ...newVal }
  },
)

function submit() {
  emit('update', localExpense.value)
  emit('close')
}
</script>
