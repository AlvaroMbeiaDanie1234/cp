"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AlertCircle, Badge, Bookmark, ChevronRight, Clock, ExternalLink, Eye, Filter, MessageCircle, Search, Share2, Star, TrendingUp, Users } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  categoryColor: string;
  image: string;
  author: string;
  publishedAt: string;
  readTime: string;
  views: number;
  isBreaking?: boolean;
  isFeatured?: boolean;
  tags: string[];
}

const newsData: NewsItem[] = [
  {
    id: "1",
    title: "Angola - Situação financeira do Cofre da Previdência da Polícia preocupa dirigentes.",
    excerpt: "A situação financeira do Cofre de Previdência da Polícia está a preocupar a presidência da mesa da Assembleia-Geral, que está a estudar medidas para inverter o atual quadro, que considera “desolador”. Segundo o Comissário-Geral, Francisca Ribas, é necessária uma diversificação das fontes de receitas para uma maior e melhor assistência aos cerca de 100 mil associados da instituição.",
    category: "Tecnologia",
    categoryColor: "bg-blue-500",
    image: "/images/n1.jpg",
    author: "Comissário João Silva",
    publishedAt: "2024-03-20T10:30:00Z",
    readTime: "5 min",
    views: 2847,
    isBreaking: true,
    isFeatured: true,
    tags: ["Biometria", "Tecnologia", "Segurança"],
  },
  {
    id: "2",
    title: "Acto de promoção e empossamento de novos diretores da PNA",
    excerpt: "Foram promovidos mas de (8) oito novos directores nacionais da PNA.",
    category: "Operações",
    categoryColor: "bg-red-500",
    image: "/images/n2.jpeg",
    author: "Superintendente Maria Santos",
    publishedAt: "2024-03-19T15:45:00Z",
    readTime: "3 min",
    views: 5234,
    isBreaking: true,
    tags: ["Drogas", "Operação", "Segurança Pública"],
  },
  {
    id: "3",
    title: "Programa de Capacitação Digital Forma 200 Novos Agentes",
    excerpt: "Iniciativa inovadora prepara policiais para os desafios da era digital e crimes cibernéticos.",
    category: "Formação",
    categoryColor: "bg-green-500",
    image: "/images/n3.jpg",
    author: "Inspector Carlos Mendes",
    publishedAt: "2024-03-18T09:15:00Z",
    readTime: "4 min",
    views: 1892,
    tags: ["Formação", "Digital", "Capacitação"],
  },
  {
    id: "4",
    title: "Parceria com Universidades Fortalece Pesquisa em Criminologia",
    excerpt: "Acordo de cooperação visa desenvolver novas metodologias de investigação e prevenção criminal.",
    category: "Parcerias",
    categoryColor: "bg-purple-500",
    image: "/images/bg.jpeg",
    author: "Dra. Ana Rodrigues",
    publishedAt: "2024-03-17T14:20:00Z",
    readTime: "6 min",
    views: 1456,
    tags: ["Universidade", "Pesquisa", "Criminologia"],
  },
  {
    id: "5",
    title: "Sistema de Videomonitoramento Reduz Criminalidade em 35%",
    excerpt: "Implementação de câmeras inteligentes com IA mostra resultados expressivos na prevenção de crimes.",
    category: "Estatísticas",
    categoryColor: "bg-orange-500",
    image: "/images/bg.jpeg",
    author: "Analista Pedro Costa",
    publishedAt: "2024-03-16T11:30:00Z",
    readTime: "4 min",
    views: 3421,
    tags: ["Videomonitoramento", "IA", "Prevenção"],
  },
  {
    id: "6",
    title: "Campanha Nacional de Prevenção ao Crime Cibernético",
    excerpt: "PNA lança iniciativa educativa para conscientizar população sobre segurança digital.",
    category: "Campanhas",
    categoryColor: "bg-cyan-500",
    image: "/images/bg.jpeg",
    author: "Capitão Sofia Almeida",
    publishedAt: "2024-03-15T16:45:00Z",
    readTime: "3 min",
    views: 2156,
    tags: ["Cibernético", "Prevenção", "Educação"],
  },
];

