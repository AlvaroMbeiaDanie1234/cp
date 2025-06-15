"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Search,
  Send,
  User,
  CreditCard,
  Building2,
  Calendar,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  Phone,
  Mail,
  Hash,
  AlertCircle,
  Loader2,
} from "lucide-react";

interface ConsultaResult {
  nome: string;
  numeroBilhete: string;
  orgao: string;
  dataSolicitacao: string;
  quantia: string;
  estado: "pendente" | "aceite" | "rejeitado";
}

const mockConsultaData: Record<string, ConsultaResult> = {
  "123456789-SOL001": {
    nome: "João Manuel Silva Santos",
    numeroBilhete: "123456789",
    orgao: "Direção Nacional de Investigação Criminal",
    dataSolicitacao: "2025-06-10",
    quantia: "150.000,00 Kz",
    estado: "pendente",
  },
  "987654321-SOL002": {
    nome: "Maria Fernanda Costa",
    numeroBilhete: "987654321",
    orgao: "Comando Provincial de Luanda",
    dataSolicitacao: "2025-06-08",
    quantia: "75.000,00 Kz",
    estado: "aceite",
  },
  "456789123-SOL003": {
    nome: "Carlos Alberto Mendes",
    numeroBilhete: "456789123",
    orgao: "Direção de Recursos Humanos",
    dataSolicitacao: "2025-06-05",
    quantia: "200.000,00 Kz",
    estado: "rejeitado",
  },
};

const orgaos = [
  "Direção Nacional de Investigação Criminal",
  "Comando Provincial de Luanda",
  "Comando Provincial de Benguela",
  "Comando Provincial do Huambo",
  "Direção de Recursos Humanos",
  "Direção de Logística",
  "Direção de Formação",
  "Gabinete do Comandante Geral",
];

