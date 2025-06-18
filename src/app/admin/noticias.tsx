
// File: app/components/Noticias.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TabsContent } from "@/components/ui/tabs"
import {
  Newspaper,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
} from "lucide-react"
import NoticiaModal from "./modals/noticiasModal"

interface NoticiasProps {
  activeTab: string
}

interface Noticia {
  id: string
  imagem: string | null
  titulo: string
  conteudo: string
  categoria: "Destaque" | "Categoria"
  autor: string
  dataPublicacao: string
  estado: "Publicado" | "Rascunho" | "Arquivado"
}

const mockNoticias: Noticia[] = [
  {
    id: "1",
    imagem: null,
    titulo: "Nova Iniciativa de Segurança em Luanda",
    conteudo: "O Comando Provincial de Luanda lançou uma nova iniciativa...",
    categoria: "Destaque",
    autor: "João Silva",
    dataPublicacao: "2025-06-01",
    estado: "Publicado",
  },
  {
    id: "2",
    imagem: null,
    titulo: "Treinamento de Agentes em Benguela",
    conteudo: "Agentes da PNA em Benguela participaram de um treinamento intensivo...",
    categoria: "Categoria",
    autor: "Maria Santos",
    dataPublicacao: "2025-05-15",
    estado: "Rascunho",
  },
]

const getNoticiaStatusBadge = (estado: string) => {
  const styles = {
    Publicado: "bg-green-600 text-white",
    Rascunho: "bg-yellow-600 text-white",
    Arquivado: "bg-red-600 text-white",
  }
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${
        styles[estado as keyof typeof styles] || "bg-gray-600 text-white"
      }`}
    >
      {estado}
    </span>
  )
}

export default function Noticias({  }: NoticiasProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedNoticia, setSelectedNoticia] = useState<Noticia | null>(null)

  const handleOpenModal = (noticia: Noticia | null = null) => {
    setSelectedNoticia(noticia)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedNoticia(null)
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

      <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-white/10">
              <TableHead className="text-blue-200">ID</TableHead>
              <TableHead className="text-blue-200">Título</TableHead>
              <TableHead className="text-blue-200">Autor</TableHead>
              <TableHead className="text-blue-200">Data de Publicação</TableHead>
              <TableHead className="text-blue-200">Estado</TableHead>
              <TableHead className="text-blue-200">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockNoticias.map((noticia) => (
              <TableRow
                key={noticia.id}
                className="border-b border-white/10 hover:bg-white/5"
              >
                <TableCell className="font-medium text-white">{noticia.id}</TableCell>
                <TableCell className="text-blue-200">{noticia.titulo}</TableCell>
                <TableCell className="text-blue-200">{noticia.autor}</TableCell>
                <TableCell className="text-blue-200">
                  {new Date(noticia.dataPublicacao).toLocaleDateString("pt-AO")}
                </TableCell>
                <TableCell>{getNoticiaStatusBadge(noticia.estado)}</TableCell>
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
                      <DropdownMenuItem className="text-red-300">
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

      <NoticiaModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        noticia={selectedNoticia}
      />
    </TabsContent>
  )
}
