
// File: app/modals/SocioModal.tsx
"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Upload } from "lucide-react"
import Image from "next/image"

interface SocioModalProps {
  isOpen: boolean
  onClose: () => void
}

const pnaRanks = [
  "Comissário-Geral", "Comissário", "Subcomissário", "Superintendente-Chefe", "Superintendente",
  "Intendente", "Subintendente", "Inspector-Chefe", "Inspector", "Subinspector",
  "Agente de Primeira", "Agente de Segunda", "Agente de Terceira"
]

const pnaOrgans = [
  "Comando Geral",
  "Comando Provincial de Bengo",
  "Comando Provincial de Benguela",
  "Comando Provincial de Bié",
  "Comando Provincial de Cabinda",
  "Comando Provincial de Cuando Cubango",
  "Comando Provincial de Cuanza Norte",
  "Comando Provincial de Cuanza Sul",
  "Comando Provincial de Cunene",
  "Comando Provincial de Huambo",
  "Comando Provincial de Huíla",
  "Comando Provincial de Luanda",
  "Comando Provincial de Lunda Norte",
  "Comando Provincial de Lunda Sul",
  "Comando Provincial de Malanje",
  "Comando Provincial de Moxico",
  "Comando Provincial de Namibe",
  "Comando Provincial de Uíge",
  "Comando Provincial de Zaire",
  "Direção Nacional de Investigação Criminal",
  "Direção de Recursos Humanos",
  "Direção de Logística"
]

