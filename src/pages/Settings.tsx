
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { User, Building, Palette, Crown, Upload, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import MainLayout from '@/components/layout/MainLayout';

interface PlanLimits {
  banners_per_month: number;
  storage_gb: number;
}

interface UserProfile {
  full_name?: string;
  business_name?: string;
  logo_url?: string;
  plan: string;
  banners_created_this_month: number;
  plan_limits?: PlanLimits;
}

interface UserSettings {
  brand_name?: string;
  primary_color: string;
  secondary_color: string;
}

const Settings = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [settings, setSettings] = useState<UserSettings>({
    primary_color: '#3B82F6',
    secondary_color: '#1E40AF'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      console.log('Buscando dados do usuário...');
      
      // Buscar perfil
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user!.id)
        .single();

      if (profileError) {
        console.error('Erro ao buscar perfil:', profileError);
        // Se não existe perfil, criar um novo
        if (profileError.code === 'PGRST116') {
          console.log('Perfil não encontrado, criando um novo...');
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert({
              user_id: user!.id,
              plan: 'free',
              banners_created_this_month: 0,
              plan_limits: { banners_per_month: 3, storage_gb: 1 }
            })
            .select()
            .single();

          if (createError) {
            console.error('Erro ao criar perfil:', createError);
            throw createError;
          }
          
          profileData = newProfile;
        } else {
          throw profileError;
        }
      }

      if (profileData) {
        console.log('Dados do perfil:', profileData);
        
        // Safely parse plan_limits
        let parsedLimits: PlanLimits | undefined;
        if (profileData.plan_limits) {
          try {
            parsedLimits = profileData.plan_limits as unknown as PlanLimits;
          } catch (error) {
            console.error('Erro ao fazer parse dos limites do plano:', error);
            parsedLimits = { banners_per_month: 3, storage_gb: 1 };
          }
        }

        setProfile({
          full_name: profileData.full_name,
          business_name: profileData.business_name,
          logo_url: profileData.logo_url,
          plan: profileData.plan || 'free',
          banners_created_this_month: profileData.banners_created_this_month || 0,
          plan_limits: parsedLimits
        });
      }

      // Buscar configurações
      const { data: settingsData, error: settingsError } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user!.id)
        .single();

      if (settingsError && settingsError.code !== 'PGRST116') {
        console.error('Erro ao buscar configurações:', settingsError);
      }

      if (settingsData) {
        console.log('Configurações encontradas:', settingsData);
        setSettings(settingsData);
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      toast.error('Erro ao carregar dados do usuário');
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    if (!profile) return;
    
    setSaving(true);
    try {
      console.log('Salvando perfil:', profile);
      
      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user!.id,
          full_name: profile.full_name,
          business_name: profile.business_name,
        }, {
          onConflict: 'user_id'
        });

      if (error) {
        console.error('Erro ao salvar perfil:', error);
        throw error;
      }
      
      console.log('Perfil salvo com sucesso');
      toast.success('Perfil atualizado com sucesso!');
    } catch (error: any) {
      console.error('Erro completo ao salvar perfil:', error);
      toast.error('Erro ao salvar perfil: ' + (error.message || 'Erro desconhecido'));
    } finally {
      setSaving(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      console.log('Salvando configurações:', settings);
      
      const { error } = await supabase
        .from('user_settings')
        .upsert({
          user_id: user!.id,
          brand_name: settings.brand_name,
          primary_color: settings.primary_color,
          secondary_color: settings.secondary_color,
        }, {
          onConflict: 'user_id'
        });

      if (error) {
        console.error('Erro ao salvar configurações:', error);
        throw error;
      }
      
      console.log('Configurações salvas com sucesso');
      toast.success('Configurações salvas com sucesso!');
    } catch (error: any) {
      console.error('Erro completo ao salvar configurações:', error);
      toast.error('Erro ao salvar configurações: ' + (error.message || 'Erro desconhecido'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando configurações...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
          <p className="text-gray-600 mt-1">
            Gerencie seu perfil e preferências da conta
          </p>
        </div>

        {/* Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              Informações Pessoais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nome Completo</Label>
                <Input
                  id="fullName"
                  value={profile?.full_name || ''}
                  onChange={(e) => setProfile(prev => prev ? {...prev, full_name: e.target.value} : null)}
                  placeholder="Seu nome completo"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={user?.email || ''}
                  disabled
                  className="bg-gray-50"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessName">Nome do Negócio</Label>
              <Input
                id="businessName"
                value={profile?.business_name || ''}
                onChange={(e) => setProfile(prev => prev ? {...prev, business_name: e.target.value} : null)}
                placeholder="Nome da sua empresa ou marca"
              />
            </div>
            <Button onClick={saveProfile} disabled={saving}>
              {saving ? 'Salvando...' : 'Salvar Perfil'}
            </Button>
          </CardContent>
        </Card>

        {/* Brand Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Palette className="w-5 h-5 mr-2" />
              Configurações da Marca
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="brandName">Nome da Marca nos Banners</Label>
              <Input
                id="brandName"
                value={settings.brand_name || ''}
                onChange={(e) => setSettings(prev => ({...prev, brand_name: e.target.value}))}
                placeholder="Nome que aparecerá nos banners"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Cor Primária</Label>
                <div className="flex space-x-2">
                  <Input
                    id="primaryColor"
                    type="color"
                    value={settings.primary_color}
                    onChange={(e) => setSettings(prev => ({...prev, primary_color: e.target.value}))}
                    className="w-16 h-10 p-1"
                  />
                  <Input
                    value={settings.primary_color}
                    onChange={(e) => setSettings(prev => ({...prev, primary_color: e.target.value}))}
                    placeholder="#3B82F6"
                    className="flex-1"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondaryColor">Cor Secundária</Label>
                <div className="flex space-x-2">
                  <Input
                    id="secondaryColor"
                    type="color"
                    value={settings.secondary_color}
                    onChange={(e) => setSettings(prev => ({...prev, secondary_color: e.target.value}))}
                    className="w-16 h-10 p-1"
                  />
                  <Input
                    value={settings.secondary_color}
                    onChange={(e) => setSettings(prev => ({...prev, secondary_color: e.target.value}))}
                    placeholder="#1E40AF"
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
            <Button onClick={saveSettings} disabled={saving}>
              {saving ? 'Salvando...' : 'Salvar Configurações'}
            </Button>
          </CardContent>
        </Card>

        {/* Plan Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Crown className="w-5 h-5 mr-2" />
              Plano Atual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white mb-2">
                  <Crown className="w-4 h-4 mr-2" />
                  Plano {profile?.plan || 'Free'}
                </Badge>
                <p className="text-sm text-gray-600">
                  Banners criados este mês: {profile?.banners_created_this_month || 0} / {profile?.plan_limits?.banners_per_month || 3}
                </p>
              </div>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                Fazer Upgrade
              </Button>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Benefícios do seu plano:</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  {profile?.plan_limits?.banners_per_month || 3} banners por mês
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  {profile?.plan_limits?.storage_gb || 1}GB de armazenamento
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Templates básicos
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Settings;
