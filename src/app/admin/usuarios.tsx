"use client"

import { useState, useEffect } from "react"
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
  UserPlus,
  MoreHorizontal,
  Eye,
  Edit,
  Settings,
  Trash2,
  AlertCircle,
} from "lucide-react"
import { loginService } from "@/app/core/services/loginService"
import UsuarioModal from "./modals/usuariosModal"
import { usuarioService } from "./services/userService"


interface User {
  id: number
  fullName: string
  email: string
  created_at: string
  role: 'utilizador' | 'operador' | 'admin'
}

interface UsuariosProps {
  activeTab: string
}

export default function Usuarios({ activeTab }: UsuariosProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [error, setError] = useState<string | null>(null)
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    const currentUser = loginService.getCurrentUser()
    setUserRole(currentUser?.role || null)
  }, [])

  const fetchUsers = async () => {
    try {
      const data = await usuarioService.getUsers()
      setUsers(data)
      setError(null)
    } catch (err: any) {
      setError(err.message)
    }
  }

  useEffect(() => {
    if (activeTab === 'usuarios' && userRole === 'admin') {
      fetchUsers()
    }
  }, [activeTab, userRole])

  if (userRole !== 'admin') {
    return (
      <TabsContent value="usuarios" className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Gestão de Usuários</h2>
        </div>
        <Card className="bg-red-500/10 backdrop-blur-md border-red-500/20 shadow-xl p-6">
          <div className="flex items-center gap-2 text-red-200">
            <AlertCircle className="w-5 h-5" />
            <p>Acesso negado: Apenas administradores podem visualizar esta página.</p>
          </div>
        </Card>
      </TabsContent>
    )
  }

  return (
    <TabsContent value="usuarios" className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Gestão de Usuários</h2>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsModalOpen(true)}>
          <UserPlus className="w-4 h-4 mr-2" />
          Novo Usuário
        </Button>
      </div>

      {error && (
        <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200">
          {error}
        </div>
      )}

      <Card className="bg-white/10 backdrop-blur-md border-blue-200/20 shadow-xl">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-blue-200/20">
              <TableHead className="text-blue-200">ID</TableHead>
              <TableHead className="text-blue-200">Nome</TableHead>
              <TableHead className="text-blue-200">Email</TableHead>
              <TableHead className="text-blue-200">Função</TableHead>
              <TableHead className="text-blue-200">Data de registo</TableHead>
              <TableHead className="text-blue-200">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((usuario) => (
              <TableRow
                key={usuario.id}
                className="border-b border-blue-200/20 hover:bg-blue-200/5"
              >
                <TableCell className="text-blue-200">{usuario.id}</TableCell>
                <TableCell className="font-medium text-white">{usuario.fullName}</TableCell>
                <TableCell className="text-blue-200">{usuario.email}</TableCell>
                <TableCell className="text-blue-200">
                  {usuario.role.charAt(0).toUpperCase() + usuario.role.slice(1)}
                </TableCell>
                <TableCell className="text-blue-200">
                  {new Date(usuario.created_at).toLocaleDateString('pt-PT', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })}</TableCell>
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
                      className="bg-white/10 backdrop-blur-md border-blue-200/20 text-white"
                    >
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Perfil
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="w-4 h-4 mr-2" />
                        Permissões
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-300">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Desativar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <UsuarioModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          fetchUsers() // Refresh user list after registration
        }}
      />
    </TabsContent>
  )
}