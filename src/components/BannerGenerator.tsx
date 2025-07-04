
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Sparkles, Download, Eye, Copy } from 'lucide-react';

const BannerGenerator = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    contentName: '',
    customText: '',
  });
  const [generatedBanner, setGeneratedBanner] = useState<{
    text: string;
    imageUrl?: string;
    tmdbData?: any;
  } | null>(null);

  const categories = [
    { value: 'nova_serie', label: 'Nova Série/Filme' },
    { value: 'promocao', label: 'Promoção' },
    { value: 'comemorativo', label: 'Data Comemorativa' },
    { value: 'revendedor', label: 'Captação de Revendedores' },
  ];

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
        console.log('TMDB Data:', tmdbData);
      }

      // 2. Gerar texto com IA
      const generatedText = await generateTextWithAI(formData, tmdbData);
      console.log('Generated text:', generatedText);

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
      console.log('TMDB API Response:', data);
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
      // Fallback para templates básicos se a IA falhar
      return getFallbackText(formData, tmdbData);
    }
  };

  const getFallbackText = (formData: any, tmdbData: any) => {
    const templates = {
      nova_serie: `🎬 NOVIDADE NO CATÁLOGO! 🎬\n\n${tmdbData?.name || tmdbData?.title || formData.contentName} ${tmdbData ? `(${tmdbData.vote_average?.toFixed(1)}/10 ⭐)` : ''}\n\n${tmdbData?.overview?.substring(0, 100) || 'Nova série imperdível chegou!'}\n\n🔥 Assista agora no nosso IPTV!\n💥 Qualidade 4K disponível\n\n👆 Entre em contato e assine já!`,
      promocao: `🚨 OFERTA IMPERDÍVEL! 🚨\n\n${formData.title}\n\n💰 Preço especial por tempo limitado\n🎁 Bônus exclusivos para novos clientes\n⚡ Ativação imediata\n\n📱 Chama no WhatsApp e garante já!`,
      comemorativo: `🎉 ${formData.title} 🎉\n\nComemore conosco com ofertas especiais!\n\n🎁 Promoções exclusivas\n💫 Benefícios únicos\n⭐ Atendimento premium\n\n📞 Entre em contato e aproveite!`,
      revendedor: `💼 OPORTUNIDADE DE NEGÓCIO! 💼\n\n${formData.title}\n\n🚀 Seja nosso parceiro\n💰 Comissões atrativas\n📈 Suporte completo\n🎯 Material de divulgação incluso\n\n📱 Chama no WhatsApp e vamos conversar!`
    };

    return templates[formData.category as keyof typeof templates] || formData.customText;
  };

  const copyToClipboard = async () => {
    if (generatedBanner?.text) {
      await navigator.clipboard.writeText(generatedBanner.text);
      toast.success('Texto copiado para a área de transferência!');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span>Gerador de Banners com IA</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Tipo de Banner</Label>
              <Select value={formData.category} onValueChange={(value) => 
                setFormData(prev => ({ ...prev, category: value }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Escolha o tipo" />
                </SelectTrigger>
                <SelectContent>
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
                placeholder="Ex: Promoção de Natal, Breaking Bad"
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
                placeholder="Ex: Stranger Things, Vingadores"
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
            />
          </div>

          <Button 
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            {loading ? 'Gerando...' : 'Gerar Banner com IA'}
          </Button>
        </CardContent>
      </Card>

      {generatedBanner && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-green-600" />
              <span>Preview do Banner</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-br from-blue-900 to-purple-900 p-6 rounded-lg text-white">
              <div className="flex items-start space-x-4">
                {generatedBanner.imageUrl && (
                  <img 
                    src={generatedBanner.imageUrl} 
                    alt="Poster"
                    className="w-24 h-36 object-cover rounded-lg shadow-lg"
                  />
                )}
                <div className="flex-1">
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {generatedBanner.text}
                  </div>
                  {generatedBanner.tmdbData && (
                    <div className="mt-3 text-xs opacity-75">
                      <p>⭐ {generatedBanner.tmdbData.vote_average?.toFixed(1)}/10</p>
                      <p>📅 {generatedBanner.tmdbData.release_date || generatedBanner.tmdbData.first_air_date}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex space-x-2">
              <Button 
                onClick={copyToClipboard}
                className="flex-1"
                variant="outline"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copiar Texto
              </Button>
              <Button className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Baixar Banner
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BannerGenerator;
