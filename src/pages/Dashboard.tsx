
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, Sparkles, Calendar, Users, BarChart3, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userPlan] = useState('free'); // free, pro, agency

  const quickActions = [
    {
      title: "Criar Banner Promocional",
      description: "Divulgue promoções e ofertas especiais",
      icon: Sparkles,
      category: "promocao",
      popular: true
    },
    {
      title: "Novo Conteúdo IPTV",
      description: "Anuncia lançamentos de filmes e séries",
      icon: Upload,
      category: "iptv",
      popular: true
    },
    {
      title: "Data Comemorativa",
      description: "Posts para feriados e datas especiais",
      icon: Calendar,
      category: "comemorativa"
    },
    {
      title: "Captar Revendedores",
      description: "Artes para atrair novos parceiros",
      icon: Users,
      category: "revendedor"
    }
  ];

  const recentProjects = [
    { name: "Promoção Black Friday", type: "Promocional", date: "Hoje" },
    { name: "Novo Filme - Avatar 3", type: "IPTV", date: "Ontem" },
    { name: "Dia das Mães 2024", type: "Comemorativa", date: "2 dias atrás" }
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
              <p className="text-sm text-gray-500">Crie banners profissionais em segundos</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant={userPlan === 'free' ? 'secondary' : 'default'}>
              {userPlan === 'free' ? 'Gratuito' : userPlan === 'pro' ? 'Pro' : 'Agência'}
            </Badge>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Configurações
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            O que você quer divulgar hoje?
          </h2>
          <p className="text-lg text-gray-600">
            Nossa IA vai criar o banner perfeito para você em segundos
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => navigate(`/create?category=${action.category}`)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <action.icon className="w-8 h-8 text-purple-600 group-hover:text-purple-700" />
                  {action.popular && (
                    <Badge variant="secondary" className="text-xs">Popular</Badge>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Projects */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Projetos Recentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProjects.map((project, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{project.name}</h4>
                        <p className="text-sm text-gray-500">{project.type}</p>
                      </div>
                      <span className="text-sm text-gray-400">{project.date}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Ver Todos os Projetos
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Plan Usage */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Seu Plano</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Banners criados</span>
                      <span className="text-sm font-medium">
                        {userPlan === 'free' ? '2/3' : 'Ilimitado'}
                      </span>
                    </div>
                    {userPlan === 'free' && (
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '66%' }}></div>
                      </div>
                    )}
                  </div>
                  
                  {userPlan === 'free' && (
                    <div className="pt-4 border-t">
                      <p className="text-sm text-gray-600 mb-3">
                        Upgrade para criar banners ilimitados sem marca d'água
                      </p>
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                        Upgrade para Pro - R$ 29/mês
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
