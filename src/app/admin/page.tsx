"use client"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  BarChart3,
  Users,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  Settings,
  Bell,
  DollarSign,
  Building2,
  AlertTriangle,
  Activity,
  PieChart,
  ArrowUpRight,
  Shield,
} from "lucide-react"

interface Providencia {
  id: string
  nome: string
  numeroBilhete: string
  orgao: string
  dataSolicitacao: string
  quantia: string
  estado: "pendente" | "aceite" | "rejeitado"
  prioridade: "baixa" | "media" | "alta"
}

interface Usuario {
  id: string
  nome: string
  email: string
  orgao: string
  cargo: string
  status: "ativo" | "inativo"
  ultimoAcesso: string
}

const mockProvidencias: Providencia[] = [
  // Dados mock mantidos sem alterações
  {
    id: "1",
    nome: "João Manuel Silva Santos",
    numeroBilhete: "123456789",
    orgao: "Direção Nacional de Investigação Criminal",
    dataSolicitacao: "2024-03-20",
    quantia: "150.000,00 Kz",
    estado: "pendente",
    prioridade: "alta",
  },
  {
    id: "2",
    nome: "Maria Fernanda Costa",
    numeroBilhete: "987654321",
    orgao: "Comando Provincial de Luanda",
    dataSolicitacao: "2024-03-19",
    quantia: "75.000,00 Kz",
    estado: "aceite",
    prioridade: "media",
  },
  {
    id: "3",
    nome: "Carlos Alberto Mendes",
    numeroBilhete: "456789123",
    orgao: "Direção de Recursos Humanos",
    dataSolicitacao: "2024-03-18",
    quantia: "200.000,00 Kz",
    estado: "rejeitado",
    prioridade: "baixa",
  },
  {
    id: "4",
    nome: "Ana Paula Rodrigues",
    numeroBilhete: "789123456",
    orgao: "Comando Provincial de Benguela",
    dataSolicitacao: "2024-03-17",
    quantia: "120.000,00 Kz",
    estado: "pendente",
    prioridade: "media",
  },
  {
    id: "5",
    nome: "Pedro Miguel Santos",
    numeroBilhete: "321654987",
    orgao: "Direção de Logística",
    dataSolicitacao: "2024-03-16",
    quantia: "90.000,00 Kz",
    estado: "aceite",
    prioridade: "alta",
  },
]

const mockUsuarios: Usuario[] = [
  // Dados mock mantidos sem alterações
  {
    id: "1",
    nome: "Administrador Geral",
    email: "admin@pna.gov.ao",
    orgao: "Gabinete do Comandante Geral",
    cargo: "Administrador",
    status: "ativo",
    ultimoAcesso: "2024-03-20T10:30:00Z",
  },
  {
    id: "2",
    nome: "Supervisor Regional",
    email: "supervisor@pna.gov.ao",
    orgao: "Comando Provincial de Luanda",
    cargo: "Supervisor",
    status: "ativo",
    ultimoAcesso: "2024-03-20T09:15:00Z",
  },
  {
    id: "3",
    nome: "Operador Sistema",
    email: "operador@pna.gov.ao",
    orgao: "Direção de Recursos Humanos",
    cargo: "Operador",
    status: "inativo",
    ultimoAcesso: "2024-03-18T14:20:00Z",
  },
]

