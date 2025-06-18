
// File: app/components/Documentos.tsx
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
  FilePlus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
} from "lucide-react"
import { mockDocumentos, getDocumentoStatusBadge } from "../utils/data"
import DocumentosModal from "./modals/documentosModal"

interface DocumentosProps {
  activeTab: string
}

export default function Documentos({  }: DocumentosProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <TabsContent value="documentos" className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Gestão de Documentos</h2>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsModalOpen(true)}>
          <FilePlus className="w-4 h-4 mr-2" />
          Registar Documento
        </Button>
      </div>

      <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-white/10">
              <TableHead className="text-blue-200">ID</TableHead>
              <TableHead className="text-blue-200">Título</TableHead>
              <TableHead className="text-blue-200">Tipo</TableHead>
              <TableHead className="text-blue-200">Data</TableHead>
              <TableHead className="text-blue-200">Estado</TableHead>
              <TableHead className="text-blue-200">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockDocumentos.map((documento) => (
              <TableRow
                key={documento.id}
                className="border-b border-white/10 hover:bg-white/5"
              >
                <TableCell className="font-medium text-white">{documento.id}</TableCell>
                <TableCell className="text-blue-200">{documento.titulo}</TableCell>
                <TableCell className="text-blue-200">{documento.tipo}</TableCell>
                <TableCell className="text-blue-200">
                  {new Date(documento.data).toLocaleDateString("pt-AO")}
                </TableCell>
                <TableCell>{getDocumentoStatusBadge(documento.estado)}</TableCell>
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

      <DocumentosModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </TabsContent>
  )
}