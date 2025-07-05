
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Sparkles, Wand2 } from 'lucide-react';

import LogoManager from './LogoManager';
import FormatSelector from './FormatSelector';
import BannerCanvas from './BannerCanvas';

const ImprovedBannerGenerator = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [userLogo, setUserLogo] = useState<string>('');
  
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    contentName: '',
    customText: '',
    format: 'instagram-post'
  });

  const [generatedBanner, setGeneratedBanner] = useState<{
    text: string;
    imageUrl?: string;
    tmdbData?: any;
  } | null>(null);

  const categories = [
    { value: 'nova_serie', label: '🎬 Nova Série/Filme' },
    { value: 'promocao', label: '🔥 Promoção' },
    { value: 'comemorativo', label: '🎉 Data Comemorativa' },
    { value: 'revendedor', label: '💼 Captação de Revendedores' },
  ];

  // Carregar logo do usuário
  useEffect(() => {
    const loadUserProfile = async () => {
      if (!user) return;
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('logo_url')
        .eq('user_id', user.id)
        .single();
      
      if (profile?.logo_url) {
        setUserLogo(profile.logo_url);
      }
    };

    loadUserProfile();
  }, [user]);

  const handleGenerate = async () => {
    if (!formData.category || !formData.title) {
      toast.error('Preencha pelo menos a categoria e o título');
      return;
    }

    setLoading(true);

    try {
      // 1. Buscar dados do TMDB se for série/filme
      let tmdbData = null;
      if (formData.category === 'nova_serie' && formData.contentName) {
        tmdbData = await searchTMDB(formData.contentName);
      }

      // 2. Gerar texto com IA
      const generatedText = await generateTextWithAI(formData, tmdbData);

      // 3. Salvar no banco
      const { data: banner, error } = await supabase
        .from('banners')
        .insert({
          user_id: user!.id,
          title: formData.title,
          category: formData.category,
          content_name: formData.contentName,
          generated_text: generatedText,
          tmdb_data: tmdbData,
        })
        .select()
        .single();

      if (error) throw error;

      setGeneratedBanner({
        text: generatedText,
        imageUrl: tmdbData?.poster_path 
          ? `https://image.tmdb.org/t/p/w500${tmdbData.poster_path}`
          : undefined,
        tmdbData: tmdbData,
      });

      toast.success('Banner gerado com sucesso!');
    } catch (error: any) {
      console.error('Error generating banner:', error);
      toast.error('Erro ao gerar banner: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const searchTMDB = async (query: string) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=9ad8d9636cfef372a0cdc36cda29393a&query=${encodeURIComponent(query)}&language=pt-BR`
      );
      const data = await response.json();
      return data.results?.[0] || null;
    } catch (error) {
      console.error('TMDB search error:', error);
      return null;
    }
  };

  const generateTextWithAI = async (formData: any, tmdbData: any) => {
    try {
      const { data, error } = await supabase.functions.invoke('generate-banner-text', {
        body: {
          category: formData.category,
          title: formData.title,
          contentName: formData.contentName,
          tmdbData: tmdbData
        }
      });

      if (error) throw error;
      return data.generatedText;
    } catch (error) {
      console.error('Error generating text with AI:', error);
      return getFallbackText(formData, tmdbData);
    }
  };

  const getFallbackText = (formData: any, tmdbData: any) => {
    const templates = {
      nova_serie: `🎬 ${tmdbData?.name || tmdbData?.title || formData.contentName} chegou! ${tmdbData ? `(${tmdbData.vote_average?.toFixed(1)}/10 ⭐)` : ''}`,
      promocao: `🚨 ${formData.title} - Oferta imperdível por tempo limitado!`,
      comemorativo: `🎉 ${formData.title} - Comemore conosco com ofertas especiais!`,
      revendedor: `💼 ${formData.title} - Seja nosso parceiro e ganhe comissões atrativas!`
    };

    return templates[formData.category as keyof typeof templates] || formData.customText;
  };

  return (
    <div className="space-y-6">
      {/* Configurações */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulário */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span>Configurações do Banner</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Tipo de Banner</Label>
                <Select value={formData.category} onValueChange={(value) => 
                  setFormData(prev => ({ ...prev, category: value }))
                }>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Escolha o tipo" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-lg z-50">
                    {categories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Título Principal</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Ex: Promoção de Natal"
                  className="bg-white"
                />
              </div>
            </div>

            {formData.category === 'nova_serie' && (
              <div className="space-y-2">
                <Label htmlFor="contentName">Nome da Série/Filme</Label>
                <Input
                  id="contentName"
                  value={formData.contentName}
                  onChange={(e) => setFormData(prev => ({ ...prev, contentName: e.target.value }))}
                  placeholder="Ex: Breaking Bad, Vingadores"
                  className="bg-white"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="customText">Texto Personalizado (opcional)</Label>
              <Textarea
                id="customText"
                value={formData.customText}
                onChange={(e) => setFormData(prev => ({ ...prev, customText: e.target.value }))}
                placeholder="Deixe em branco para a IA gerar automaticamente"
                rows={3}
                className="bg-white"
              />
            </div>

            <Button 
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {loading ? (
                <>
                  <Wand2 className="w-4 h-4 mr-2 animate-spin" />
                  Gerando...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Gerar Banner com IA
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Logo Manager */}
        <LogoManager 
          onLogoUploaded={setUserLogo}
          currentLogo={userLogo}
        />
      </div>

      {/* Seletor de Formato */}
      <FormatSelector 
        selectedFormat={formData.format}
        onFormatChange={(format) => setFormData(prev => ({ ...prev, format }))}
      />

      {/* Banner Preview */}
      {generatedBanner && (
        <Card>
          <CardHeader>
            <CardTitle>Preview do Banner</CardTitle>
          </CardHeader>
          <CardContent>
            <BannerCanvas
              title={formData.title}
              subtitle={formData.contentName}
              description={generatedBanner.text}
              logoUrl={userLogo}
              backgroundImage={generatedBanner.imageUrl}
              format={formData.format as any}
              category={formData.category}
              tmdbData={generatedBanner.tmdbData}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ImprovedBannerGenerator;
