import axios from 'axios'

interface Noticia {
  id: number
  imagem: string
  titulo: string
  conteudo: string
  categoria: 'normal' | 'destaque'
  user_id: number
  created_at: string
  user: { id: number; full_name: string; email: string }
}

interface CreateNoticiaData {
  imagem?: File | string
  titulo: string
  conteudo: string
  categoria: 'normal' | 'destaque'
}

interface UpdateNoticiaData {
  imagem?: File | string
  titulo?: string
  conteudo?: string
  categoria?: 'normal' | 'destaque'
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
  }
  console.log('Request URL:', `${config.baseURL}${config.url}`)
  return config
})

export const noticiaService = {
  async getNoticias(): Promise<Noticia[]> {
    try {
      const response = await api.get('/noticias/index')
      return response.data as Noticia[]
    } catch (error: any) {
      console.error('Error fetching noticias:', error.response?.data || error.message)
      throw new Error(error.response?.data?.error || 'Failed to fetch noticias')
    }
  },

  async createNoticia(data: CreateNoticiaData): Promise<Noticia> {
    try {
      const formData = new FormData()
      if (data.imagem instanceof File) {
        formData.append('imagem', data.imagem)
      } else if (data.imagem) {
        formData.append('imagem_url', data.imagem)
      }
      formData.append('titulo', data.titulo)
      formData.append('conteudo', data.conteudo)
      formData.append('categoria', data.categoria)

      // Log FormData for debugging
      for (const [key, value] of formData.entries()) {
        console.log('FormData:', key, value)
      }

      const response = await api.post('/noticias/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      return response.data.noticia as Noticia
    } catch (error: any) {
      console.error('Error creating noticia:', error.response?.data || error.message)
      throw new Error(error.response?.data?.error || 'Failed to create noticia')
    }
  },

  async updateNoticia(id: number, data: UpdateNoticiaData): Promise<Noticia> {
    try {
      const formData = new FormData()
      if (data.imagem instanceof File) {
        formData.append('imagem', data.imagem)
      } else if (data.imagem) {
        formData.append('imagem_url', data.imagem)
      }
      if (data.titulo) formData.append('titulo', data.titulo)
      if (data.conteudo) formData.append('conteudo', data.conteudo)
      if (data.categoria) formData.append('categoria', data.categoria)

      const response = await api.put(`/noticias/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      return response.data.noticia as Noticia
    } catch (error: any) {
      console.error('Error updating noticia:', error.response?.data || error.message)
      throw new Error(error.response?.data?.error || 'Failed to update noticia')
    }
  },

  async deleteNoticia(id: number): Promise<void> {
    try {
      await api.delete(`/noticias/${id}`)
    } catch (error: any) {
      console.error('Error deleting noticia:', error.response?.data || error.message)
      throw new Error(error.response?.data?.error || 'Failed to delete noticia')
    }
  },
}