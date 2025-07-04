
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Zap, Upload, Users, Calendar, BarChart3, Check, ArrowRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Sparkles,
      title: 'IA Copywriting',
      description: 'Textos persuasivos gerados automaticamente para cada tipo de divulgação'
    },
    {
      icon: Upload,
      title: 'Logo Automática',
      description: 'Faça upload uma vez e sua logo aparece em todos os banners criados'
    },
    {
      icon: Zap,
      title: 'Criação em Segundos',
      description: 'Do conceito ao banner finalizado em menos de 30 segundos'
    },
    {
      icon: Calendar,
      title: 'Calendário Inteligente',
      description: 'Sugestões automáticas baseadas em datas comemorativas e sazonalidade'
    },
    {
      icon: Users,
      title: 'Modo Agência',
      description: 'Gerencie múltiplos clientes com pastas organizadas e colaboração'
    },
    {
      icon: BarChart3,
      title: 'Templates Focados',
      description: 'Designs otimizados especificamente para IPTV e pequenos negócios'
    }
  ];

  const testimonials = [
    {
      name: 'Carlos Silva',
      business: 'IPTV Premium',
      text: 'Triplicou meus revendedores em 2 meses usando os banners automáticos',
      image: '/placeholder-avatar-1.jpg'
    },
    {
      name: 'Marina Agência',
      business: 'Social Media',
      text: 'Economizo 20 horas por semana criando artes para meus 15 clientes',
      image: '/placeholder-avatar-2.jpg'
    },
    {
      name: 'João Delivery',
      business: 'Restaurante',
      text: 'Aumento de 40% nas vendas depois que comecei a postar diariamente',
      image: '/placeholder-avatar-3.jpg'
    }
  ];

  const useCases = [
    {
      title: 'Revendedores IPTV',
      description: 'Crie banners para promoções, novos conteúdos e captação de sub-revendedores',
      examples: ['Promoção primeiro mês grátis', 'Novo filme disponível', 'Seja nosso parceiro']
    },
    {
      title: 'Delivery & Comércio Local',
      description: 'Divulgue ofertas, novos produtos e atraia mais clientes',
      examples: ['Oferta do dia', 'Cardápio semanal', 'Promoção frete grátis']
    },
    {
      title: 'Agências & Freelancers',
      description: 'Atenda múltiplos clientes com agilidade e qualidade profissional',
      examples: ['Gestão de 20+ marcas', 'Agendamento automático', 'Relatórios de performance']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">PostPix IA</h1>
              <p className="text-xs text-gray-500">Banners profissionais com IA</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/pricing')}>
              Preços
            </Button>
            <Button 
              onClick={() => navigate('/dashboard')}
              className="bg-gradient-to-r from-purple-600 to-pink-600"
            >
              Começar Grátis
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-purple-100 text-purple-700 hover:bg-purple-100">
            🚀 Perfeito para IPTV, Delivery e Pequenos Negócios
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Crie banners que
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {" "}vendem{" "}
            </span>
            em segundos
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Nossa IA especializada cria textos persuasivos e banners profissionais 
            automaticamente. Ideal para revendedores IPTV, delivery, agências e 
            microempreendedores que precisam divulgar com frequência.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button 
              size="lg" 
              onClick={() => navigate('/dashboard')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3 text-lg"
            >
              Criar Primeiro Banner Grátis
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-3">
              <Play className="w-5 h-5 mr-2" />
              Ver Demo (2 min)
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <Check className="w-4 h-4 text-green-600 mr-2" />
              3 banners grátis
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 text-green-600 mr-2" />
              Sem cartão de crédito
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 text-green-600 mr-2" />
              Resultado em 30s
            </div>
          </div>
        </div>
      </section>

      {/* Demo Visual */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Como funciona?
            </h2>
            <p className="text-gray-600 text-lg">
              Simples como responder: "O que você quer divulgar hoje?"
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Descreva sua divulgação</h3>
              <p className="text-gray-600 text-sm">
                "Promoção 50% off no primeiro mês do IPTV Premium"
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">IA gera textos + templates</h3>
              <p className="text-gray-600 text-sm">
                Copy persuasivo + 3 opções de design + sua logo integrada
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Baixe e publique</h3>
              <p className="text-gray-600 text-sm">
                Formatos otimizados para Instagram, Facebook e WhatsApp
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Por que escolher PostPix IA?
            </h2>
            <p className="text-xl text-gray-600">
              Desenvolvido especificamente para quem precisa vender online
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <feature.icon className="w-12 h-12 text-purple-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Feito para seu negócio
            </h2>
            <p className="text-xl text-gray-600">
              Seja qual for seu segmento, temos templates e textos otimizados
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{useCase.title}</h3>
                  <p className="text-gray-600 mb-6">{useCase.description}</p>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Exemplos:</p>
                    {useCase.examples.map((example, i) => (
                      <div key={i} className="flex items-center text-sm text-gray-600">
                        <Check className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                        {example}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Resultados reais de quem usa
            </h2>
            <p className="text-xl text-gray-600">
              Mais de 1.200 empreendedores já aumentaram suas vendas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-sm">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.business}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Pronto para vender mais?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Junte-se aos milhares de empreendedores que já descobriram o poder 
            dos banners automáticos com IA
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/dashboard')}
            className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
          >
            Começar Grátis Agora
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-sm mt-4 opacity-75">
            3 banners grátis • Sem cartão de crédito • Resultado em 30 segundos
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">PostPix IA</span>
          </div>
          <p className="text-gray-400 mb-8">
            Transformando pequenos negócios com o poder da IA
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Templates</li>
                <li>IA Copywriting</li>
                <li>Upload de Logo</li>
                <li>Modo Agência</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Casos de Uso</h4>
              <ul className="space-y-2 text-gray-400">
                <li>IPTV</li>
                <li>Delivery</li>
                <li>E-commerce</li>
                <li>Serviços</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Recursos</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Blog</li>
                <li>Tutoriais</li>
                <li>Suporte</li>
                <li>Status</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Sobre</li>
                <li>Contato</li>
                <li>Privacidade</li>
                <li>Termos</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-gray-400 text-sm">
            © 2024 PostPix IA. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
