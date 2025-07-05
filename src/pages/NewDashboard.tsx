import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Calendar, 
  Film, 
  Image as ImageIcon, 
  Plus, 
  Crown,
  Sparkles,
  TrendingUp,
  Users,
  Upload
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import MainLayout from '@/components/layout/MainLayout';
import LogoManager from '@/components/LogoManager';

interface DashboardStats {
  totalBanners: number;
  bannersThisMonth: number;
  planLimit: number;
}

interface PlanLimits {
  banners_per_month: number;
  storage_gb: number;
}

const NewDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    totalBanners: 0,
    bannersThisMonth: 0,
    planLimit: 3
  });
  const [userLogo, setUserLogo] = useState<string>('');

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      // Buscar estatísticas de banners
      const { data: bannersData } = await supabase
        .from('banners')
        .select('created_at')
        .eq('user_id', user!.id);

      // Buscar dados do perfil
      const { data: profileData } = await supabase
        .from('profiles')
        .select('banners_created_this_month, plan_limits, logo_url')
        .eq('user_id', user!.id)
        .single();

      const totalBanners = bannersData?.length || 0;
      const bannersThisMonth = profileData?.banners_created_this_month || 0;
      
      // Safely parse plan_limits
      let planLimit = 3;
      if (profileData?.plan_limits) {
        const limits = profileData.plan_limits as unknown as PlanLimits;
        planLimit = limits.banners_per_month || 3;
      }
      
      setStats({
        totalBanners,
        bannersThisMonth,
        planLimit
      });

      if (profileData?.logo_url) {
        setUserLogo(profileData.logo_url);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const quickActions = [
    {
      title: 'Eventos Esportivos',
      description: 'Gere banners para jogos de futebol',
      icon: Calendar,
      path: '/sports',
      color: 'from-green-500 to-blue-500'
    },
    {
      title: 'Filmes & Séries',
      description: 'Banners para conteúdo de entretenimento',
      icon: Film,
      path: '/movies',
      color: 'from-red-500 to-pink-500'
    },
    {
      title: 'Meus Banners',
      description: 'Visualize e gerencie seus banners',
      icon: ImageIcon,
      path: '/banners',
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  const tips = [
    {
      title: 'Upload sua logo',
      description: 'Adicione a logo da sua marca para aparecer em todos os banners',
      icon: Upload
    },
    {
      title: 'Use a IA',
      description: 'Nossa IA gera textos otimizados automaticamente para cada tipo de banner',
      icon: Sparkles
    },
    {
      title: 'Múltiplos formatos',
      description: 'Gere banners para WhatsApp, Instagram e Facebook simultaneamente',
      icon: ImageIcon
    }
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Bem-vindo ao PostPix IA! 👋
            </h1>
            <p className="text-gray-600 mt-1">
              Crie banners profissionais com inteligência artificial
            </p>
          </div>
          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2">
            <Crown className="w-4 h-4 mr-2" />
            Plano Free
          </Badge>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Banners Criados</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalBanners}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Este Mês</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.bannersThisMonth}/{stats.planLimit}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Plano Atual</p>
                  <p className="text-2xl font-bold text-gray-900">Free</p>
                </div>
                <Crown className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Logo Upload */}
        <LogoManager 
          onLogoUploaded={setUserLogo}
          currentLogo={userLogo}
        />

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6" onClick={() => navigate(action.path)}>
                  <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mb-4`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {action.description}
                  </p>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Começar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="w-5 h-5 mr-2" />
              Dicas para Começar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <tip.icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {tip.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {tip.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Plan Upgrade */}
        {stats.bannersThisMonth >= stats.planLimit && (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Crown className="w-8 h-8 text-yellow-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Limite de banners atingido
                    </h3>
                    <p className="text-gray-600">
                      Faça upgrade para continuar criando banners ilimitados
                    </p>
                  </div>
                </div>
                <Button className="bg-gradient-to-r from-yellow-500 to-orange-500">
                  Fazer Upgrade
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default NewDashboard;
