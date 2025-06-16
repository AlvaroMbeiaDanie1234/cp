
"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ChevronRight,
  Loader2,
  AlertCircle,
  User,
  Phone,
} from "lucide-react";
import Image from "next/image";

export default function RegisterScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setRegisterError("");

    // Basic validation
    if (!fullName || !email || !phone || !password || !confirmPassword) {
      setRegisterError("Por favor, preencha todos os campos.");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setRegisterError("As senhas não coincidem.");
      setIsLoading(false);
      return;
    }

    if (!agreeTerms) {
      setRegisterError("Você deve concordar com os termos e condições.");
      setIsLoading(false);
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setRegisterError("Por favor, insira um email válido.");
      setIsLoading(false);
      return;
    }

    // Simple phone validation (example: accepts formats like +244 123 456 789 or 123456789)
    const phoneRegex = /^\+?\d{9,15}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ""))) {
      setRegisterError("Por favor, insira um número de telefone válido.");
      setIsLoading(false);
      return;
    }

    // Simulate registration
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock successful registration
    if (email && password) {
      setIsLoading(false);
      // Here you would redirect to a success page or login page
      setRegisterError("");
      // Example: router.push('/dashboard');
    } else {
      setRegisterError("Erro ao criar conta. Tente novamente.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#041B4E]">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');
        .footer-text {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
        }
        @keyframes blob {
          0% {
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.3;
          }
          100% {
            transform: scale(1);
            opacity: 0.2;
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes float {
          0% {
            transform: translateY(0);
            opacity: 0.1;
          }
          50% {
            opacity: 0.15;
          }
          100% {
            transform: translateY(-100vh);
            opacity: 0.1;
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bg.jpeg"
          alt="Fundo"
          fill
          className="object-cover opacity-30 blur-sm"
          quality={50}
        />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-10 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div
          className={`w-full max-w-md transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {/* Register Card */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
            <CardHeader className="text-center pb-4">
              <h2 className="text-2xl font-bold text-white">CRIAR CONTA</h2>
              <p className="text-blue-100 text-sm">COFRE DE PROVIDÊNCIAS</p>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleRegister} className="space-y-4">
                {/* Full Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-white text-sm font-medium">
                    Nome Completo
                  </Label>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-200 w-4 h-4 group-focus-within:text-white transition-colors" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Seu nome completo"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-white/40 focus:bg-white/20 transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white text-sm font-medium">
                    Email
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-200 w-4 h-4 group-focus-within:text-white transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu.email@pna.gov.ao"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-white/40 focus:bg-white/20 transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                {/* Phone Number Field */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white text-sm font-medium">
                    Telefone
                  </Label>
                  <div className="relative group">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-200 w-4 h-4 group-focus-within:text-white transition-colors" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+244 123 456 789"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-white/40 focus:bg-white/20 transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white text-sm font-medium">
                    Senha
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-200 w-4 h-4 group-focus-within:text-white transition-colors" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Digite sua senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-white/40 focus:bg-white/20 transition-all duration-300"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-200 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white text-sm font-medium">
                    Confirmar Senha
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-200 w-4 h-4 group-focus-within:text-white transition-colors" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirme sua senha"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-white/40 focus:bg-white/20 transition-all duration-300"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-200 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Terms and Conditions Checkbox */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreeTerms}
                    onCheckedChange={(checked) => setAgreeTerms(checked === true)}
                    className="border-white/20 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <Label htmlFor="terms" className="text-sm text-blue-100">
                    Concordo com os <a href="#" className="underline hover:text-white">termos e condições</a>
                  </Label>
                </div>

                {/* Error Message */}
                {registerError && (
                  <div className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-red-300" />
                    <span className="text-red-200 text-sm">{registerError}</span>
                  </div>
                )}

                {/* Register Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Criando Conta...
                    </>
                  ) : (
                    <>
                      Criar Conta
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-blue-200">ou</span>
                </div>
              </div>

              {/* Login Link */}
              <p className="text-center text-sm text-blue-100">
                Já tem uma conta?{" "}
                <a href="/login" className="text-blue-200 hover:text-white underline transition-colors">
                  Faça login
                </a>
              </p>
            </CardContent>
          </Card>

         
        </div>
      </div>
    </div>
  );
}