export default function ProvidenciaManager() {
  const [activeTab, setActiveTab] = useState("consultar");
  const [isLoading, setIsLoading] = useState(false);
  const [consultaResult, setConsultaResult] = useState<ConsultaResult | null>(null);
  const [consultaError, setConsultaError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Estados para consulta
  const [numeroBilheteConsulta, setNumeroBilheteConsulta] = useState("");
  const [codigoSolicitacao, setCodigoSolicitacao] = useState("");

  // Estados para solicitação
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [numeroBilheteSolicitacao, setNumeroBilheteSolicitacao] = useState("");
  const [nip, setNip] = useState("");
  const [orgaoSelecionado, setOrgaoSelecionado] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");

  const handleConsultar = async () => {
    if (!numeroBilheteConsulta || !codigoSolicitacao) {
      setConsultaError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setIsLoading(true);
    setConsultaError("");
    setConsultaResult(null);

    // Simular chamada à API
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const chave = `${numeroBilheteConsulta}-${codigoSolicitacao}`;
    const resultado = mockConsultaData[chave];

    if (resultado) {
      setConsultaResult(resultado);
    } else {
      setConsultaError("Nenhuma providência encontrada com os dados fornecidos.");
    }

    setIsLoading(false);
  };

  const handleSolicitar = async () => {
    if (!nomeCompleto || !numeroBilheteSolicitacao || !nip || !orgaoSelecionado || !telefone || !email) {
      setConsultaError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setIsLoading(true);
    setSubmitSuccess(false);
    setConsultaError("");

    // Simular chamada à API
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setSubmitSuccess(true);
    setIsLoading(false);

    // Limpar formulário
    setNomeCompleto("");
    setNumeroBilheteSolicitacao("");
    setNip("");
    setOrgaoSelecionado("");
    setTelefone("");
    setEmail("");
  };

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "pendente":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="w-3 h-3 mr-1 text-[#EFE500]" />
            Pendente
          </Badge>
        );
      case "aceite":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1 text-[#EFE500]" />
            Aceite
          </Badge>
        );
      case "rejeitado":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <XCircle className="w-3 h-3 mr-1 text-[#EFE500]" />
            Rejeitado
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <section
      className="py-16 bg-gradient-to-br from-white/10 via-blue-50/10 to-indigo-50/10 bg-cover bg-center relative"
      style={{
        backgroundImage: `url('/images/bg.jpeg')`,
      }}
    >
      {/* Overlay com blur e brilho */}
      <div className="absolute inset-0 bg-black/5 backdrop-blur-sm bg-gradient-to-br from-white/4 to-transparent"></div>

      <div className="container mx-auto max-w-4xl px-4 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#007cf0] to-[#FE500] bg-clip-text text-transparent mb-2">
            COFRE DE PROVIDÊNCIAS
          </h1>
          <p className="text-gray-100 text-lg">Polícia Nacional de Angola</p>
        </div>

        <Card className="bg-[#FFFFFF]/95 backdrop-blur-lg border border-[#41B4E6]/20 shadow-2xl rounded-2xl overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="text-center text-xl sm:text-2xl text-[#000000] font-semibold">
              GESTÃO DE PROVIDÊNCIAS
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
    <TabsList className="grid w-full grid-cols-2 mb-6 sm:mb-8 bg-[#EFE5F0]/50 rounded-full p-1 relative">
      <TabsTrigger
        value="consultar"
        className="flex items-center gap-2 text-[#000000] font-medium py-2 sm:py-3 rounded-full transition-all data-[state=active]:bg-[#041B4E] data-[state=active]:text-[#FFFFFF] data-[state=active]:shadow-md"
      >
        <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#EFE500]" />
        Consultar
      </TabsTrigger>
      <TabsTrigger
        value="solicitar"
        className="flex items-center gap-2 text-[#000000] font-medium py-2 sm:py-3 rounded-full transition-all data-[state=active]:bg-[#041B4E] data-[state=active]:text-[#FFFFFF] data-[state=active]:shadow-md"
      >
        <Send className="w-4 h-4 sm:w-5 sm:h-5 text-[#EFE500]" />
        Solicitar
      </TabsTrigger>
    </TabsList>

    <TabsContent value="consultar" className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-2 relative">
          <Label htmlFor="numeroBilheteConsulta" className="text-sm font-medium text-[#000000]">
            Número do Bilhete *
          </Label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#EFE500] w-4 h-4 sm:w-5 sm:h-5" />
            <Input
              id="numeroBilheteConsulta"
              placeholder="Ex: 123456789"
              value={numeroBilheteConsulta}
              onChange={(e) => setNumeroBilheteConsulta(e.target.value)}
              className="pl-10 bg-[#FFFFFF] border-[#41B4E6]/30 focus:border-[#41B4E6] focus:ring-[#41B4E6]/50 rounded-lg transition-all"
            />
          </div>
        </div>

        <div className="space-y-2 relative">
          <Label htmlFor="codigoSolicitacao" className="text-sm font-medium text-[#000000]">
            Código de Solicitação *
          </Label>
          <div className="relative">
            <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#EFE500] w-4 h-4 sm:w-5 sm:h-5" />
            <Input
              id="codigoSolicitacao"
              placeholder="Ex: SOL001"
              value={codigoSolicitacao}
              onChange={(e) => setCodigoSolicitacao(e.target.value)}
              className="pl-10 bg-[#FFFFFF] border-[#41B4E6]/30 focus:border-[#41B4E6] focus:ring-[#41B4E6]/50 rounded-lg transition-all"
            />
          </div>
        </div>
      </div>

      <Button
        onClick={handleConsultar}
        disabled={isLoading || !numeroBilheteConsulta || !codigoSolicitacao}
        variant="outline"
        size="lg"
        className="w-full bg-[#041B4E] text-[#FFFFFF] hover:bg-[#041B4E]/90 font-semibold transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin text-[#EFE500]" />
            Pesquisando...
          </>
        ) : (
          <>
            <Search className="w-5 h-5 mr-2 text-[#EFE500]" />
            Pesquisar
          </>
        )}
      </Button>

      {consultaError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3 animate-in fade-in-10">
          <AlertCircle className="w-5 h-5 text-[#EFE500] flex-shrink-0" />
          <p className="text-red-700 text-sm">{consultaError}</p>
        </div>
      )}

      {consultaResult && (
        <Card className="bg-[#EFE5F0]/50 border-[#41B4E6]/20 rounded-xl animate-in fade-in-10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#000000] text-lg sm:text-xl">
              Resultado da Consulta
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-[#EFE500]" />
                <div>
                  <p className="text-xs sm:text-sm text-[#000000]/70">Nome Completo</p>
                  <p className="font-semibold text-[#000000] text-sm sm:text-base">{consultaResult.nome}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-[#EFE500]" />
                <div>
                  <p className="text-xs sm:text-sm text-[#000000]/70">Número do Bilhete</p>
                  <p className="font-semibold text-[#000000] text-sm sm:text-base">{consultaResult.numeroBilhete}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#EFE500]" />
                <div>
                  <p className="text-xs sm:text-sm text-[#000000]/70">Órgão/Direção</p>
                  <p className="font-semibold text-[#000000] text-sm sm:text-base">{consultaResult.orgao}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#EFE500]" />
                <div>
                  <p className="text-xs sm:text-sm text-[#000000]/70">Data da Solicitação</p>
                  <p className="font-semibold text-[#000000] text-sm sm:text-base">
                    {new Date(consultaResult.dataSolicitacao).toLocaleDateString("pt-AO")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-[#EFE500]" />
                <div>
                  <p className="text-xs sm:text-sm text-[#000000]/70">Quantia</p>
                  <p className="font-semibold text-[#000000] text-sm sm:text-base">{consultaResult.quantia}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-xs sm:text-sm text-[#000000]/70">Estado</p>
                  <div className="mt-1">{getEstadoBadge(consultaResult.estado)}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </TabsContent>

    <TabsContent value="solicitar" className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-2 relative">
          <Label htmlFor="nomeCompleto" className="text-sm font-medium text-[#000000]">
            Nome Completo *
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#EFE500] w-4 h-4 sm:w-5 sm:h-5" />
            <Input
              id="nomeCompleto"
              placeholder="Digite seu nome completo"
              value={nomeCompleto}
              onChange={(e) => setNomeCompleto(e.target.value)}
              className="pl-10 bg-[#FFFFFF] border-[#41B4E6]/30 focus:border-[#41B4E6] focus:ring-[#41B4E6]/50 rounded-lg transition-all"
            />
          </div>
        </div>
        <div className="space-y-2 relative">
          <Label htmlFor="numeroBilheteSolicitacao" className="text-sm font-medium text-[#000000]">
            Número do Bilhete *
          </Label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#EFE500] w-4 h-4 sm:w-5 sm:h-5" />
            <Input
              id="numeroBilheteSolicitacao"
              placeholder="Ex: 123456789"
              value={numeroBilheteSolicitacao}
              onChange={(e) => setNumeroBilheteSolicitacao(e.target.value)}
              className="pl-10 bg-[#FFFFFF] border-[#41B4E6]/30 focus:border-[#41B4E6] focus:ring-[#41B4E6]/50 rounded-lg transition-all"
            />
          </div>
        </div>
        <div className="space-y-2 relative">
          <Label htmlFor="nip" className="text-sm font-medium text-[#000000]">
            NIP *
          </Label>
          <div className="relative">
            <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#EFE500] w-4 h-4 sm:w-5 sm:h-5" />
            <Input
              id="nip"
              placeholder="Digite seu NIP"
              value={nip}
              onChange={(e) => setNip(e.target.value)}
              className="pl-10 bg-[#FFFFFF] border-[#41B4E6]/30 focus:border-[#41B4E6] focus:ring-[#41B4E6]/50 rounded-lg transition-all"
            />
          </div>
        </div>
        <div className="space-y-2 relative">
          <Label htmlFor="orgao" className="text-sm font-medium text-[#000000]">
            Órgão/Direção *
          </Label>
          <Select value={orgaoSelecionado} onValueChange={setOrgaoSelecionado}>
            <SelectTrigger className="bg-[#FFFFFF] border-[#41B4E6]/30 focus:border-[#41B4E6] focus:ring-[#41B4E6]/50 rounded-lg">
              <SelectValue placeholder="Selecione o órgão" />
            </SelectTrigger>
            <SelectContent className="bg-[#FFFFFF] border-[#41B4E6]/30">
              {orgaos.map((orgao) => (
                <SelectItem key={orgao} value={orgao} className="hover:bg-[#EFE5F0] focus:bg-[#EFE5F0]">
                  {orgao}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 relative">
          <Label htmlFor="telefone" className="text-sm font-medium text-[#000000]">
            Número de Telefone *
          </Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#EFE500] w-4 h-4 sm:w-5 sm:h-5" />
            <Input
              id="telefone"
              placeholder="Ex: +244 900 000 000"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="pl-10 bg-[#FFFFFF] border-[#41B4E6]/30 focus:border-[#41B4E6] focus:ring-[#41B4E6]/50 rounded-lg transition-all"
            />
          </div>
        </div>
        <div className="space-y-2 relative">
          <Label htmlFor="email" className="text-sm font-medium text-[#000000]">
            Email *
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#EFE500] w-4 h-4 sm:w-5 sm:h-5" />
            <Input
              id="email"
              type="email"
              placeholder="exemplo@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 bg-[#FFFFFF] border-[#41B4E6]/30 focus:border-[#41B4E6] focus:ring-[#41B4E6]/50 rounded-lg transition-all"
            />
          </div>
        </div>
      </div>

      <Button
        onClick={handleSolicitar}
        disabled={
          isLoading ||
          !nomeCompleto ||
          !numeroBilheteSolicitacao ||
          !nip ||
          !orgaoSelecionado ||
          !telefone ||
          !email
        }
        variant="outline"
        size="lg"
        className="w-full bg-[#041B4E] text-[#FFFFFF] hover:bg-[#041B4E]/90 font-semibold transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin text-[#EFE500]" />
            Submetendo...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2 text-[#EFE500]" />
            Submeter
          </>
        )}
      </Button>

      {submitSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3 animate-in fade-in-10">
          <CheckCircle className="w-5 h-5 text-[#EFE500] flex-shrink-0" />
          <div>
            <p className="text-green-700 font-semibold text-sm sm:text-base">Solicitação enviada com sucesso!</p>
            <p className="text-green-600 text-xs sm:text-sm">
              Você receberá um código de acompanhamento por email em breve.
            </p>
          </div>
        </div>
      )}

      {consultaError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3 animate-in fade-in-10">
          <AlertCircle className="w-5 h-5 text-[#EFE500] flex-shrink-0" />
          <p className="text-red-700 text-sm">{consultaError}</p>
        </div>
      )}
    </TabsContent>
  </Tabs>
</CardContent>
        </Card>
      </div>
    </section>
  );
}