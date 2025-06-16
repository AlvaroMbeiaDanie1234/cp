"use client"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Plus,
  Bell,
  Settings,
  User,
  Search,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  Download,
  Upload,
  Mail,
  Phone,
  Eye,
  AlertTriangle,
  HelpCircle,
  LogOut,
} from "lucide-react"

export default function UserDashboard() {
  const [time, setTime] = useState(new Date())

  // Atualizar hora a cada segundo
  useState(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  })

  // Dados do usuário (simulados)
  const userData = {
    nome: "Josefina Manuel",
    bilhete: "123456789",
    orgao: "Direção De Telecomunicações E Tecnologias De Informação",
    cargo: "Chefe de Secção",
    email: "josefina.manuel@pna.gov.ao",
    telefone: "+244 923 178 108",
    foto: "/placeholder.svg?height=80&width=80",
  }

  // Providências do usuário
  const minhasProvidencias = [
    {
      id: "PNA-2024-001",
      titulo: "Solicitação de Equipamento",
      valor: "150.000,00 Kz",
      status: "pendente",
      data: "2024-03-20",
      prioridade: "alta",
    },
    {
      id: "PNA-2024-002",
      titulo: "Reembolso de Despesas",
      valor: "45.000,00 Kz",
      status: "aceite",
      data: "2024-03-15",
      prioridade: "media",
    },
    {
      id: "PNA-2024-003",
      titulo: "Material de Escritório",
      valor: "25.000,00 Kz",
      status: "rejeitado",
      data: "2024-03-10",
      prioridade: "baixa",
    },
  ]

  const notificacoes = [
    {
      id: 1,
      titulo: "Providência Aprovada",
      descricao: "Sua solicitação PNA-2024-002 foi aprovada",
      tempo: "há 2h",
      tipo: "sucesso",
    },
    {
      id: 2,
      titulo: "Documento Pendente",
      descricao: "Anexe comprovante para PNA-2024-001",
      tempo: "há 1 dia",
      tipo: "aviso",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
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
            Aprovado
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

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case "alta":
        return "border-l-red-500"
      case "media":
        return "border-l-yellow-500"
      case "baixa":
        return "border-l-green-500"
      default:
        return "border-l-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-[#041B4E] flex flex-col">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');
      `}</style>

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/bg.jpeg" alt="Fundo" fill className="object-cover opacity-30 blur-sm" quality={50} />
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
                    <h1 className="text-white font-bold text-xl">Meu Portal</h1>
                    <p className="text-blue-200 text-sm">Cofre de Providências</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right text-white">
                  <div className="text-lg font-semibold">
                    {time.toLocaleTimeString("pt-AO", { hour: "2-digit", minute: "2-digit" })}
                  </div>
                  <div className="text-sm text-blue-200">
                    {time.toLocaleDateString("pt-AO", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    })}
                  </div>
                </div>
                <div className="relative">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                    <Bell className="w-5 h-5" />
                  </Button>
                  {notificacoes.length > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-bold">{notificacoes.length}</span>
                    </div>
                  )}
                </div>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  <LogOut className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="container mx-auto max-w-7xl">
            {/* Profile Section */}
            <div className="mb-8">
              <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white/20">
                        <Image
                            property="foto"
                          src={userData.foto || "/placeholder.svg"}
                          alt="Foto do usuário"
                          className="w-full h-full object-cover bg-gradient-to-br from-blue-400 to-blue-600"
                        />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-white mb-1">{userData.nome}</h2>
                        <p className="text-blue-200 text-lg mb-2">{userData.cargo}</p>
                        <p className="text-blue-300 text-sm">{userData.orgao}</p>
                        <div className="flex items-center gap-4 mt-3 text-sm text-blue-300">
                          <span className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {userData.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {userData.telefone}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30 mb-2">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Ativo
                      </Badge>
                      <p className="text-blue-200 text-sm">Bilhete: {userData.bilhete}</p>
                      <p className="text-blue-300 text-xs mt-1">Último acesso: Hoje, 09:30</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-200 text-sm font-medium">Minhas Providências</p>
                      <p className="text-3xl font-bold text-white">{minhasProvidencias.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <FileText className="w-6 h-6 text-blue-300" />
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-blue-300">Total de solicitações</div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-200 text-sm font-medium">Pendentes</p>
                      <p className="text-3xl font-bold text-yellow-300">
                        {minhasProvidencias.filter((p) => p.status === "pendente").length}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-yellow-300" />
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-yellow-300">Aguardando análise</div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-200 text-sm font-medium">Aprovadas</p>
                      <p className="text-3xl font-bold text-green-300">
                        {minhasProvidencias.filter((p) => p.status === "aceite").length}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-300" />
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-green-300">Solicitações aceitas</div>
                </CardContent>
              </Card>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Quick Actions */}
              <div className="lg:col-span-1 space-y-6">
                {/* Quick Actions */}
                <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Plus className="w-5 h-5" />
                      Ações Rápidas
                    </h3>
                    <div className="space-y-3">
                      <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white">
                        <Plus className="w-4 h-4 mr-3" />
                        Nova Providência
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-white/5 border-white/20 text-white hover:bg-white/10"
                      >
                        <Search className="w-4 h-4 mr-3" />
                        Consultar Status
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-white/5 border-white/20 text-white hover:bg-white/10"
                      >
                        <Upload className="w-4 h-4 mr-3" />
                        Enviar Documento
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-white/5 border-white/20 text-white hover:bg-white/10"
                      >
                        <HelpCircle className="w-4 h-4 mr-3" />
                        Ajuda & Suporte
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Notifications */}
                <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Bell className="w-5 h-5" />
                      Notificações
                    </h3>
                    <div className="space-y-3">
                      {notificacoes.map((notif) => (
                        <div key={notif.id} className="p-3 bg-white/5 rounded-lg border-l-4 border-l-blue-500">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-white font-medium text-sm">{notif.titulo}</p>
                              <p className="text-blue-200 text-xs mt-1">{notif.descricao}</p>
                            </div>
                            <span className="text-blue-300 text-xs">{notif.tempo}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - My Providências */}
              <div className="lg:col-span-2">
                <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Minhas Providências
                      </h3>
                      <Button variant="ghost" size="sm" className="text-blue-200 hover:text-white">
                        Ver Todas
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {minhasProvidencias.map((providencia) => (
                        <div
                          key={providencia.id}
                          className={`p-4 bg-white/5 rounded-lg border-l-4 ${getPrioridadeColor(
                            providencia.prioridade,
                          )} hover:bg-white/10 transition-all duration-200`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <h4 className="text-white font-medium">{providencia.titulo}</h4>
                              {getStatusBadge(providencia.status)}
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="text-blue-200 hover:text-white p-1">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-blue-200 hover:text-white p-1">
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-4 text-blue-200">
                              <span>ID: {providencia.id}</span>
                              <span>Valor: {providencia.valor}</span>
                            </div>
                            <span className="text-blue-300">
                              {new Date(providencia.data).toLocaleDateString("pt-AO")}
                            </span>
                          </div>

                          {providencia.status === "pendente" && (
                            <div className="mt-3 p-2 bg-yellow-500/10 rounded border border-yellow-500/20">
                              <div className="flex items-center gap-2 text-yellow-300 text-xs">
                                <AlertTriangle className="w-3 h-3" />
                                <span>Aguardando análise da administração</span>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>

        {/* Footer Apps */}
        <footer className="bg-black/20 backdrop-blur-md border-t border-white/10 p-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white"
                title="Minhas Providências"
              >
                <FileText className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white"
                title="Nova Solicitação"
              >
                <Plus className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white"
                title="Buscar"
              >
                <Search className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white"
                title="Perfil"
              >
                <User className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white"
                title="Configurações"
              >
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
