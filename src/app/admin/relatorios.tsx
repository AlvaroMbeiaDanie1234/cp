// File: components/Relatorios.tsx


"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TabsContent } from "@/components/ui/tabs"
import { BarChart3, Building2, Download } from "lucide-react"

interface RelatoriosProps {
  activeTab: string
}

export default function Relatorios({  }: RelatoriosProps) {
  return (
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
            <Button
              className="w-full mt-4 bg-white/10 border-white/20 text-white hover:bg-white/20"
              variant="outline"
            >
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
            <Button
              className="w-full mt-4 bg-white/10 border-white/20 text-white hover:bg-white/20"
              variant="outline"
            >
              <Download className="w-4 h-4 mr-2" />
              Gerar Relatório
            </Button>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  )
}