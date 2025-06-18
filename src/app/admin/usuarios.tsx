
// File: components/Usuarios.tsx
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
  UserPlus,
  MoreHorizontal,
  Eye,
  Edit,
  Settings,
  Trash2,
} from "lucide-react"
import { mockUsuarios, getStatusBadge } from "../utils/data"
import UsuarioModal from "./modals/usuariosModal"

interface UsuariosProps {
  activeTab: string
}

export default function Usuarios({  }: UsuariosProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <TabsContent value="usuarios" className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Gestão de Usuários</h2>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsModalOpen(true)}>
          <UserPlus className="w-4 h-4 mr-2" />
          Novo Usuário
        </Button>
      </div>

      <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-white/10">
              <TableHead className="text-blue-200">Nome</TableHead>
              <TableHead className="text-blue-200">Email</TableHead>
              <TableHead className="text-blue-200">Órgão</TableHead>
              <TableHead className="text-blue-200">Cargo</TableHead>
              <TableHead className="text-blue-200">Status</TableHead>
              <TableHead className="text-blue-200">Último Acesso</TableHead>
              <TableHead className="text-blue-200">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockUsuarios.map((usuario) => (
              <TableRow
                key={usuario.id}
                className="border-b border-white/10 hover:bg-white/5"
              >
                <TableCell className="font-medium text-white">{usuario.nome}</TableCell>
                <TableCell className="text-blue-200">{usuario.email}</TableCell>
                <TableCell className="max-w-48 truncate text-blue-200">
                  {usuario.orgao}
                </TableCell>
                <TableCell className="text-blue-200">{usuario.cargo}</TableCell>
                <TableCell>{getStatusBadge(usuario.status)}</TableCell>
                <TableCell className="text-blue-200">
                  {new Date(usuario.ultimoAcesso).toLocaleDateString("pt-AO")}
                </TableCell>
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

      <UsuarioModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </TabsContent>
  )
}