import Link from "next/link";
   import { Shield, Lock, CheckCircle } from "lucide-react";

   export default function Footer() {
     return (
       <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div>
               <div className="flex items-center space-x-3 mb-4">
                 <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center transition-transform hover:scale-105">
                   <Shield className="w-7 h-7" />
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

           <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500">
             <p>© {new Date().getFullYear()} Polícia Nacional de Angola. Todos os direitos reservados.</p>
           </div>
         </div>
       </footer>
     );
   }