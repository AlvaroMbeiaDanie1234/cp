// File: components/Dashboard.tsx

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent } from "@/components/ui/tabs"
import {
  FileText,
  Clock,
  CheckCircle,
  DollarSign,
  ArrowUpRight,
  AlertTriangle,
  TrendingUp,
  Activity,
  Building2,
} from "lucide-react"
import { mockProvidencias, getEstadoBadge } from "../utils/data"

interface DashboardProps {
  activeTab: string
}

export default function Dashboard({  }: DashboardProps) {
  const stats = {
    totalProvidencias: 0,
    pendentes: 0,
    aceites: 0,
    rejeitadas: 0,
    valorTotal: "00 Kz",
    crescimentoMensal: 12.5,
  }

  return (
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
                <span className="text-sm text-blue-200">Direcção de Telecomunicações e Técnologias de Informação</span>
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
  )
}