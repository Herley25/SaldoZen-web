import axios from 'axios'

const API_URL = 'http://localhost:8080'

export async function login(email: string, password: string) {
  const { data } = await axios.post(`${API_URL}/login`, { email, password })
  return data
}

export async function signup(name: string, email: string, password: string) {
  const { data } = await axios.post(`${API_URL}/users`, { name, email, password })
  return data
}

export async function getMonthlySummary(userId: string, month: number, year: number) {
  const { data } = await axios.get(`${API_URL}/users/${userId}/summary?month=${month}&year=${year}`)
  return data
}

export async function getExpenses(userId: string, month: number, year: number) {
  const { data } = await axios.get(`${API_URL}/expenses/${userId}?month=${month}&year=${year}`)
  return data
}

export async function getExpensesByCategory(userId: string, month: number, year: number) {
  const { data } = await axios.get(
    `${API_URL}/charts/expenses-by-category/${userId}?month=${month}&year=${year}`,
  )
  return data
}

export async function getIncomesByCategory(userId: string, month: number, year: number) {
  const { data } = await axios.get(
    `${API_URL}/charts/incomes-by-category/${userId}?month=${month}&year=${year}`,
  )
  return data
}

export async function deleteExpense(userId: string, expenseId: string) {
  await axios.delete(`${API_URL}/users/${userId}/expenses/${expenseId}`)
}
