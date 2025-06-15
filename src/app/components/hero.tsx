"use client";

import { Button } from "@/components/ui/button";
import {
  FileText,
  Search,
  Clock,
  Users,
  CheckCircle,
} from "lucide-react";

export default function Hero() {
  return (
    <section id="inicio" className="py-16 bg-[#041B4E] text-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right" data-aos-delay="100">
            <div
              className="mb-4 bg-blue-500/20 text-blue-100 border-blue-400 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              data-aos="fade-in"
              data-aos-delay="200"
            >
              Sistema Oficial
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Cofre de Providências
              <span className="block text-blue-200">Polícia Nacional</span>
            </h2>
            <p className="text-xl mb-8 text-blue-100 leading-relaxed" data-aos="fade-up" data-aos-delay="300">
              Sistema seguro e moderno para gestão, consulta e acompanhamento de providências administrativas e
              judiciais da Polícia Nacional de Angola.
            </p>
            <div className="flex flex-col sm:flex-row gap-4" data-aos="fade-up" data-aos-delay="400">
              <Button variant="outline" size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                <Search className="w-5 h-5 mr-2 text-[#EFE500]" />
                Consultar Providência
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                <FileText className="w-5 h-5 mr-2 text-[#EFE500]" />
                Nova Solicitação
              </Button>
            </div>
          </div>
          <div className="relative" data-aos="fade-left" data-aos-delay="100">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center" data-aos="zoom-in" data-aos-delay="200">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-8 h-8 text-[#EFE500]" />
                  </div>
                  <h3 className="font-semibold mb-1">Providências</h3>
                  <p className="text-2xl font-bold">2,847</p>
                </div>
                <div className="text-center" data-aos="zoom-in" data-aos-delay="300">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-8 h-8 text-[#EFE500]" />
                  </div>
                  <h3 className="font-semibold mb-1">Concluídas</h3>
                  <p className="text-2xl font-bold">2,156</p>
                </div>
                <div className="text-center" data-aos="zoom-in" data-aos-delay="400">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-8 h-8 text-[#EFE500]" />
                  </div>
                  <h3 className="font-semibold mb-1">Em Andamento</h3>
                  <p className="text-2xl font-bold">691</p>
                </div>
                <div className="text-center" data-aos="zoom-in" data-aos-delay="500">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-8 h-8 text-[#EFE500]" />
                  </div>
                  <h3 className="font-semibold mb-1">Usuários</h3>
                  <p className="text-2xl font-bold">156</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}