const categories = [
  { name: "Todas", color: "bg-gray-500" },
  { name: "Tecnologia", color: "bg-blue-500" },
  { name: "Operações", color: "bg-red-500" },
  { name: "Formação", color: "bg-green-500" },
  { name: "Parcerias", color: "bg-purple-500" },
  { name: "Estatísticas", color: "bg-orange-500" },
  { name: "Campanhas", color: "bg-cyan-500" },
];

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNews = newsData.filter((item) => {
    const matchesCategory = selectedCategory === "Todas" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Agora mesmo";
    if (diffInHours < 24) return `${diffInHours}h atrás`;
    return date.toLocaleDateString("pt-AO", { day: "numeric", month: "short" });
  };

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  return (
    <section id="noticias" className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 20s linear infinite;
        }
      `}</style>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className="backdrop-blur-sm border-b sticky top-0 z-50"
          data-aos="fade-down"
          data-aos-delay="100"
        >
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <p className="text-gray-600 mt-1">ACTUALIZAÇÕES</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Buscar notícias..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full sm:w-80 bg-white/70 backdrop-blur-sm border-gray-200"
                  />
                </div>
                <Button size="sm" variant="outline" className="bg-white/70 backdrop-blur-sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                </Button>
              </div>
            </div>

            {/* Categories */}
            <div className="flex gap-2 mt-6 overflow-x-auto pb-2">
              {categories.map((category, index) => (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.name)}
                  className={`whitespace-nowrap ${
                    selectedCategory === category.name
                      ? `${category.color} text-white hover:opacity-90`
                      : "bg-white/70 backdrop-blur-sm hover:bg-white"
                  }`}
                  data-aos="fade-up"
                  data-aos-delay={`${100 + index * 50}`}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Breaking News Banner */}
        {filteredNews.some((item) => item.isBreaking) && (
          <div
            className="bg-gradient-to-r from-red-500 to-red-600 text-white py-3 mt-4"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="font-bold text-sm">ÚLTIMAS NOTÍCIAS</span>
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="animate-marquee whitespace-nowrap">
                    {filteredNews
                      .filter((item) => item.isBreaking)
                      .map((item) => item.title)
                      .join(" • ")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="container mx-auto px-4 py-8">
          {/* Featured News */}
          {filteredNews.some((item) => item.isFeatured) && (
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6" data-aos="fade-up" data-aos-delay="300">
                <Star className="w-5 h-5 text-yellow-500" />
                <h2 className="text-2xl font-bold text-gray-900">Destaque</h2>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {filteredNews
                  .filter((item) => item.isFeatured)
                  .slice(0, 2)
                  .map((item, index) => (
                    <Card
                      key={item.id}
                      className="group overflow-hidden hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm border-0 shadow-lg"
                      data-aos="fade-up"
                      data-aos-delay={`${400 + index * 100}`}
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <Badge className={`${item.categoryColor} text-white border-0`}>{item.category}</Badge>
                          {item.isBreaking && (
                            <Badge className="bg-red-500 text-white border-0 animate-pulse">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              URGENTE
                            </Badge>
                          )}
                        </div>
                        <div className="absolute top-4 right-4 flex gap-2">
                          <Button size="sm" variant="secondary" className="bg-white/90 backdrop-blur-sm">
                            <Bookmark className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="secondary" className="bg-white/90 backdrop-blur-sm">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{item.excerpt}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} className="text-xs bg-gray-100 text-gray-700">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {item.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {formatDate(item.publishedAt)}
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {formatViews(item.views)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {item.readTime}
                            </span>
                          </div>
                        </div>

                        <Button size="sm" className="w-full mt-4 group-hover:bg-blue-600 transition-colors">
                          Ler Notícia Completa
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          )}

          {/* Regular News Grid */}
          <div className="mb-8">
            <div
              className="flex items-center justify-between mb-6"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <h2 className="text-2xl font-bold text-gray-900">Todas as Notícias</h2>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <TrendingUp className="w-4 h-4" />
                <span>{filteredNews.length} notícias encontradas</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews
                .filter((item) => !item.isFeatured)
                .map((item, index) => (
                  <Card
                    key={item.id}
                    className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 shadow-md hover:-translate-y-1"
                    data-aos="fade-up"
                    data-aos-delay={`${600 + index * 100}`}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className={`${item.categoryColor} text-white border-0 text-xs`}>
                          {item.category}
                        </Badge>
                      </div>
                      {item.isBreaking && (
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-red-500 text-white border-0 text-xs animate-pulse">
                            URGENTE
                          </Badge>
                        </div>
                      )}
                    </div>

                    <CardContent className="p-4">
                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 text-sm">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-xs mb-3 line-clamp-2">{item.excerpt}</p>

                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(item.publishedAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {formatViews(item.views)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-blue-600 hover:text-blue-700 p-0 h-auto"
                        >
                          Ler mais
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </Button>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" className="p-1 h-auto">
                            <Bookmark className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="ghost" className="p-1 h-auto">
                            <Share2 className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="ghost" className="p-1 h-auto">
                            <MessageCircle className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          {/* Load More */}
          <div className="text-center" data-aos="fade-up" data-aos-delay="800">
            <Button variant="outline" size="lg" className="bg-white/70 backdrop-blur-sm">
              Carregar Mais Notícias
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}