export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")

  const stats = {
    totalProvidencias: 1247,
    pendentes: 89,
    aceites: 1098,
    rejeitadas: 60,
    valorTotal: "45.890.000,00 Kz",
    crescimentoMensal: 12.5,
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "pendente":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
            <Clock className="w-3 h-3 mr-1" />
            Pendente
          </Badge>
        )
      case "aceite":
        return (
          <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
            <CheckCircle className="w-3 h-3 mr-1" />
            Aceite
          </Badge>
        )
      case "rejeitado":
        return (
          <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
            <XCircle className="w-3 h-3 mr-1" />
            Rejeitado
          </Badge>
        )
      default:
        return null
    }
  }

  const getPrioridadeBadge = (prioridade: string) => {
    switch (prioridade) {
      case "alta":
        return <Badge className="bg-red-500/20 text-red-300 border-red-500/30">Alta</Badge>
      case "media":
        return <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">Média</Badge>
      case "baixa":
        return <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Baixa</Badge>
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    return status === "ativo" ? (
      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Ativo</Badge>
    ) : (
      <Badge className="bg-gray-500/20 text-gray-300 border-gray-500/30">Inativo</Badge>
    )
  }

  const filteredProvidencias = mockProvidencias.filter((item) => {
    const matchesSearch =
      item.nome.toLowerCase().includes(searchTerm.toLowerCase()) || item.numeroBilhete.includes(searchTerm)
    const matchesStatus = statusFilter === "todos" || item.estado === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-[#041B4E] flex flex-col">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');
      `}</style>

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bg.jpeg"
          alt="Fundo"
          fill
          className="object-cover opacity-30 blur-sm"
          quality={50}
        />
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        {/* Header */}
        <header className="bg-black/20 backdrop-blur-md border-b border-white/10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-white font-bold text-xl">Painel Administrativo</h1>
                    <p className="text-blue-200 text-sm">Cofre de Providências - PNA</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  <Bell className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  <Settings className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/10 backdrop-blur-md border-white/20">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <BarChart3 className="w-4 h-4 mr-2" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger
                value="providencias"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <FileText className="w-4 h-4 mr-2" />
                Providências
              </TabsTrigger>
              <TabsTrigger value="usuarios" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <Users className="w-4 h-4 mr-2" />
                Usuários
              </TabsTrigger>
              <TabsTrigger value="relatorios" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <PieChart className="w-4 h-4 mr-2" />
                Relatórios
              </TabsTrigger>
            </TabsList>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-200 text-sm font-medium">Total de Providências</p>
                        <p className="text-3xl font-bold text-white">{stats.totalProvidencias.toLocaleString()}</p>
                      </div>
                      <div className="p-3 bg-blue-500/20 rounded-full">
                        <FileText className="w-6 h-6 text-blue-300" />
                      </div>
                    </div>
                    <div className="flex items-center mt-4 text-sm">
                      <ArrowUpRight className="w-4 h-4 text-green-300 mr-1" />
                      <span className="text-green-300 font-medium">+{stats.crescimentoMensal}%</span>
                      <span className="text-blue-300 ml-1">este mês</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-200 text-sm font-medium">Pendentes</p>
                        <p className="text-3xl font-bold text-yellow-300">{stats.pendentes}</p>
                      </div>
                      <div className="p-3 bg-yellow-500/20 rounded-full">
                        <Clock className="w-6 h-6 text-yellow-300" />
                      </div>
                    </div>
                    <div className="flex items-center mt-4 text-sm">
                      <AlertTriangle className="w-4 h-4 text-yellow-300 mr-1" />
                      <span className="text-yellow-300 font-medium">Requer atenção</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-200 text-sm font-medium">Aceites</p>
                        <p className="text-3xl font-bold text-green-300">{stats.aceites.toLocaleString()}</p>
                      </div>
                      <div className="p-3 bg-green-500/20 rounded-full">
                        <CheckCircle className="w-6 h-6 text-green-300" />
                      </div>
                    </div>
                    <div className="flex items-center mt-4 text-sm">
                      <ArrowUpRight className="w-4 h-4 text-green-300 mr-1" />
                      <span className="text-green-300 font-medium">88% aprovação</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-200 text-sm font-medium">Valor Total</p>
                        <p className="text-2xl font-bold text-blue-300">{stats.valorTotal}</p>
                      </div>
                      <div className="p-3 bg-blue-500/20 rounded-full">
                        <DollarSign className="w-6 h-6 text-blue-300" />
                      </div>
                    </div>
                    <div className="flex items-center mt-4 text-sm">
                      <TrendingUp className="w-4 h-4 text-blue-300 mr-1" />
                      <span className="text-blue-300 font-medium">Crescimento estável</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Activity className="w-5 h-5 text-blue-300" />
                      Atividade Recente
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockProvidencias.slice(0, 5).map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <div>
                              <p className="font-medium text-sm text-white">{item.nome}</p>
                              <p className="text-xs text-blue-200">{item.orgao}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            {getEstadoBadge(item.estado)}
                            <p className="text-xs text-blue-200 mt-1">{item.quantia}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Building2 className="w-5 h-5 text-blue-300" />
                      Por Órgão
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-blue-200">Direção Nacional de Investigação Criminal</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-white/10 rounded-full">
                            <div className="w-16 h-2 bg-blue-500 rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium text-white">80%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-blue-200">Comando Provincial de Luanda</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-white/10 rounded-full">
                            <div className="w-12 h-2 bg-green-500 rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium text-white">60%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-blue-200">Direção de Recursos Humanos</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-white/10 rounded-full">
                            <div className="w-8 h-2 bg-yellow-500 rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium text-white">40%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-blue-200">Comando Provincial de Benguela</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-white/10 rounded-full">
                            <div className="w-6 h-2 bg-purple-500 rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium text-white">30%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Providências Tab */}
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
                  <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtros
                  </Button>
                  <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
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
                      <TableRow key={item.id} className="border-b border-white/10 hover:bg-white/5">
                        <TableCell className="font-medium text-white">{item.nome}</TableCell>
                        <TableCell className="text-blue-200">{item.numeroBilhete}</TableCell>
                        <TableCell className="max-w-48 truncate text-blue-200">{item.orgao}</TableCell>
                        <TableCell className="text-blue-200">{new Date(item.dataSolicitacao).toLocaleDateString("pt-AO")}</TableCell>
                        <TableCell className="font-medium text-white">{item.quantia}</TableCell>
                        <TableCell>{getPrioridadeBadge(item.prioridade)}</TableCell>
                        <TableCell>{getEstadoBadge(item.estado)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-blue-200 hover:text-white">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-white/10 backdrop-blur-md border-white/20 text-white">
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

            {/* Usuários Tab */}
            <TabsContent value="usuarios" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Gestão de Usuários</h2>
                <Button className="bg-blue-600 hover:bg-blue-700">
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
                      <TableRow key={usuario.id} className="border-b border-white/10 hover:bg-white/5">
                        <TableCell className="font-medium text-white">{usuario.nome}</TableCell>
                        <TableCell className="text-blue-200">{usuario.email}</TableCell>
                        <TableCell className="max-w-48 truncate text-blue-200">{usuario.orgao}</TableCell>
                        <TableCell className="text-blue-200">{usuario.cargo}</TableCell>
                        <TableCell>{getStatusBadge(usuario.status)}</TableCell>
                        <TableCell className="text-blue-200">{new Date(usuario.ultimoAcesso).toLocaleDateString("pt-AO")}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-blue-200 hover:text-white">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-white/10 backdrop-blur-md border-white/20 text-white">
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
            </TabsContent>

            {/* Relatórios Tab */}
            <TabsContent value="relatorios" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-500/20 rounded-full">
                        <BarChart3 className="w-6 h-6 text-blue-300" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Relatório Mensal</h3>
                        <p className="text-sm text-blue-200">Estatísticas do mês atual</p>
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-white/10 border-white/20 text-white hover:bg-white/20" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Gerar Relatório
                    </Button>
                  </CardContent>
                </Card>

             

                <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-purple-500/20 rounded-full">
                        <Building2 className="w-6 h-6 text-purple-300" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Por Órgão</h3>
                        <p className="text-sm text-blue-200">Desempenho por unidade</p>
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-white/10 border-white/20 text-white hover:bg-white/20" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Gerar Relatório
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}