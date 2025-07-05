
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Clock, Trophy, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from 'sonner';
import MainLayout from '@/components/layout/MainLayout';

interface FootballMatch {
  fixture: {
    id: number;
    date: string;
    status: {
      long: string;
    };
  };
  teams: {
    home: {
      name: string;
      logo: string;
    };
    away: {
      name: string;
      logo: string;
    };
  };
  league: {
    name: string;
    logo: string;
  };
}

const SportsEvents = () => {
  const [matches, setMatches] = useState<FootballMatch[]>([]);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMatches(selectedDate);
  }, [selectedDate]);

  const fetchMatches = async (date: string) => {
    setLoading(true);
    try {
      // Simulando dados da API de futebol (substitua pela API real)
      const mockMatches: FootballMatch[] = [
        {
          fixture: {
            id: 1,
            date: `${date}T20:00:00Z`,
            status: { long: 'Not Started' }
          },
          teams: {
            home: { name: 'Flamengo', logo: 'https://logoeps.com/wp-content/uploads/2013/02/flamengo-vector-logo.png' },
            away: { name: 'Palmeiras', logo: 'https://logoeps.com/wp-content/uploads/2013/02/palmeiras-vector-logo.png' }
          },
          league: { name: 'Brasileirão Série A', logo: '' }
        },
        {
          fixture: {
            id: 2,
            date: `${date}T18:30:00Z`,
            status: { long: 'Not Started' }
          },
          teams: {
            home: { name: 'São Paulo', logo: 'https://logoeps.com/wp-content/uploads/2013/02/sao-paulo-vector-logo.png' },
            away: { name: 'Corinthians', logo: 'https://logoeps.com/wp-content/uploads/2013/02/corinthians-vector-logo.png' }
          },
          league: { name: 'Brasileirão Série A', logo: '' }
        }
      ];

      setMatches(mockMatches);
    } catch (error) {
      toast.error('Erro ao carregar jogos');
    } finally {
      setLoading(false);
    }
  };

  const generateBanner = async (match: FootballMatch) => {
    try {
      toast.success(`Banner gerado para ${match.teams.home.name} vs ${match.teams.away.name}!`);
      // Aqui integraria com a geração real do banner
    } catch (error) {
      toast.error('Erro ao gerar banner');
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Eventos Esportivos</h1>
            <p className="text-gray-600 mt-1">
              Gere banners automaticamente para jogos de futebol
            </p>
          </div>
          <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2">
            <Trophy className="w-4 h-4 mr-2" />
            Futebol Brasileiro
          </Badge>
        </div>

        {/* Date Selector */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2" />
              Selecionar Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="max-w-xs"
            />
          </CardContent>
        </Card>

        {/* Matches List */}
        <div className="grid gap-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando jogos...</p>
            </div>
          ) : matches.length > 0 ? (
            matches.map((match) => (
              <Card key={match.fixture.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      {/* Home Team */}
                      <div className="flex items-center space-x-3">
                        <img 
                          src={match.teams.home.logo} 
                          alt={match.teams.home.name}
                          className="w-12 h-12 object-contain"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder.svg';
                          }}
                        />
                        <div>
                          <p className="font-semibold text-lg">{match.teams.home.name}</p>
                          <p className="text-sm text-gray-500">Casa</p>
                        </div>
                      </div>

                      {/* VS */}
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-400">VS</p>
                        <div className="flex items-center justify-center text-sm text-gray-500 mt-1">
                          <Clock className="w-4 h-4 mr-1" />
                          {format(new Date(match.fixture.date), 'HH:mm', { locale: ptBR })}
                        </div>
                      </div>

                      {/* Away Team */}
                      <div className="flex items-center space-x-3">
                        <img 
                          src={match.teams.away.logo} 
                          alt={match.teams.away.name}
                          className="w-12 h-12 object-contain"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder.svg';
                          }}
                        />
                        <div>
                          <p className="font-semibold text-lg">{match.teams.away.name}</p>
                          <p className="text-sm text-gray-500">Visitante</p>
                        </div>
                      </div>
                    </div>

                    <div className="text-right space-y-2">
                      <Badge variant="secondary">{match.league.name}</Badge>
                      <Button 
                        onClick={() => generateBanner(match)}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Gerar Banner
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Nenhum jogo encontrado
                </h3>
                <p className="text-gray-600">
                  Não há jogos programados para esta data
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default SportsEvents;
