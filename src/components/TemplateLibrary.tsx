
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Filter, Heart, Download, Eye } from 'lucide-react';

interface Template {
  id: number;
  name: string;
  category: string;
  style: string;
  colors: string[];
  preview: string;
  downloads: number;
  isFavorite: boolean;
  isPro?: boolean;
}

const TemplateLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedStyle, setSelectedStyle] = useState('todos');

  const categories = [
    { id: 'todos', name: 'Todos', count: 156 },
    { id: 'promocional', name: 'Promocional', count: 45 },
    { id: 'iptv', name: 'IPTV', count: 32 },
    { id: 'comemorativo', name: 'Comemorativo', count: 28 },
    { id: 'revendedor', name: 'Revendedor', count: 25 },
    { id: 'delivery', name: 'Delivery', count: 18 },
    { id: 'servicos', name: 'Serviços', count: 8 }
  ];

  const styles = [
    { id: 'todos', name: 'Todos os estilos' },
    { id: 'moderno', name: 'Moderno' },
    { id: 'minimalista', name: 'Minimalista' },
    { id: 'colorido', name: 'Colorido' },
    { id: 'elegante', name: 'Elegante' },
    { id: 'jovem', name: 'Jovem' }
  ];

  const mockTemplates: Template[] = [
    {
      id: 1,
      name: 'Promoção Flash',
      category: 'promocional',
      style: 'colorido',
      colors: ['#FF6B6B', '#4ECDC4', '#45B7D1'],
      preview: '/placeholder-template-1.jpg',
      downloads: 1240,
      isFavorite: false,
      isPro: false
    },
    {
      id: 2,
      name: 'Lançamento IPTV',
      category: 'iptv',
      style: 'moderno',
      colors: ['#667EEA', '#764BA2', '#F093FB'],
      preview: '/placeholder-template-2.jpg',
      downloads: 890,
      isFavorite: true,
      isPro: true
    },
    {
      id: 3,
      name: 'Black Friday',
      category: 'comemorativo',
      style: 'elegante',
      colors: ['#000000', '#FFD700', '#FF4757'],
      preview: '/placeholder-template-3.jpg',
      downloads: 2150,
      isFavorite: false,
      isPro: false
    },
    {
      id: 4,
      name: 'Captar Revendedores',
      category: 'revendedor',
      style: 'minimalista',
      colors: ['#2E86AB', '#A23B72', '#F18F01'],
      preview: '/placeholder-template-4.jpg',
      downloads: 650,
      isFavorite: false,
      isPro: true
    },
    {
      id: 5,
      name: 'Delivery Rápido',
      category: 'delivery',
      style: 'jovem',
      colors: ['#FF9F43', '#10AC84', '#EE5A52'],
      preview: '/placeholder-template-5.jpg',
      downloads: 430,
      isFavorite: true,
      isPro: false
    },
    {
      id: 6,
      name: 'Natal 2024',
      category: 'comemorativo',
      style: 'colorido',
      colors: ['#C0392B', '#27AE60', '#F39C12'],
      preview: '/placeholder-template-6.jpg',
      downloads: 980,
      isFavorite: false,
      isPro: false
    }
  ];

  const filteredTemplates = mockTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'todos' || template.category === selectedCategory;
    const matchesStyle = selectedStyle === 'todos' || template.style === selectedStyle;
    
    return matchesSearch && matchesCategory && matchesStyle;
  });

  const toggleFavorite = (templateId: number) => {
    // Implementar lógica de favoritos
    console.log('Toggle favorite for template:', templateId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Biblioteca de Templates</h2>
          <p className="text-gray-600">Escolha o template perfeito para sua divulgação</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar com filtros */}
        <div className="space-y-6">
          {/* Categorias */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Categorias</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-purple-100 text-purple-700'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{category.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Estilos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Estilos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {styles.map(style => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedStyle === style.id
                        ? 'bg-purple-100 text-purple-700'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {style.name}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Grid de templates */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTemplates.map(template => (
              <Card key={template.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  {/* Preview */}
                  <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br opacity-80"
                         style={{
                           background: `linear-gradient(135deg, ${template.colors.join(', ')})`
                         }}>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{template.name}</span>
                    </div>
                    
                    {/* Overlay com ações */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100">
                      <Button size="sm" variant="secondary">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                      <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600">
                        Usar Template
                      </Button>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-3 right-3 flex space-x-2">
                      {template.isPro && (
                        <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs">
                          PRO
                        </Badge>
                      )}
                      <button
                        onClick={() => toggleFavorite(template.id)}
                        className={`p-1 rounded-full transition-colors ${
                          template.isFavorite
                            ? 'bg-red-100 text-red-600'
                            : 'bg-white bg-opacity-80 text-gray-600 hover:text-red-600'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${template.isFavorite ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{template.name}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="capitalize">{template.style}</span>
                      <div className="flex items-center">
                        <Download className="w-3 h-3 mr-1" />
                        {template.downloads.toLocaleString()}
                      </div>
                    </div>
                    
                    {/* Paleta de cores */}
                    <div className="flex items-center mt-3 space-x-1">
                      {template.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-4 h-4 rounded-full border border-gray-200"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Nenhum template encontrado</p>
              <p className="text-gray-400">Tente ajustar os filtros ou buscar por outros termos</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateLibrary;
