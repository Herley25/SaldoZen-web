import axios from 'axios'

const API_URL = 'http://localhost:8080'

export async function login(email: string, password: string) {
  const { data } = await axios.post(`${API_URL}/login`, { email, password })
  return data
}
