
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import LogoUploader from '@/components/LogoUploader';
import BannerGenerator from '@/components/BannerGenerator';
import { 
  LayoutDashboard, 
  Image, 
  Settings, 
  LogOut, 
  Plus,
  TrendingUp,
  Users,
  Calendar
} from 'lucide-react';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [recentBanners, setRecentBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadProfile();
      loadRecentBanners();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user!.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (!data) {
        // Create profile if it doesn't exist
        const { data: newProfile, error: insertError } = await supabase
          .from('profiles')
          .insert({
            user_id: user!.id,
            full_name: user!.user_metadata?.full_name,
            business_name: user!.user_metadata?.business_name,
          })
          .select()
          .single();
        
        if (insertError) throw insertError;
        setProfile(newProfile);
      } else {
        setProfile(data);
      }
    } catch (error: any) {
      console.error('Error loading profile:', error);
      toast.error('Erro ao carregar perfil');
    } finally {
      setLoading(false);
    }
  };

  const loadRecentBanners = async () => {
    try {
      const { data, error } = await supabase
        .from('banners')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setRecentBanners(data || []);
    } catch (error: any) {
      console.error('Error loading banners:', error);
    }
  };

  const handleLogoUpload = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user!.id}/logo.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('logos')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('logos')
        .getPublicUrl(fileName);

      // Update profile with logo URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ logo_url: publicUrl })
        .eq('user_id', user!.id);

      if (updateError) throw updateError;

      setProfile(prev => ({ ...prev, logo_url: publicUrl }));
      toast.success('Logo salva com sucesso!');
    } catch (error: any) {
      console.error('Error uploading logo:', error);
      toast.error('Erro ao fazer upload do logo');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">PostPix IA</h1>
                <p className="text-sm text-gray-500">Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Olá, {profile?.full_name || user?.email}!
              </span>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Banners Criados</CardDescription>
                  <CardTitle className="text-2xl">{recentBanners.length}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Este mês
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Plano Atual</CardDescription>
                  <CardTitle className="text-2xl capitalize">{profile?.plan || 'Free'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-blue-600">
                    <Users className="w-4 h-4 mr-1" />
                    {profile?.plan === 'free' ? '3/mês' : 'Ilimitado'}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Próximas Datas</CardDescription>
                  <CardTitle className="text-2xl">5</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-purple-600">
                    <Calendar className="w-4 h-4 mr-1" />
                    Comemorativas
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Banner Generator */}
            <BannerGenerator />

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Logo Upload */}
            <LogoUploader 
              onLogoUpload={handleLogoUpload}
              currentLogo={profile?.logo_url}
            />

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/create')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Banner
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Image className="w-4 h-4 mr-2" />
                  Meus Banners
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Configurações
                </Button>
              </CardContent>
            </Card>

            {/* Recent Banners */}
            {recentBanners.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Banners Recentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentBanners.slice(0, 3).map((banner: any) => (
                      <div key={banner.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                          <Image className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {banner.title}
                          </p>
                          <p className="text-xs text-gray-500 capitalize">
                            {banner.category.replace('_', ' ')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
