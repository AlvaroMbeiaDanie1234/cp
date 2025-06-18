
// File: app/modals/DocumentosModal.tsx
"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

// Dynamically import ReactQuill to avoid SSR issues


interface DocumentosModalProps {
  isOpen: boolean
  onClose: () => void
}



export default function DocumentosModal({ isOpen, onClose }: DocumentosModalProps) {
 




  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto bg-white/10 backdrop-blur-md border-white/20 text-white">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-bold">Registar Documento</DialogTitle>
         
        </DialogHeader>
        <form className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             
             
              
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-200">Carregando o editor de documento...</h3>
          
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