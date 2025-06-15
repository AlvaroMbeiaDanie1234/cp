import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, ShieldCheck, Users } from "lucide-react";

   export default function Services() {
     return (
       <section className="py-16 bg-gradient-to-b from-gray-50 to-gray-100">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <h2
             className="text-4xl font-extrabold text-center text-gray-900 mb-12 tracking-tight"
             data-aos="fade-down"
             data-aos-delay="100"
           >
             Nossos Serviços
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             <Card
               className="relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
               data-aos="fade-up"
               data-aos-delay="200"
             >
               <CardHeader className="pb-4">
                 <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                   <Search className="w-7 h-7 text-blue-600" />
                 </div>
                 <CardTitle className="text-xl font-semibold text-gray-900">
                   Consulta de Providências
                 </CardTitle>
                 <CardDescription className="text-gray-600">
                   Acesse informações sobre suas providências de forma rápida e segura.
                 </CardDescription>
               </CardHeader>
               <CardContent className="p-6">
                 <p className="text-gray-700 leading-relaxed">
                   Utilize nosso sistema online para verificar o status de suas solicitações em tempo real.
                 </p>
               </CardContent>
               <CardFooter className="p-6">
                 <Button
                  size={"sm"}
                   variant="outline"
                   className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors"
                 >
                   Consultar Agora
                 </Button>
               </CardFooter>
             </Card>
             <Card
               className="relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
               data-aos="fade-up"
               data-aos-delay="300"
             >
               <CardHeader className="pb-4">
                 <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                   <ShieldCheck className="w-7 h-7 text-green-600" />
                 </div>
                 <CardTitle className="text-xl font-semibold text-gray-900">
                   Segurança Pública
                 </CardTitle>
                 <CardDescription className="text-gray-600">
                   Serviços para garantir a segurança e bem-estar da comunidade.
                 </CardDescription>
               </CardHeader>
               <CardContent className="p-6">
                 <p className="text-gray-700 leading-relaxed">
                   Conheça nossas iniciativas para proteção, prevenção e ordem pública.
                 </p>
               </CardContent>
               <CardFooter className="p-6">
                 <Button
                    size={"sm"}
                   variant="outline"
                   className="w-full border-green-600 text-green-600 hover:bg-green-50 transition-colors"
                 >
                   Saiba Mais
                 </Button>
               </CardFooter>
             </Card>
             <Card
               className="relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
               data-aos="fade-up"
               data-aos-delay="400"
             >
               <CardHeader className="pb-4">
                 <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                   <Users className="w-7 h-7 text-purple-600" />
                 </div>
                 <CardTitle className="text-xl font-semibold text-gray-900">
                   Atendimento Comunitário
                 </CardTitle>
                 <CardDescription className="text-gray-600">
                   Apoio direto à comunidade com serviços personalizados.
                 </CardDescription>
               </CardHeader>
               <CardContent className="p-6">
                 <p className="text-gray-700 leading-relaxed">
                   Entre em contato com nossa equipe para assistência e suporte local.
                 </p>
               </CardContent>
               <CardFooter className="p-6">
                 <Button
                    size={"sm"}
                   variant="outline"
                   className="w-full border-purple-600 text-purple-600 hover:bg-purple-50 transition-colors"
                 >
                   Fale Conosco
                 </Button>
               </CardFooter>
             </Card>
           </div>
         </div>
       </section>
     );
   }