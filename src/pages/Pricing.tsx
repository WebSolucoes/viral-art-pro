
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Sparkles, Users, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Gratuito',
      price: 'R$ 0',
      period: '/mês',
      description: 'Perfeito para testar a plataforma',
      icon: Sparkles,
      color: 'from-gray-400 to-gray-600',
      features: [
        '3 banners por mês',
        'Templates básicos',
        'Textos gerados por IA',
        'Marca d\'água PostPix IA',
        'Exportação para redes sociais',
        'Suporte por email'
      ],
      limitations: [
        'Marca d\'água nos banners',
        'Apenas 3 banners/mês',
        'Templates limitados'
      ],
      cta: 'Começar Grátis',
      popular: false
    },
    {
      name: 'Pro',
      price: 'R$ 29',
      period: '/mês',
      description: 'Ideal para empreendedores e pequenos negócios',
      icon: Sparkles,
      color: 'from-purple-600 to-pink-600',
      features: [
        'Banners ilimitados',
        'Biblioteca completa de templates',
        'Upload de logo personalizada',
        'Sem marca d\'água',
        'IA avançada para copywriting',
        'Calendário de conteúdo',
        'Exportação HD',
        'Suporte prioritário',
        'Novos templates semanais'
      ],
      limitations: [],
      cta: 'Começar Pro',
      popular: true
    },
    {
      name: 'Agência',
      price: 'R$ 99',
      period: '/mês',
      description: 'Para agências e profissionais que atendem múltiplos clientes',
      icon: Building2,
      color: 'from-indigo-600 to-purple-600',
      features: [
        'Tudo do plano Pro',
        'Até 20 marcas/clientes',
        'Pastas organizadas por cliente',
        'Agendamento de posts',
        'Colaboração em equipe',
        'Relatórios de performance',
        'API para integrações',
        'Templates exclusivos',
        'Suporte dedicado',
        'Treinamento personalizado'
      ],
      limitations: [],
      cta: 'Começar Agência',
      popular: false
    }
  ];

  const testimonials = [
    {
      name: 'Carlos Silva',
      business: 'IPTV Premium',
      text: 'Consegui triplicar meus revendedores usando os banners do PostPix IA. A qualidade é impressionante!',
      rating: 5
    },
    {
      name: 'Marina Santos',
      business: 'Agência Digital Local',
      text: 'Economizo 4 horas por dia criando artes para meus clientes. O investimento se paga sozinho.',
      rating: 5
    },
    {
      name: 'João Delivery',
      business: 'Restaurante',
      text: 'Nunca pensei que seria tão fácil criar banners profissionais. Minhas vendas aumentaram 40%.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">PostPix IA</h1>
              <p className="text-sm text-gray-500">Planos e Preços</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
          >
            Voltar ao Dashboard
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Escolha o plano ideal para você
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Desde quem está começando até agências que atendem múltiplos clientes, 
            temos o plano perfeito para impulsionar seu negócio
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative ${plan.popular ? 'ring-2 ring-purple-600 scale-105' : ''} hover:shadow-xl transition-all`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    Mais Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                <p className="text-gray-600 mt-2">{plan.description}</p>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                      : 'bg-gray-900'
                  }`}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            O que nossos clientes dizem
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.business}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-lg p-8">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Perguntas Frequentes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Posso cancelar a qualquer momento?
              </h4>
              <p className="text-gray-600">
                Sim! Você pode cancelar seu plano a qualquer momento sem taxas ou penalidades.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Como funciona o upload de logo?
              </h4>
              <p className="text-gray-600">
                Faça upload uma vez e sua logo será automaticamente inserida em todos os banners criados.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                A IA realmente funciona bem?
              </h4>
              <p className="text-gray-600">
                Nossa IA é treinada especificamente para marketing digital e copy persuasivo para pequenos negócios.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Posso usar para múltiplos negócios?
              </h4>
              <p className="text-gray-600">
                No plano Agência, você pode gerenciar até 20 marcas diferentes com pastas organizadas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
