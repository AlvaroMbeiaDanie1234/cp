'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { TabsContent } from '@/components/ui/tabs'
import { Newspaper, MoreHorizontal, Eye, Edit, Trash2 } from 'lucide-react'
import { noticiaService } from './services/noticiaService'
import NoticiaModal from './modals/noticiasModal'


interface Noticia {
  id: number
  imagem: string
  titulo: string
  conteudo: string
  categoria: 'normal' | 'destaque'
  user_id: number
  created_at: string
  user: { id: number; full_name: string; email: string }
  activeTab?: string
}

export default function Noticias() {
  const [noticias, setNoticias] = useState<Noticia[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedNoticia, setSelectedNoticia] = useState<Noticia | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNoticias = async () => {
      setIsLoading(true)
      try {
        const data = await noticiaService.getNoticias()
        setNoticias(data)
        setError(null)
      } catch (err: any) {
        setError(err.message || 'Falha ao carregar notícias')
      } finally {
        setIsLoading(false)
      }
    }
    fetchNoticias()
  }, [])

  const handleOpenModal = (noticia: Noticia | null = null) => {
    setSelectedNoticia(noticia)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedNoticia(null)
    // Refresh noticias after create/edit
    noticiaService.getNoticias().then(setNoticias).catch(() => setError('Falha ao recarregar notícias'))
  }

  const handleDelete = async (id: number) => {
    try {
      await noticiaService.deleteNoticia(id)
      setNoticias(noticias.filter((noticia) => noticia.id !== id))
    } catch (err: any) {
      setError(err.message || 'Falha ao eliminar notícia')
    }
  }

  const getNoticiaStatusBadge = (categoria: string) => {
    const styles = {
      destaque: 'bg-blue-600 text-white',
      normal: 'bg-gray-600 text-white',
    }
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          styles[categoria as keyof typeof styles] || 'bg-gray-600 text-white'
        }`}
      >
        {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
      </span>
    )
  }

  return (
    <TabsContent value="noticias" className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Gestão de Notícias</h2>
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => handleOpenModal()}
        >
          <Newspaper className="w-4 h-4 mr-2" />
          Registar Notícia
        </Button>
      </div>

      {error && <div className="text-red-300">{error}</div>}
      {isLoading ? (
        <div className="text-white">Carregando...</div>
      ) : (
        <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-white/10">
                <TableHead className="text-blue-200">ID</TableHead>
                <TableHead className="text-blue-200">Título</TableHead>
                <TableHead className="text-blue-200">Autor</TableHead>
                <TableHead className="text-blue-200">Data de Publicação</TableHead>
                <TableHead className="text-blue-200">Categoria</TableHead>
                <TableHead className="text-blue-200">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {noticias.map((noticia) => (
                <TableRow
                  key={noticia.id}
                  className="border-b border-white/10 hover:bg-white/5"
                >
                  <TableCell className="font-medium text-white">{noticia.id}</TableCell>
                  <TableCell className="text-blue-200">{noticia.titulo}</TableCell>
                  <TableCell className="text-blue-200">{noticia.user.full_name}</TableCell>
                  <TableCell className="text-blue-200">
                    {new Date(noticia.created_at).toLocaleDateString('pt-AO')}
                  </TableCell>
                  <TableCell>{getNoticiaStatusBadge(noticia.categoria)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-200 hover:text-white"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-white/10 backdrop-blur-md border-white/20 text-white"
                      >
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleOpenModal(noticia)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-300"
                          onClick={() => handleDelete(noticia.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      <NoticiaModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        noticia={selectedNoticia}
      />
    </TabsContent>
  )
}