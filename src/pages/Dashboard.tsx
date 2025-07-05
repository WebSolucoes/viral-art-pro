
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { 
  BarChart3, 
  Crown, 
  History, 
  LogOut, 
  Plus, 
  Settings, 
  Sparkles,
  Palette,
  Library
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

import ImprovedBannerGenerator from '@/components/ImprovedBannerGenerator';
import TemplateLibrary from '@/components/TemplateLibrary';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('generator');

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
      toast.success('Logout realizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao fazer logout');
    }
  };

  const stats = [
    { title: 'Banners Criados', value: '12', icon: BarChart3, color: 'text-blue-600' },
    { title: 'Templates Salvos', value: '3', icon: Palette, color: 'text-purple-600' },
    { title: 'Downloads', value: '28', icon: History, color: 'text-green-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-purple-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                PostPix IA
              </h1>
            </div>
            <Badge variant="secondary" className="hidden md:block">
              Dashboard
            </Badge>
          </div>

          <div className="flex items-center space-x-4">
            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <Crown className="w-3 h-3 mr-1" />
              Plano Gratuito
            </Badge>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Olá, {user?.email?.split('@')[0]}!</span>
            </div>

            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="generator" className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>Gerador IA</span>
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center space-x-2">
              <Library className="w-4 h-4" />
              <span>Templates</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center space-x-2">
              <History className="w-4 h-4" />
              <span>Histórico</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generator">
            <ImprovedBannerGenerator />
          </TabsContent>

          <TabsContent value="templates">
            <TemplateLibrary />
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Seus Banners Criados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <History className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Nenhum banner ainda
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Seus banners criados aparecerão aqui
                  </p>
                  <Button 
                    onClick={() => setActiveTab('generator')}
                    className="bg-gradient-to-r from-purple-600 to-blue-600"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Primeiro Banner
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
