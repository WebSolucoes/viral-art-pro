
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Star, Calendar, Sparkles, Film } from 'lucide-react';
import { toast } from 'sonner';
import MainLayout from '@/components/layout/MainLayout';

interface TMDBContent {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  media_type?: string;
}

const MoviesAndSeries = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<TMDBContent[]>([]);
  const [loading, setLoading] = useState(false);

  const searchContent = async () => {
    if (!searchQuery.trim()) {
      toast.error('Digite um título para buscar');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=9ad8d9636cfef372a0cdc36cda29393a&query=${encodeURIComponent(searchQuery)}&language=pt-BR`
      );
      const data = await response.json();
      
      // Filtrar apenas filmes e séries
      const filteredResults = data.results?.filter((item: TMDBContent) => 
        item.media_type === 'movie' || item.media_type === 'tv'
      ) || [];
      
      setSearchResults(filteredResults.slice(0, 12)); // Limitar a 12 resultados
    } catch (error) {
      toast.error('Erro ao buscar conteúdo');
    } finally {
      setLoading(false);
    }
  };

  const generateBanner = async (content: TMDBContent) => {
    try {
      toast.success(`Banner gerado para ${content.title || content.name}!`);
      // Aqui integraria com a geração real do banner
    } catch (error) {
      toast.error('Erro ao gerar banner');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchContent();
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Filmes & Séries</h1>
            <p className="text-gray-600 mt-1">
              Busque e gere banners para filmes e séries
            </p>
          </div>
          <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2">
            <Film className="w-4 h-4 mr-2" />
            TMDB API
          </Badge>
        </div>

        {/* Search */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Buscar Conteúdo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Input
                placeholder="Digite o nome do filme ou série..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button 
                onClick={searchContent}
                disabled={loading}
                className="bg-gradient-to-r from-purple-600 to-blue-600"
              >
                {loading ? 'Buscando...' : 'Buscar'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {searchResults.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResults.map((content) => (
              <Card key={content.id} className="hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={content.poster_path 
                      ? `https://image.tmdb.org/t/p/w500${content.poster_path}`
                      : '/placeholder.svg'
                    }
                    alt={content.title || content.name}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  <Badge 
                    className={`absolute top-2 right-2 ${
                      content.media_type === 'movie' 
                        ? 'bg-blue-600' 
                        : 'bg-green-600'
                    }`}
                  >
                    {content.media_type === 'movie' ? 'Filme' : 'Série'}
                  </Badge>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                    {content.title || content.name}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium">
                        {content.vote_average.toFixed(1)}
                      </span>
                    </div>
                    {(content.release_date || content.first_air_date) && (
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(content.release_date || content.first_air_date!).getFullYear()}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {content.overview || 'Sem descrição disponível'}
                  </p>
                  
                  <Button 
                    onClick={() => generateBanner(content)}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    size="sm"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Gerar Banner
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && searchResults.length === 0 && searchQuery === '' && (
          <Card>
            <CardContent className="text-center py-12">
              <Film className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Busque por filmes e séries
              </h3>
              <p className="text-gray-600">
                Digite o nome do conteúdo que deseja encontrar
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default MoviesAndSeries;
