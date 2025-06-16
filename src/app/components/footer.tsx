
"use client";

import Link from "next/link";
import Image from "next/image";
import { Shield, Lock, CheckCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');
        .footer-text {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
        }
      `}</style>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center transition-transform hover:scale-105">
                <Image width={48} height={48} property="logo" src="/images/logo.png" alt="" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold tracking-tight">Polícia Nacional</h3>
                <p className="text-sm text-gray-400">República de Angola</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm max-w-xs">
              Sistema oficial para gestão de providências da Polícia Nacional de Angola.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-100">Links Úteis</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link
                  href="#"
                  className="hover:text-blue-400 transition-colors flex items-center"
                >
                  <span className="mr-2">•</span> Início
                </Link>
              </li>
              <li>
                <Link
                  href="#servicos"
                  className="hover:text-blue-400 transition-colors flex items-center"
                >
                  <span className="mr-2">•</span> Serviços
                </Link>
              </li>
              <li>
                <Link
                  href="#consulta"
                  className="hover:text-blue-400 transition-colors flex items-center"
                >
                  <span className="mr-2">•</span> Consulta
                </Link>
              </li>
              <li>
                <Link
                  href="#contato"
                  className="hover:text-blue-400 transition-colors flex items-center"
                >
                  <span className="mr-2">•</span> Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-100">Segurança</h4>
            <div className="space-y-3 text-sm text-gray-400">
              <p className="flex items-center">
                <Lock className="w-5 h-5 mr-2 text-blue-600" />
                Conexão Segura SSL
              </p>
              <p className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-blue-600" />
                Dados Criptografados
              </p>
              <p className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-blue-600" />
                Auditoria Completa
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-base text-gray-500 footer-text">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="flex items-center">
              Desenvolvido com ❤️ pela{' '}
              <Image
                src="/images/jftech.webp"
                alt="JFTech Logo"
                width={80}
                height={20}
                className="ml-2"
              />
            </p>
            <p>© {new Date().getFullYear()} JFTech. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}