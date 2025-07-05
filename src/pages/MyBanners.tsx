
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Trash2, Filter, Image as ImageIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import MainLayout from '@/components/layout/MainLayout';

interface Banner {
  id: string;
  title: string;
  category: string;
  banner_url?: string;
  banner_type: string;
  dimensions: string;
  created_at: string;
}

const MyBanners = () => {
  const { user } = useAuth();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (user) {
      fetchBanners();
    }
  }, [user]);

  const fetchBanners = async () => {
    try {
      const { data, error } = await supabase
        .from('banners')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBanners(data || []);
    } catch (error) {
      toast.error('Erro ao carregar banners');
    } finally {
      setLoading(false);
    }
  };

  const deleteBanner = async (bannerId: string) => {
    try {
      const { error } = await supabase
        .from('banners')
        .delete()
        .eq('id', bannerId);

      if (error) throw error;
      
      setBanners(banners.filter(banner => banner.id !== bannerId));
      toast.success('Banner excluído com sucesso!');
    } catch (error) {
      toast.error('Erro ao excluir banner');
    }
  };

  const downloadBanner = async (banner: Banner) => {
    // Simulação do download - em produção seria o arquivo real
    toast.success(`Download iniciado: ${banner.title}`);
  };

  const getCategoryLabel = (category: string) => {
    const categories = {
      nova_serie: 'Nova Série',
      promocao: 'Promoção',
      comemorativo: 'Comemorativo',
      revendedor: 'Revendedor',
      sports: 'Esportes'
    };
    return categories[category as keyof typeof categories] || category;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      nova_serie: 'bg-purple-100 text-purple-800',
      promocao: 'bg-red-100 text-red-800',
      comemorativo: 'bg-green-100 text-green-800',
      revendedor: 'bg-blue-100 text-blue-800',
      sports: 'bg-orange-100 text-orange-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const filteredBanners = filter === 'all' 
    ? banners 
    : banners.filter(banner => banner.category === filter);

  if (loading) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando banners...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Meus Banners</h1>
            <p className="text-gray-600 mt-1">
              Gerencie todos os seus banners criados
            </p>
          </div>
          <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2">
            {banners.length} Banner{banners.length !== 1 ? 's' : ''}
          </Badge>
        </div>

        {/* Filter */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filtrar Banners
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="max-w-xs">
                <SelectValue placeholder="Filtrar por categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os banners</SelectItem>
                <SelectItem value="nova_serie">Nova Série</SelectItem>
                <SelectItem value="promocao">Promoção</SelectItem>
                <SelectItem value="comemorativo">Comemorativo</SelectItem>
                <SelectItem value="revendedor">Revendedor</SelectItem>
                <SelectItem value="sports">Esportes</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Banners Grid */}
        {filteredBanners.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBanners.map((banner) => (
              <Card key={banner.id} className="hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-purple-100 to-blue-100 rounded-t-lg flex items-center justify-center">
                  {banner.banner_url ? (
                    <img 
                      src={banner.banner_url} 
                      alt={banner.title}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  ) : (
                    <ImageIcon className="w-16 h-16 text-gray-400" />
                  )}
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg truncate">
                      {banner.title}
                    </h3>
                    <Badge className={getCategoryColor(banner.category)}>
                      {getCategoryLabel(banner.category)}
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-gray-500 mb-3">
                    <p>Formato: {banner.dimensions}</p>
                    <p>Criado em: {format(new Date(banner.created_at), 'dd/MM/yyyy', { locale: ptBR })}</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      onClick={() => downloadBanner(banner)}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Baixar
                    </Button>
                    <Button 
                      onClick={() => deleteBanner(banner.id)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {filter === 'all' ? 'Nenhum banner criado' : 'Nenhum banner encontrado'}
              </h3>
              <p className="text-gray-600">
                {filter === 'all' 
                  ? 'Comece criando seu primeiro banner!'
                  : 'Tente alterar o filtro para ver outros banners'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default MyBanners;
