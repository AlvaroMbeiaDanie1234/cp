
// File: app/components/Socios.tsx
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
  Trash2,
} from "lucide-react"
import { mockSocios, getSocioStatusBadge } from "../utils/data"
import SocioModal from "./modals/socioModal"

interface SociosProps {
  activeTab: string
}

export default function Socios({  }: SociosProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <TabsContent value="socios" className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Gestão de Sócios</h2>
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setIsModalOpen(true)}
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Registar Sócio
        </Button>
      </div>

      <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-white/10">
              <TableHead className="text-blue-200">ID</TableHead>
              <TableHead className="text-blue-200">Nome</TableHead>
              <TableHead className="text-blue-200">Número de Sócio</TableHead>
              <TableHead className="text-blue-200">Data de Adesão</TableHead>
              <TableHead className="text-blue-200">Estado</TableHead>
              <TableHead className="text-blue-200">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockSocios.map((socio) => (
              <TableRow
                key={socio.id}
                className="border-b border-white/10 hover:bg-white/5"
              >
                <TableCell className="font-medium text-white">{socio.id}</TableCell>
                <TableCell className="text-blue-200">{socio.nome}</TableCell>
                <TableCell className="text-blue-200">{socio.numeroSocio}</TableCell>
                <TableCell className="text-blue-200">
                  {new Date(socio.dataAdesao).toLocaleDateString("pt-AO")}
                </TableCell>
                <TableCell>{getSocioStatusBadge(socio.estado)}</TableCell>
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
                      <DropdownMenuItem>
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

      <SocioModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </TabsContent>
  )
}
