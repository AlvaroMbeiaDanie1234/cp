import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Upload } from 'lucide-react'
import Image from 'next/image'
import { noticiaService } from '../services/noticiaService'

interface Noticia {
  id: number
  imagem: string
  titulo: string
  conteudo: string
  categoria: 'normal' | 'destaque'
  user_id: number
  created_at: string
}

interface NoticiaModalProps {
  isOpen: boolean
  onClose: () => void
  noticia: Noticia | null
}

export default function NoticiaModal({ isOpen, onClose, noticia }: NoticiaModalProps) {
  const [formData, setFormData] = useState({
    imagem: undefined as File | string | undefined,
    titulo: '',
    conteudo: '',
    categoria: 'destaque' as 'normal' | 'destaque',
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [preview, setPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (noticia) {
      setFormData({
        imagem: undefined,
        titulo: noticia.titulo || '',
        conteudo: noticia.conteudo || '',
        categoria: noticia.categoria || 'destaque',
      })
      setPreview(noticia.imagem || null)
    } else {
      setFormData({
        imagem: undefined,
        titulo: '',
        conteudo: '',
        categoria: 'destaque',
      })
      setPreview(null)
    }
  }, [noticia])

  const handleChange = (value: string | File, field: string) => {
    if (value instanceof File) {
      setFormData((prev) => ({ ...prev, [field]: value }))
      setPreview(URL.createObjectURL(value))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
      if (field === 'imagem') {
        setPreview(value || null)
      }
    }
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    if (!formData.titulo.trim()) newErrors.titulo = 'Obrigatório'
    if (!formData.conteudo.trim()) newErrors.conteudo = 'Obrigatório'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      const data = {
        imagem: formData.imagem,
        titulo: formData.titulo,
        conteudo: formData.conteudo,
        categoria: formData.categoria,
      }

      if (noticia) {
        await noticiaService.updateNoticia(noticia.id, data)
      } else {
        await noticiaService.createNoticia(data)
      }
      onClose()
      setFormData({
        imagem: undefined,
        titulo: '',
        conteudo: '',
        categoria: 'destaque',
      })
      setPreview(null)
    } catch (error: any) {
      setErrors({ submit: error.message || 'Falha ao salvar notícia' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto bg-white/10 backdrop-blur-md border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {noticia ? 'Editar Notícia' : 'Registar Notícia'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="imagem" className="text-blue-200 block">Imagem</label>
            <div className="flex items-center gap-4">
              {preview && (
                <Image
                  src={preview}
                  alt="Preview"
                  width={64}
                  height={64}
                  className="rounded object-cover"
                />
              )}
              <button
                type="button"
                className="bg-white/5 border-white/20 text-white border rounded-md p-2 hover:bg-blue-600 flex items-center gap-2"
              >
                <Upload className="w-4 h-4" /> Carregar Imagem
                <input
                  type="file"
                  id="imagem"
                  name="imagem"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files && handleChange(e.target.files[0], 'imagem')}
                />
              </button>
            </div>
            {errors.imagem && <span className="text-red-300 text-sm mt-1 block">{errors.imagem}</span>}
          </div>
          <div>
            <label htmlFor="titulo" className="text-blue-200 block">Título</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={(e) => handleChange(e.target.value, 'titulo')}
              placeholder="Título da notícia"
              className="w-full p-2 bg-white/5 border-white/20 rounded-full text-white border focus:ring focus:ring-blue-500 outline-none"
            />
            {errors.titulo && <span className="text-red-300 text-sm mt-1 block">{errors.titulo}</span>}
          </div>
          <div>
            <label htmlFor="conteudo" className="text-blue-200 block">Conteúdo</label>
            <textarea
              id="conteudo"
              name="conteudo"
              value={formData.conteudo}
              onChange={(e) => handleChange(e.target.value, 'conteudo')}
              placeholder="Conteúdo da notícia"
              className="w-full p-2 bg-white/5 border-white/20 rounded-md text-white border focus:ring focus:ring-blue-500 outline-none h-32 resize-y"
            />
            {errors.conteudo && <span className="text-red-300 text-sm mt-1 block">{errors.conteudo}</span>}
          </div>
          <div>
            <label htmlFor="categoria" className="text-blue-200 block">Categoria</label>
            <select
              id="categoria"
              name="categoria"
              value={formData.categoria}
              onChange={(e) => handleChange(e.target.value, 'categoria')}
              className="w-full p-2 bg-white/5 border-white/20 rounded-full text-white border focus:ring focus:ring-blue-500 outline-none"
            >
              <option value="destaque" className="bg-white/10 text-white">Destaque</option>
              <option value="normal" className="bg-white/10 text-white">Normal</option>
            </select>
            {errors.categoria && <span className="text-red-300 text-sm mt-1 block">{errors.categoria}</span>}
          </div>
          {errors.submit && <span className="text-red-300 text-sm block">{errors.submit}</span>}
          <DialogFooter>
            <button
              type="button"
              className="text-white bg-transparent hover:bg-white/20 p-2 rounded"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Salvando...' : noticia ? 'Salvar' : 'Registar'}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}