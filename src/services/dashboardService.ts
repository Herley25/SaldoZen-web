import axios from 'axios'

const API_BASE_URL = 'https://localhost:8080'

export async function getExpensesByCategory(userId: string, month: number, year: number) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/charts/expenses-by-category/${userId}?${month}&${year}`,
      {
        params: { userId, month, year },
      },
    )
    return response.data
  } catch (error) {
    console.error('Error fetching expenses by category:', error)
    throw error
  }
}
