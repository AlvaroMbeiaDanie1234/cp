
// File: components/modals/UsuarioModal.tsx
"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface UsuarioModalProps {
  isOpen: boolean
  onClose: () => void
}

const statusOptions = ["Ativo", "Inativo"]

export default function UsuarioModal({ isOpen, onClose }: UsuarioModalProps) {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    orgao: "",
    cargo: "",
    status: "Ativo",
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleChange = (value: string, field: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: "" }))
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    if (!formData.nome.trim()) newErrors.nome = "Obrigatório"
    if (!formData.email.trim()) {
      newErrors.email = "Obrigatório"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log("Usuário registered:", {
        id: `USR${Math.floor(Math.random() * 10000)}`,
        nome: formData.nome,
        email: formData.email,
        orgao: formData.orgao,
        cargo: formData.cargo,
        status: formData.status,
        ultimoAcesso: new Date().toISOString(),
      })
      onClose()
      setFormData({
        nome: "",
        email: "",
        orgao: "",
        cargo: "",
        status: "Ativo",
      })
      setErrors({})
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white/10 backdrop-blur-md border-white/20 text-white">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-bold">Novo Usuário</DialogTitle>
         
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-200">Dados do Usuário</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label htmlFor="nome" className="text-blue-200 block">Nome</label>
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
              <div className="sm:col-span-2">
                <label htmlFor="email" className="text-blue-200 block">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => handleChange(e.target.value, "email")}
                  placeholder="exemplo@dominio.com"
                  className="w-full p-2 bg-white/5 border-white/20 rounded-full text-white border focus:ring focus:ring-blue-500 outline-none"
                />
                {errors.email && <span className="text-red-300 text-sm mt-1 block">{errors.email}</span>}
              </div>
              <div>
                <label htmlFor="orgao" className="text-blue-200 block">Órgão</label>
                <input
                  type="text"
                  id="orgao"
                  name="orgao"
                  value={formData.orgao}
                  onChange={(e) => handleChange(e.target.value, "orgao")}
                  placeholder="Órgão/Departamento"
                  className="w-full p-2 bg-white/5 border-white/20 rounded-full text-white border focus:ring focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label htmlFor="cargo" className="text-blue-200 block">Cargo</label>
                <input
                  type="text"
                  id="cargo"
                  name="cargo"
                  value={formData.cargo}
                  onChange={(e) => handleChange(e.target.value, "cargo")}
                  placeholder="Cargo/Função"
                  className="w-full p-2 bg-white/5 border-white/20 rounded-full text-white border focus:ring focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label htmlFor="status" className="text-blue-200 block">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={(e) => handleChange(e.target.value, "status")}
                  className="w-full p-2 bg-white/5 border-white/20 rounded-full text-white border focus:ring focus:ring-blue-500 outline-none"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status} className="bg-white/10 text-white">{status}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
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