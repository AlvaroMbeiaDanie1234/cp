import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";

   export default function Contacts() {
     return (
       <section id="contato" className="py-16  bg-[#041B4E] text-white">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid lg:grid-cols-2 gap-12">
             <div>
               <h2 className="text-4xl font-extrabold mb-6 tracking-tight">Entre em Contato</h2>
               <p className="text-blue-100 mb-8 text-lg max-w-xl">
                 Nossa equipe está pronta para esclarecer dúvidas e oferecer suporte técnico com rapidez e eficiência.
               </p>

               <div className="space-y-8">
                 <div className="flex items-center space-x-4 group">
                   <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105">
                     <Phone className="w-7 h-7" />
                   </div>
                   <div>
                     <h3 className="font-semibold text-lg">Telefone</h3>
                     <p className="text-blue-100">+244 222 123 456</p>
                   </div>
                 </div>

                 <div className="flex items-center space-x-4 group">
                   <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105">
                     <Mail className="w-7 h-7" />
                   </div>
                   <div>
                     <h3 className="font-semibold text-lg">Email</h3>
                     <p className="text-blue-100">cofre.providencias@pna.gov.ao</p>
                   </div>
                 </div>

                 <div className="flex items-center space-x-4 group">
                   <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105">
                     <MapPin className="w-7 h-7" />
                   </div>
                   <div>
                     <h3 className="font-semibold text-lg">Endereço</h3>
                     <p className="text-blue-100">
                       Comando Geral da Polícia Nacional
                       <br />
                       Luanda, Angola
                     </p>
                   </div>
                 </div>
               </div>
             </div>

             <div>
               <Card className="bg-white text-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                 <CardHeader className="p-6">
                   <CardTitle className="text-xl font-semibold">Horário de Atendimento</CardTitle>
                 </CardHeader>
                 <CardContent className="p-6 space-y-4">
                   <div className="space-y-4">
                     <div className="flex justify-between items-center py-2 border-b border-gray-200">
                       <span className="font-medium">Segunda a Sexta</span>
                       <span>08:00 - 17:00</span>
                     </div>
                     <div className="flex justify-between items-center py-2 border-b border-gray-200">
                       <span className="font-medium">Sábado</span>
                       <span>08:00 - 12:00</span>
                     </div>
                     <div className="flex justify-between items-center py-2">
                       <span className="font-medium">Domingo</span>
                       <span className="text-gray-500">Fechado</span>
                     </div>
                   </div>

                   <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                     <h4 className="font-semibold text-blue-900 mb-2">Suporte de Emergência</h4>
                     <p className="text-sm text-blue-800">
                       Para casos urgentes, entre em contato através do número:
                       <span className="font-semibold"> +244 900 123 456</span>
                     </p>
                   </div>
                   <Button  size="sm" variant="outline"
                     className="mt-6 w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                     asChild
                   >
                     <a href="mailto:cofre.providencias@pna.gov.ao">Enviar Mensagem</a>
                   </Button>
                 </CardContent>
               </Card>
             </div>
           </div>
         </div>
       </section>
     );
   }