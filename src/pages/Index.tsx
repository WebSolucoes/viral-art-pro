import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Sparkles, Zap, Users, Target, Crown, CheckCircle, ArrowRight, PlayCircle, TrendingUp, Shield } from 'lucide-react';
const Index = () => {
  const navigate = useNavigate();
  const {
    isAuthenticated
  } = useAuth();
  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="relative z-10 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-400 to-purple-400 p-2 rounded-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">PostPix IA</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? <Button onClick={() => navigate('/dashboard')} className="bg-white text-purple-900 hover:bg-gray-100">
                Dashboard
              </Button> : <>
                <Button variant="ghost" className="text-white hover:text-purple-200" onClick={() => navigate('/auth')}>
                  Entrar
                </Button>
                <Button onClick={handleGetStarted} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Começar Grátis
                </Button>
              </>}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Crie banners
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {" "}profissionais
                </span>
                <br />
                em segundos com IA
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                A plataforma perfeita para <strong>revendedores de IPTV</strong>, <strong>pequenos negócios</strong> e <strong>microempreendedores</strong> criarem conteúdo visual que vende
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button onClick={handleGetStarted} size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-3">
                <PlayCircle className="w-5 h-5 mr-2" />
                Começar Grátis Agora
              </Button>
              
              <Button variant="outline" size="lg" onClick={() => navigate('/pricing')} className="border-white text-lg px-8 py-3 text-transparent bg-transparent">
                Ver Preços
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-6 text-blue-200">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Grátis para começar</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>IA incluída</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Sem instalação</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Por que escolher o PostPix IA?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Desenvolvido especificamente para quem vende online e precisa de conteúdo visual profissional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-xl w-fit mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">IA Especializada</h3>
              <p className="text-gray-600">
                Textos publicitários gerados automaticamente para IPTV, delivery, vendas online e captação de revendedores
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-2xl">
              <div className="bg-gradient-to-r from-green-600 to-teal-600 p-3 rounded-xl w-fit mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Rápido e Simples</h3>
              <p className="text-gray-600">
                Crie banners profissionais em menos de 30 segundos. Perfeito para quem não tem tempo nem conhecimento de design
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl">
              <div className="bg-gradient-to-r from-orange-600 to-red-600 p-3 rounded-xl w-fit mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Templates Focados</h3>
              <p className="text-gray-600">
                Layouts otimizados para WhatsApp, Instagram e Facebook. Cada template é pensado para gerar mais vendas
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl w-fit mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Logo Automático</h3>
              <p className="text-gray-600">
                Faça upload da sua logo uma vez e ela aparece automaticamente em todos os banners criados
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-2xl">
              <div className="bg-gradient-to-r from-yellow-600 to-orange-600 p-3 rounded-xl w-fit mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Integração TMDB</h3>
              <p className="text-gray-600">
                Para revendedores de IPTV: digite o nome da série/filme e busque automaticamente capa e informações
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-2xl">
              <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-3 rounded-xl w-fit mb-4">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Modo Agência</h3>
              <p className="text-gray-600">
                Gerencie múltiplos clientes, salve diferentes logos e organize banners por pastas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Feito para quem vende online
            </h2>
            <p className="text-xl text-gray-600">
              Ideal para empreendedores que precisam divulgar, mas não sabem criar artes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[{
            title: "Revendedores IPTV",
            description: "Divulgue novos conteúdos, promoções e capte novos clientes",
            icon: "📺"
          }, {
            title: "Delivery & Food",
            description: "Promova pratos, ofertas especiais e atraia mais pedidos",
            icon: "🍔"
          }, {
            title: "Lojas Online",
            description: "Produtos em destaque, liquidações e lançamentos",
            icon: "🛍️"
          }, {
            title: "Social Medias",
            description: "Atenda múltiplos clientes pequenos com agilidade",
            icon: "📱"
          }].map((audience, index) => <div key={index} className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="text-4xl mb-4 text-center">{audience.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">
                  {audience.title}
                </h3>
                <p className="text-gray-600 text-center text-sm">
                  {audience.description}
                </p>
              </div>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-r from-purple-900 to-blue-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Pare de perder vendas por falta de conteúdo visual
              </h2>
              <p className="text-xl text-blue-100">
                Comece a criar banners profissionais hoje mesmo. É grátis!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleGetStarted} size="lg" className="bg-white text-purple-900 hover:bg-gray-100 text-lg px-8 py-3">
                <Shield className="w-5 h-5 mr-2" />
                Começar Grátis - 3 Banners/Mês
              </Button>
            </div>

            <div className="text-blue-200 text-sm">
              ✅ Sem cartão de crédito • ✅ Sem instalação • ✅ Resultados em 30 segundos
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-blue-400 to-purple-400 p-2 rounded-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold">PostPix IA</h3>
          </div>
          <p className="text-gray-400 mb-8">
            A plataforma de IA para criação de banners profissionais
          </p>
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-500">
              © 2024 PostPix IA. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;