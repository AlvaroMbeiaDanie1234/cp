
// File: app/components/Admin.tsx
"use client"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  Users,
  FileText,
  PieChart,
  Shield,
  Bell,
  Settings,
  File,
  Newspaper,
  UserPlus,
} from "lucide-react"
import Dashboard from "./dashboard"
import Providencias from "./providencias"
import Usuarios from "./usuarios"
import Documentos from "./documentos"
import Noticias from "./noticias"
import Socios from "./socio"
import Relatorios from "./relatorios"

export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard")

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
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-7 mb-8 bg-white/10 backdrop-blur-md border-white/20">
              <TabsTrigger
                value="dashboard"
                className="flex items-center justify-center data-[state=active]:bg-blue-600 data-[state=active]:text-white px-1 py-1 sm:px-2 sm:py-2"
              >
                <BarChart3 className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger
                value="providencias"
                className="flex items-center justify-center data-[state=active]:bg-blue-600 data-[state=active]:text-white px-1 py-1 sm:px-2 sm:py-2"
              >
                <FileText className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Providências</span>
              </TabsTrigger>
          
              <TabsTrigger
                value="documentos"
                className="flex items-center justify-center data-[state=active]:bg-blue-600 data-[state=active]:text-white px-1 py-1 sm:px-2 sm:py-2"
              >
                <File className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Documentos</span>
              </TabsTrigger>
              <TabsTrigger
                value="noticias"
                className="flex items-center justify-center data-[state=active]:bg-blue-600 data-[state=active]:text-white px-1 py-1 sm:px-2 sm:py-2"
              >
                <Newspaper className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Notícias</span>
              </TabsTrigger>
              <TabsTrigger
                value="socios"
                className="flex items-center justify-center data-[state=active]:bg-blue-600 data-[state=active]:text-white px-1 py-1 sm:px-2 sm:py-2"
              >
                <UserPlus className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Sócios</span>
              </TabsTrigger>
              <TabsTrigger
                value="usuarios"
                className="flex items-center justify-center data-[state=active]:bg-blue-600 data-[state=active]:text-white px-1 py-1 sm:px-2 sm:py-2"
              >
                <Users className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Usuários</span>
              </TabsTrigger>
              <TabsTrigger
                value="relatorios"
                className="flex items-center justify-center data-[state=active]:bg-blue-600 data-[state=active]:text-white px-1 py-1 sm:px-2 sm:py-2"
              >
                <PieChart className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Relatórios</span>
              </TabsTrigger>
            </TabsList>

            <Dashboard activeTab={activeTab} />
            <Providencias activeTab={activeTab} />
            <Documentos activeTab={activeTab} />
            <Noticias activeTab={activeTab} />
            <Socios activeTab={activeTab} />
            <Usuarios activeTab={activeTab} />
            <Relatorios activeTab={activeTab} />
          </Tabs>
        </div>
      </div>
    </div>
  )
}