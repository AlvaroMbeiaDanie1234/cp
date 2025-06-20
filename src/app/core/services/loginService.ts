import axios from 'axios'

interface User {
  id: number
  full_name: string
  email: string
  role: 'utilizador' | 'admin'
}

interface LoginResponse {
  message: string
  token: string
  user: User
}

console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL); // Debug

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const loginService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await api.post('/auth/login', { email, password })
      const data = response.data as LoginResponse
      if (data.token) {
        localStorage.setItem('auth_token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
      }
      return data
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message); // Debug
      throw new Error(error.response?.data?.error || 'Login failed')
    }
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout')
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
    }
  },

  getCurrentUser(): User | null {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token')
  },

  isAdmin(): boolean {
    const user = this.getCurrentUser()
    return user?.role === 'admin'
  },
}