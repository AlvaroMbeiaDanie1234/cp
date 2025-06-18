
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, XCircle } from "lucide-react"

export interface Providencia {
  id: string
  nome: string
  numeroBilhete: string
  orgao: string
  dataSolicitacao: string
  quantia: string
  estado: "pendente" | "aceite" | "rejeitado"
  prioridade: "baixa" | "media" | "alta"
}

export interface Usuario {
  id: string
  nome: string
  email: string
  orgao: string
  cargo: string
  status: "ativo" | "inativo"
  ultimoAcesso: string
}

export interface Documento {
  id: string
  titulo: string
  tipo: string
  data: string
  estado: "rascunho" | "publicado" | "arquivado"
}

export interface Noticia {
  id: string
  titulo: string
  autor: string
  dataPublicacao: string
  estado: "rascunho" | "publicado" | "arquivado"
}

export interface Socio {
  id: string
  nome: string
  numeroSocio: string
  dataAdesao: string
  estado: "ativo" | "suspenso" | "inativo"
}

export const mockProvidencias: Providencia[] = [
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

export const mockUsuarios: Usuario[] = [
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

export const mockDocumentos: Documento[] = [
  {
    id: "1",
    titulo: "Relatório Anual 2024",
    tipo: "Relatório",
    data: "2024-03-20",
    estado: "publicado",
  },
  {
    id: "2",
    titulo: "Plano de Operações",
    tipo: "Plano",
    data: "2024-03-19",
    estado: "rascunho",
  },
  {
    id: "3",
    titulo: "Memorando Interno",
    tipo: "Memorando",
    data: "2024-03-18",
    estado: "arquivado",
  },
  {
    id: "4",
    titulo: "Política de Segurança",
    tipo: "Política",
    data: "2024-03-17",
    estado: "publicado",
  },
  {
    id: "5",
    titulo: "Orçamento Provisório",
    tipo: "Orçamento",
    data: "2024-03-16",
    estado: "rascunho",
  },
]

export const mockNoticias: Noticia[] = [
  {
    id: "1",
    titulo: "Nova Iniciativa de Segurança Pública",
    autor: "João Silva",
    dataPublicacao: "2024-03-20",
    estado: "publicado",
  },
  {
    id: "2",
    titulo: "Treinamento para Oficiais",
    autor: "Maria Costa",
    dataPublicacao: "2024-03-19",
    estado: "rascunho",
  },
  {
    id: "3",
    titulo: "Campanha de Conscientização",
    autor: "Carlos Mendes",
    dataPublicacao: "2024-03-18",
    estado: "arquivado",
  },
  {
    id: "4",
    titulo: "Parceria com Comunidade",
    autor: "Ana Rodrigues",
    dataPublicacao: "2024-03-17",
    estado: "publicado",
  },
  {
    id: "5",
    titulo: "Atualização de Protocolos",
    autor: "Pedro Santos",
    dataPublicacao: "2024-03-16",
    estado: "rascunho",
  },
]

export const mockSocios: Socio[] = [
  {
    id: "1",
    nome: "António Ferreira",
    numeroSocio: "SOC001",
    dataAdesao: "2024-03-20",
    estado: "ativo",
  },
  {
    id: "2",
    nome: "Beatriz Almeida",
    numeroSocio: "SOC002",
    dataAdesao: "2024-03-19",
    estado: "suspenso",
  },
  {
    id: "3",
    nome: "Cláudio Pereira",
    numeroSocio: "SOC003",
    dataAdesao: "2024-03-18",
    estado: "inativo",
  },
  {
    id: "4",
    nome: "Diana Costa",
    numeroSocio: "SOC004",
    dataAdesao: "2024-03-17",
    estado: "ativo",
  },
  {
    id: "5",
    nome: "Eduardo Santos",
    numeroSocio: "SOC005",
    dataAdesao: "2024-03-16",
    estado: "suspenso",
  },
]

export const getEstadoBadge = (estado: string) => {
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

export const getPrioridadeBadge = (prioridade: string) => {
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

export const getStatusBadge = (status: string) => {
  return status === "ativo" ? (
    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Ativo</Badge>
  ) : (
    <Badge className="bg-gray-500/20 text-gray-300 border-gray-500/30">Inativo</Badge>
  )
}

export const getDocumentoStatusBadge = (estado: string) => {
  switch (estado) {
    case "rascunho":
      return (
        <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
          <Clock className="w-3 h-3 mr-1" />
          Rascunho
        </Badge>
      )
    case "publicado":
      return (
        <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
          <CheckCircle className="w-3 h-3 mr-1" />
          Publicado
        </Badge>
      )
    case "arquivado":
      return (
        <Badge className="bg-gray-500/20 text-gray-300 border-gray-500/30">
          <XCircle className="w-3 h-3 mr-1" />
          Arquivado
        </Badge>
      )
    default:
      return null
  }
}

export const getNoticiaStatusBadge = (estado: string) => {
  switch (estado) {
    case "rascunho":
      return (
        <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
          <Clock className="w-3 h-3 mr-1" />
          Rascunho
        </Badge>
      )
    case "publicado":
      return (
        <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
          <CheckCircle className="w-3 h-3 mr-1" />
          Publicado
        </Badge>
      )
    case "arquivado":
      return (
        <Badge className="bg-gray-500/20 text-gray-300 border-gray-500/30">
          <XCircle className="w-3 h-3 mr-1" />
          Arquivado
        </Badge>
      )
    default:
      return null
  }
}

export const getSocioStatusBadge = (estado: string) => {
  switch (estado) {
    case "ativo":
      return (
        <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
          <CheckCircle className="w-3 h-3 mr-1" />
          Ativo
        </Badge>
      )
    case "suspenso":
      return (
        <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
          <Clock className="w-3 h-3 mr-1" />
          Suspenso
        </Badge>
      )
    case "inativo":
      return (
        <Badge className="bg-gray-500/20 text-gray-300 border-gray-500/30">
          <XCircle className="w-3 h-3 mr-1" />
          Inativo
        </Badge>
      )
    default:
      return null
  }
}
