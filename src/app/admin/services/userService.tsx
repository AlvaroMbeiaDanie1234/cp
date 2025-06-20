import axios from 'axios'

interface User {
  id: number
  fullName: string
  email: string
  created_at: string
  role: 'utilizador' | 'operador' | 'admin'
}

interface RegisterData {
  full_name: string
  email: string
  password: string
  role: 'utilizador' | 'operador' | 'admin'
}

interface RegisterResponse {
  message: string
  user: User
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
    console.log('Token added to request headers:', token) // Debug
  }
  return config
})

export const usuarioService = {
  async getUsers(): Promise<User[]> {
    try {
      const response = await api.get('/users')
      return response.data as User[]
    } catch (error: any) {
      console.error('Error fetching users:', error.response?.data || error.message)
      throw new Error(error.response?.data?.error || 'Failed to fetch users')
    }
  },

  async register(data: RegisterData): Promise<RegisterResponse> {
    try {
      const response = await api.post('/auth/register', data)
      return response.data as RegisterResponse
    } catch (error: any) {
      console.error('Error registering user:', error.response?.data || error.message)
      throw new Error(error.response?.data?.error || 'Failed to register user')
    }
  },
}