"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"
import { usuarioService } from "../services/userService"

interface UsuarioModalProps {
  isOpen: boolean
  onClose: () => void
}

const roleOptions = ["utilizador", "operador", "admin"]

export default function UsuarioModal({ isOpen, onClose }: UsuarioModalProps) {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "utilizador",
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleChange = (value: string, field: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: "" }))
    setSubmitError(null)
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    if (!formData.full_name.trim()) newErrors.full_name = "Obrigatório"
    if (!formData.email.trim()) {
      newErrors.email = "Obrigatório"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }
    if (!formData.password.trim()) {
      newErrors.password = "Obrigatório"
    } else if (formData.password.length < 6) {
      newErrors.password = "Mínimo 6 caracteres"
    }
    if (!formData.role) newErrors.role = "Obrigatório"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        const response = await usuarioService.register({
          full_name: formData.full_name,
          email: formData.email,
          password: formData.password,
          role: formData.role as "utilizador" | "operador" | "admin",
        })
        console.log("Usuário registrado:", response)
        onClose()
        setFormData({
          full_name: "",
          email: "",
          password: "",
          role: "utilizador",
        })
        setErrors({})
        setSubmitError(null)
      } catch (error: any) {
        setSubmitError(error.message || "Falha ao registar usuário")
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white/10 backdrop-blur-md border-blue-200/20 text-white">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-bold text-blue-100">Novo Usuário</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-200">Dados do Usuário</h3>
            {submitError && (
              <div className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-300" />
                <span className="text-red-200 text-sm">{submitError}</span>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label htmlFor="full_name" className="text-blue-200 block">Nome</Label>
                <Input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={(e) => handleChange(e.target.value, "full_name")}
                  placeholder="Nome completo"
                  className="w-full p-2 bg-white/5 border-blue-200/20 rounded-full text-white border focus:ring focus:ring-blue-500 outline-none"
                />
                {errors.full_name && <span className="text-red-300 text-sm mt-1 block">{errors.full_name}</span>}
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="email" className="text-blue-200 block">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => handleChange(e.target.value, "email")}
                  placeholder="exemplo@dominio.com"
                  className="w-full p-2 bg-white/5 border-blue-200/20 rounded-full text-white border focus:ring focus:ring-blue-500 outline-none"
                />
                {errors.email && <span className="text-red-300 text-sm mt-1 block">{errors.email}</span>}
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="password" className="text-blue-200 block">Senha</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) => handleChange(e.target.value, "password")}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full p-2 bg-white/5 border-blue-200/20 rounded-full text-white border focus:ring focus:ring-blue-500 outline-none"
                />
                {errors.password && <span className="text-red-300 text-sm mt-1 block">{errors.password}</span>}
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="role" className="text-blue-200 block">Função</Label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={(e) => handleChange(e.target.value, "role")}
                  className="w-full p-2 bg-white/5 border-blue-200/20 rounded-full text-white border focus:ring focus:ring-blue-500 outline-none"
                >
                  {roleOptions.map((role) => (
                    <option key={role} value={role} className="bg-white/10 text-white">
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </option>
                  ))}
                </select>
                {errors.role && <span className="text-red-300 text-sm mt-1 block">{errors.role}</span>}
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