export default function SocioModal({ isOpen, onClose }: SocioModalProps) {
  const [activeTab, setActiveTab] = useState("identificacao")
  const [formData, setFormData] = useState({
    profilePic: null as File | null,
    numeroSocio: "", contribuente: "", nome: "", patente: "", categoria: "", funcao: "",
    tituloAcademico: "", orgao: "", dataIngresso: "", tel: "", telAlt: "",
    morada: "", bairro: "", municipio: "", localidade: "", idType: "BI", idNumber: "",
    dataEmissao: "", dataNascimento: "", sexo: "M", estadoCivil: "Solteiro",
    conjugeNome: "", conjugeBi: "", conjugeEmissao: "", conjugeNascimento: "", conjugeTel: "",
    pai: "", mae: "", educacao: "Ensino Secundário"
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [preview, setPreview] = useState<string | null>(null)

  const handleChange = (value: string | File, field: string) => {
    if (value instanceof File) {
      setFormData((prev) => ({ ...prev, [field]: value }))
      setPreview(URL.createObjectURL(value))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
    setErrors((prev) => ({ ...prev, [field]: "" }))
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    if (!formData.nome.trim()) newErrors.nome = "Obrigatório"
    if (!formData.numeroSocio.trim()) newErrors.numeroSocio = "Obrigatório"
    if (!formData.idNumber.trim()) newErrors.idNumber = "Obrigatório"
    if (!formData.dataNascimento) newErrors.dataNascimento = "Obrigatório"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log("Socio registered:", formData)
      onClose()
      setFormData({
        profilePic: null, numeroSocio: "", contribuente: "", nome: "", patente: "", categoria: "", funcao: "",
        tituloAcademico: "", orgao: "", dataIngresso: "", tel: "", telAlt: "",
        morada: "", bairro: "", municipio: "", localidade: "", idType: "BI", idNumber: "",
        dataEmissao: "", dataNascimento: "", sexo: "M", estadoCivil: "Solteiro",
        conjugeNome: "", conjugeBi: "", conjugeEmissao: "", conjugeNascimento: "", conjugeTel: "",
        pai: "", mae: "", educacao: "Ensino Secundário"
      })
      setPreview(null)
      setActiveTab("identificacao")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1400px] max-h-[95vh] overflow-y-auto bg-white/10 backdrop-blur-md border-white/20 text-white">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-bold">Registar Sócio</DialogTitle>
    
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 sm:grid-cols-6 w-full mb-4 bg-white/10 backdrop-blur-md border-white/20">
              <TabsTrigger
                value="identificacao"
                className="text-blue-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white px-2 py-2 text-sm"
              >
                Identificação
              </TabsTrigger>
              <TabsTrigger
                value="dados-pessoais"
                className="text-blue-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white px-2 py-2 text-sm"
              >
                Dados Pessoais
              </TabsTrigger>
              <TabsTrigger
                value="habilitacoes"
                className="text-blue-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white px-2 py-2 text-sm"
              >
                Habilitações
              </TabsTrigger>
              <TabsTrigger
                value="filhos"
                className="text-blue-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white px-2 py-2 text-sm"
              >
                Filhos
              </TabsTrigger>
              <TabsTrigger
                value="modalidades"
                className="text-blue-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white px-2 py-2 text-sm"
              >
                Modalidades
              </TabsTrigger>
              <TabsTrigger
                value="herdeiros"
                className="text-blue-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white px-2 py-2 text-sm"
              >
                Herdeiros
              </TabsTrigger>
            </TabsList>

            <TabsContent value="identificacao" className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-200">Identificação</h3>
              <div>
                <label htmlFor="profilePic" className="text-blue-200 block">Foto de Perfil</label>
                <div className="flex items-center gap-4">
                  {preview && <Image property="img" src={preview} alt="Preview" className="w-16 h-16 rounded-full object-cover" />}
                  <Button type="button" className="bg-white/5 border-white/20 text-white border rounded-md p-2 hover:bg-blue-600 flex items-center gap-2">
                    <Upload className="w-4 h-4" /> Carregar Foto
                    <input
                      type="file"
                      id="profilePic"
                      name="profilePic"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files && handleChange(e.target.files[0], "profilePic")}
                    />
                  </Button>
                </div>
                {errors.profilePic && <span className="text-red-300 text-sm mt-1 block">{errors.profilePic}</span>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="numeroSocio" className="text-blue-200 block">Nº de Sócio</label>
                  <input
                    type="text"
                    id="numeroSocio"
                    name="numeroSocio"
                    value={formData.numeroSocio}
                    onChange={(e) => handleChange(e.target.value, "numeroSocio")}
                    placeholder="SOCXXX"
                    className="w-full p-2 bg-white/5 border-white/20 rounded-full text-white border focus:ring focus:ring-blue-500 outline-none"
                  />
                  {errors.numeroSocio && <span className="text-red-300 text-sm mt-1 block">{errors.numeroSocio}</span>}
                </div>
                <div>
                  <label htmlFor="contribuente" className="text-blue-200 block">Nº de Contribuente</label>
                  <input
                    type="text"
                    id="contribuente"
                    name="contribuente"
                    value={formData.contribuente}
                    onChange={(e) => handleChange(e.target.value, "contribuente")}
                    placeholder="123456789"
                    className="w-full p-2 bg-white/5 border-white/20 rounded-full text-white border focus:ring focus:ring-blue-500 outline-none"
                  />
                  {errors.contribuente && <span className="text-red-300 text-sm mt-1 block">{errors.contribuente}</span>}
                </div>
                <div>
                  <label htmlFor="nome" className="text-blue-200 block">Nome Completo</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={(e) => handleChange(e.target.value, "nome")}
                    placeholder="Nome completo"
                    className="w-full p-2 bg-white/5 border-white/20 rounded-full text-white border focus:ring focus:ring-blue-500 outline-none"
                  />
                  {errors.nome && <span className="text-red-300 text-sm mt-1 block">{errors.nome}</span>}
                </div>
                <div>
                  <label htmlFor="patente" className="text-blue-200 block">Patente</label>
                  <select
                    id="patente"
                    name="patente"
                    value={formData.patente}
                    onChange={(e) => handleChange(e.target.value, "patente")}
                    className="w-full p-2 bg-white/5 border-white/20 rounded-full text-white border focus:ring focus:ring-blue-500 outline-none"
                  >
                    <option value="" className="bg-white/10 text-white">Selecione</option>
                    {pnaRanks.map((rank) => (
                      <option key={rank} value={rank} className="bg-white/10 text-white">{rank}</option>
                    ))}
                  </select>
                  {errors.patente && <span className="text-red-300 text-sm mt-1 block">{errors.patente}</span>}
                </div>
                <div>
                  <label htmlFor="categoria" className="text-blue-200 block">Categoria</label>
                  <input
                    type="text"
                    id="categoria"
                    name="categoria"
                    value={formData.categoria}
                    onChange={(e) => handleChange(e.target.value, "categoria")}
                    placeholder="Categoria"
                    className="w-full p-2 bg-white/5 border-white/20 rounded-full text-white border focus:ring focus:ring-blue-500 outline-none"
                  />
                  {errors.categoria && <span className="text-red-300 text-sm mt-1 block">{errors.categoria}</span>}
                </div>
                <div>
                  <label htmlFor="funcao" className="text-blue-200 block">Função</label>
                  <input
                    type="text"
                    id="funcao"
                    name="funcao"
                    value={formData.funcao}
                    onChange={(e) => handleChange(e.target.value, "funcao")}
                    placeholder="Função"
                    className="w-full p-2 bg-white/5 border-white/20 rounded-full text-white border focus:ring focus:ring-blue-500 outline-none"
                  />
                  {errors.funcao && <span className="text-red-300 text-sm mt-1 block">{errors.funcao}</span>}
                </div>
                <div>
                  <label htmlFor="tituloAcademico" className="text-blue-200 block">Título Académico</label>
                  <input
                    type="text"
                    id="tituloAcademico"
                    name="tituloAcademico"
                    value={formData.tituloAcademico}
                    onChange={(e) => handleChange(e.target.value, "tituloAcademico")}
                    placeholder="Licenciatura, etc."
                    className="w-full p-2 bg-white/5 border-white/20 rounded-full text-white border focus:ring focus:ring-blue-500 outline-none"
                  />
                  {errors.tituloAcademico && <span className="text-red-300 text-sm mt-1 block">{errors.tituloAcademico}</span>}
                </div>
                <div>
                  <label htmlFor="orgao" className="text-blue-200 block">Órgão</label>
                  <select
                    id="orgao"
                    name="orgao"
                    value={formData.orgao}
                    onChange={(e) => handleChange(e.target.value, "orgao")}
                    className="w-full p-2 bg-white/5 border-white/20 rounded-full text-white border focus:ring focus:ring-blue-500 outline-none"
                  >
                    <option value="" className="bg-white/10 text-white">Selecione</option>
                    {pnaOrgans.map((organ) => (
                      <option key={organ} value={organ} className="bg-white/10 text-white">{organ}</option>
                    ))}
                  </select>
                  {errors.orgao && <span className="text-red-300 text-sm mt-1 block">{errors.orgao}</span>}
                </div>
                <div>
                  <label htmlFor="dataIngresso" className="text-blue-200 block">Data de Ingresso na PNA</label>
                  <input
                    type="date"
                    id="dataIngresso"
                    name="dataIngresso"
                    value={formData.dataIngresso}
                    onChange={(e) => handleChange(e.target.value, "dataIngresso")}
                    className="w-full p-2 bg-white/5 border-white/20 rounded-full text-white border focus:ring focus:ring-blue-500 outline-none"
                  />
                  {errors.dataIngresso && <span className="text-red-300 text-sm mt-1 block">{errors.dataIngresso}</span>}
                </div>
                <div>
                  <label htmlFor="tel" className="text-blue-200 block">Tel Celular</label>
                  <input
                    type="text"
                    id="tel"
                    name="tel"
                    value={formData.tel}
                    onChange={(e) => handleChange(e.target.value, "tel")}
                    placeholder="+244 9XX XXX XXX"
                    className="w-full p-2 bg-white/5 border-white/20 rounded-full text-white border focus:ring focus:ring-blue-500 outline-none"
                  />
                  {errors.tel && <span className="text-red-300 text-sm mt-1 block">{errors.tel}</span>}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="telAlt" className="text-blue-200 block">Outro Tel Celular</label>
                  <input
                    type="text"
                    id="telAlt"
                    name="telAlt"
                    value={formData.telAlt}
                    onChange={(e) => handleChange(e.target.value, "telAlt")}
                    placeholder="+244 9XX XXX XXX"
                    className="w-full p-2 bg-white/5 border-white/20 rounded-full text-white border focus:ring focus:ring-blue-500 outline-none"
                  />
                  {errors.telAlt && <span className="text-red-300 text-sm mt-1 block">{errors.telAlt}</span>}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="dados-pessoais" className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-200">Dados Pessoais</h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="morada" className="text-blue-200 block">Morada</label>
                  <input
                    type="text"
                    id="morada"
                    name="morada"
                    value={formData.morada}
                    onChange={(e) => handleChange(e.target.value, "morada")}
                    placeholder="Morada"
                    className="w-full p-2 bg-white/5 border-white/20 rounded-full text-white border focus:ring focus:ring-blue-500 outline-none"
                  />
                  {errors.morada && <span className="text-red-300 text-sm mt-1 block">{errors.morada}</span>}
                </div>
                <div>
                  <label htmlFor="bairro" className="text-blue-200 block">Bairro</label>
                  <input
                    type="text"
                    id="bairro"
                    name="bairro"
                    value={formData.bairro}
                    onChange={(e) => handleChange(e.target.value, "bairro")}
                    placeholder="Bairro"
                    className="w-full p-2 bg-white/5 border-white/20 rounded-full text-white border focus:ring focus:ring-blue-500 outline-none"
                  />
                  {errors.bairro && <span className="text-red-300 text-sm mt-1 block">{errors.bairro}</span>}
                </div>
                <div>
                  <label htmlFor="municipio" className="text-blue-200 block">Município</label>
                  <input
                    type="text"
                    id="municipio"
                    name="municipio"
                    value={formData.municipio}
                    onChange={(e) => handleChange(e.target.value, "municipio")}
                    placeholder="Município"
                    className="w-full p-2 bg-white/5 border-white/20 rounded-full text-white border focus:ring focus:ring-blue-500 outline-none"
                  />
                  {errors.municipio && <span className="text-red-300 text-sm mt-1 block">{errors.municipio}</span>}
                </div>
                <div>
                  <label htmlFor="localidade" className="text-blue-200 block">Localidade</label>
                  <input
                    type="text"
                    id="localidade"
                    name="localidade"
                    value={formData.localidade}
                    onChange={(e) => handleChange(e.target.value, "localidade")}
                    placeholder="Localidade"
                    className="w-full p-2 bg-white/5 border-white/20 rounded-full text-white border focus:ring focus:ring-blue-500 outline-none"
                  />
                  {errors.localidade && <span className="text-red-300 text-sm mt-1 block">{errors.localidade}</span>}
                </div>
                <div>
                  <label htmlFor="idType" className="text-blue-200 block">Tipo de ID</label>
                  <select
                    id="idType"
                    name="idType"
                    value={formData.idType}
                    onChange={(e) => handleChange(e.target.value, "idType")}
                    className="w-full p-2 bg-white/5 border-white/20 rounded-full text-white border focus:ring focus:ring-blue-500 outline-none"
                  >
                    <option value="BI" className="bg-white/10 text-white">BI</option>
                    <option value="Passaporte" className="bg-white/10 text-white">Passaporte</option>
                    <option value="Outros" className="bg-white/10 text-white">Outros</option>
                  </select>
                  {errors.idType && <span className="text-red-300 text-sm mt-1 block">{errors.idType}</span>}
                </div>
                <div>
                  <label htmlFor="idNumber" className="text-blue-200 block">Nº do ID</label>
                  <input
                    type="text"
                    id="idNumber"
                    name="idNumber"
                    value={formData.idNumber}
                    onChange={(e) => handleChange(e.target.value, "idNumber")}
                    placeholder="Número do ID"
                    className="w-full p-2 bg-white/5 border-white/20 rounded-full text-white border focus:ring focus:ring-blue-500 outline-none"
                  />
                  {errors.idNumber && <span className="text-red-300 text-sm mt-1 block">{errors.idNumber}</span>}
                </div>
                <div>
                  <label htmlFor="dataEmissao" className="text-blue-200 block">Data de Emissão</label>
                  <input
                    type="date"
                    id="dataEmissao"
                    name="dataEmissao"
                    value={formData.dataEmissao}
                    onChange={(e) => handleChange(e.target.value, "dataEmissao")}
                    className="w-full p-2 bg-white/5 border-white/20 rounded-full text-white border focus:ring focus:ring-blue-500 outline-none"
                  />
                  {errors.dataEmissao && <span className="text-red-300 text-sm mt-1 block">{errors.dataEmissao}</span>}
                </div>
                <div>
                  <label htmlFor="dataNascimento" className="text-blue-200 block">Data de Nascimento</label>
                  <input
                    type="date"
                    id="dataNascimento"
                    name="dataNascimento"
                    value={formData.dataNascimento}
                    onChange={(e) => handleChange(e.target.value, "dataNascimento")}
                    className="w-full p-2 bg-white/5 border-white/20 rounded-full text-white border focus:ring focus:ring-blue-500 outline-none"
                  />
                  {errors.dataNascimento && <span className="text-red-300 text-sm mt-1 block">{errors.dataNascimento}</span>}
                </div>
                <div>
                  <label htmlFor="sexo" className="text-blue-200 block">Sexo</label>
                  <select
                    id="sexo"
                    name="sexo"
                    value={formData.sexo}
                    onChange={(e) => handleChange(e.target.value, "sexo")}
                    className="w-full p-2 bg-white/5 border-white/20 rounded-full text-white border focus:ring focus:ring-blue-500 outline-none"
                  >
                    <option value="M" className="bg-white/10 text-white">Masculino</option>
                    <option value="F" className="bg-white/10 text-white">Feminino</option>
                  </select>
                  {errors.sexo && <span className="text-red-300 text-sm mt-1 block">{errors.sexo}</span>}
                </div>
                <div className="sm:col-span-3">
                  <label htmlFor="estadoCivil" className="text-blue-200 block">Estado Civil</label>
                  <select
                    id="estadoCivil"
                    name="estadoCivil"
                    value={formData.estadoCivil}
                    onChange={(e) => handleChange(e.target.value, "estadoCivil")}
                    className="w-full p-2 bg-white/5 border-white/20 rounded-full text-white border focus:ring focus:ring-blue-500 outline-none"
                  >
                    <option value="Solteiro" className="bg-white/10 text-white">Solteiro</option>
                    <option value="Casado" className="bg-white/10 text-white">Casado</option>
                    <option value="Divorciado" className="bg-white/10 text-white">Divorciado</option>
                  </select>
                  {errors.estadoCivil && <span className="text-red-300 text-sm mt-1 block">{errors.estadoCivil}</span>}
                </div>
                <div>
                  <label htmlFor="conjugeNome" className="text-blue-200 block">Nome do Cônjuge</label>
                  <input
                    type="text"
                    id="conjugeNome"
                    name="conjugeNome"
                    value={formData.conjugeNome}
                    onChange={(e) => handleChange(e.target.value, "conjugeNome")}
                    placeholder="Nome do cônjuge"
                    className="w-full p-2 bg-white/5 border-white/20 rounded-full text-white border focus:ring focus:ring-blue-500 outline-none"
                  />
                  {errors.conjugeNome && <span className="text-red-300 text-sm mt-1 block">{errors.conjugeNome}</span>}
                </div>
                <div>
                  <label htmlFor="conjugeBi" className="text-blue-200 block">Nº do BI do Cônjuge</label>
                  <input
                    type="text"
                    id="conjugeBi"
                    name="conjugeBi"
                    value={formData.conjugeBi}
                    onChange={(e) => handleChange(e.target.value, "conjugeBi")}
                    placeholder="Número do BI"
                    className="w-full p-2 bg-white/5 border-white/20 rounded-full text-white border focus:ring focus:ring-blue-500 outline-none"
                  />
                  {errors.conjugeBi && <span className="text-red-300 text-sm mt-1 block">{errors.conjugeBi}</span>}
                </div>
                <div>
                  <label htmlFor="conjugeEmissao" className="text-blue-200 block">Data de Emissão</label>
                  <input
                    type="date"
                    id="conjugeEmissao"
                    name="conjugeEmissao"
                    value={formData.conjugeEmissao}
                    onChange={(e) => handleChange(e.target.value, "conjugeEmissao")}
                    className="w-full p-2 bg-white/5 border-white/20 rounded-full text-white border focus:ring focus:ring-blue-500 outline-none"
                  />
                  {errors.conjugeEmissao && <span className="text-red-300 text-sm mt-1 block">{errors.conjugeEmissao}</span>}
                </div>
                <div>
                  <label htmlFor="conjugeNascimento" className="text-blue-200 block">Data de Nascimento</label>
                  <input
                    type="date"
                    id="conjugeNascimento"
                    name="conjugeNascimento"
                    value={formData.conjugeNascimento}
                    onChange={(e) => handleChange(e.target.value, "conjugeNascimento")}
                    className="w-full p-2 bg-white/5 border-white/20 rounded-full text-white border focus:ring focus:ring-blue-500 outline-none"
                  />
                  {errors.conjugeNascimento && <span className="text-red-300 text-sm mt-1 block">{errors.conjugeNascimento}</span>}
                </div>
                <div>
                  <label htmlFor="conjugeTel" className="text-blue-200 block">Telefone do Cônjuge</label>
                  <input
                    type="text"
                    id="conjugeTel"
                    name="conjugeTel"
                    value={formData.conjugeTel}
                    onChange={(e) => handleChange(e.target.value, "conjugeTel")}
                    placeholder="+244 9XX XXX XXX"
                    className="w-full p-2 bg-white/5 border-white/20 rounded-full text-white border focus:ring focus:ring-blue-500 outline-none"
                  />
                  {errors.conjugeTel && <span className="text-red-300 text-sm mt-1 block">{errors.conjugeTel}</span>}
                </div>
                <div>
                  <label htmlFor="pai" className="text-blue-200 block">Nome do Pai</label>
                  <input
                    type="text"
                    id="pai"
                    name="pai"
                    value={formData.pai}
                    onChange={(e) => handleChange(e.target.value, "pai")}
                    placeholder="Nome do pai"
                    className="w-full p-2 bg-white/5 border-white/20 rounded-full text-white border focus:ring focus:ring-blue-500 outline-none"
                  />
                  {errors.pai && <span className="text-red-300 text-sm mt-1 block">{errors.pai}</span>}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="mae" className="text-blue-200 block">Nome da Mãe</label>
                  <input
                    type="text"
                    id="mae"
                    name="mae"
                    value={formData.mae}
                    onChange={(e) => handleChange(e.target.value, "mae")}
                    placeholder="Nome da mãe"
                    className="w-full p-2 bg-white/5 border-white/20 rounded-full text-white border focus:ring focus:ring-blue-500 outline-none"
                  />
                  {errors.mae && <span className="text-red-300 text-sm mt-1 block">{errors.mae}</span>}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="habilitacoes" className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-200">Habilitações Literárias</h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="educacao" className="text-blue-200 block">Nível de Educação</label>
                  <select
                    id="educacao"
                    name="educacao"
                    value={formData.educacao}
                    onChange={(e) => handleChange(e.target.value, "educacao")}
                    className="w-full p-2 bg-white/5 border-white/20 rounded-full text-white border focus:ring focus:ring-blue-500 outline-none"
                  >
                    <option value="Ensino Secundário" className="bg-white/10 text-white">Ensino Secundário</option>
                    <option value="Curso Médio" className="bg-white/10 text-white">Curso Médio</option>
                    <option value="Curso Superior" className="bg-white/10 text-white">Curso Superior</option>
                  </select>
                  {errors.educacao && <span className="text-red-300 text-sm mt-1 block">{errors.educacao}</span>}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="filhos" className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-200">Filhos</h3>
              <p className="text-blue-200">Nenhum campo disponível para esta seção.</p>
            </TabsContent>

            <TabsContent value="modalidades" className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-200">Modalidades</h3>
              <p className="text-blue-200">Nenhum campo disponível para esta seção.</p>
            </TabsContent>

            <TabsContent value="herdeiros" className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-200">Herdeiros</h3>
              <p className="text-blue-200">Nenhum campo disponível para esta seção.</p>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Registar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}