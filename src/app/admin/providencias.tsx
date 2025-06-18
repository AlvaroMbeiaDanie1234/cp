// File: components/Providencias.tsx

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TabsContent } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Eye,
  CheckCircle,
  XCircle,
  Edit,
} from "lucide-react"
import {
  mockProvidencias,
  getEstadoBadge,
  getPrioridadeBadge,
} from "../utils/data"

interface ProvidenciasProps {
  activeTab: string
}

export default function Providencias({  }: ProvidenciasProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")

  const filteredProvidencias = mockProvidencias.filter((item) => {
    const matchesSearch =
      item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.numeroBilhete.includes(searchTerm)
    const matchesStatus = statusFilter === "todos" || item.estado === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <TabsContent value="providencias" className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-200 w-4 h-4" />
            <Input
              placeholder="Buscar por nome ou bilhete..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-blue-200"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="pendente">Pendente</SelectItem>
              <SelectItem value="aceite">Aceite</SelectItem>
              <SelectItem value="rejeitado">Rejeitado</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-white/10">
              <TableHead className="text-blue-200">Nome</TableHead>
              <TableHead className="text-blue-200">Bilhete</TableHead>
              <TableHead className="text-blue-200">Órgão</TableHead>
              <TableHead className="text-blue-200">Data</TableHead>
              <TableHead className="text-blue-200">Quantia</TableHead>
              <TableHead className="text-blue-200">Prioridade</TableHead>
              <TableHead className="text-blue-200">Estado</TableHead>
              <TableHead className="text-blue-200">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProvidencias.map((item) => (
              <TableRow
                key={item.id}
                className="border-b border-white/10 hover:bg-white/5"
              >
                <TableCell className="font-medium text-white">{item.nome}</TableCell>
                <TableCell className="text-blue-200">{item.numeroBilhete}</TableCell>
                <TableCell className="max-w-48 truncate text-blue-200">
                  {item.orgao}
                </TableCell>
                <TableCell className="text-blue-200">
                  {new Date(item.dataSolicitacao).toLocaleDateString("pt-AO")}
                </TableCell>
                <TableCell className="font-medium text-white">{item.quantia}</TableCell>
                <TableCell>{getPrioridadeBadge(item.prioridade)}</TableCell>
                <TableCell>{getEstadoBadge(item.estado)}</TableCell>
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
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Aprovar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <XCircle className="w-4 h-4 mr-2" />
                        Rejeitar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </TabsContent>
  )
}