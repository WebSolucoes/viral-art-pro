
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Sparkles, Download, ArrowLeft, Wand2, Image } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const CreateBanner = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'promocao';
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [step, setStep] = useState(1); // 1: Input, 2: Upload Logo, 3: Generate, 4: Edit
  const [formData, setFormData] = useState({
    businessName: '',
    promotion: '',
    targetAudience: 'revendedores',
    tone: 'persuasivo',
    logo: null as File | null
  });
  const [generatedContent, setGeneratedContent] = useState({
    title: '',
    subtitle: '',
    description: '',
    templates: [] as any[]
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const categoryTitles = {
    promocao: 'Banner Promocional',
    iptv: 'Novo Conteúdo IPTV',
    comemorativa: 'Data Comemorativa',
    revendedor: 'Captar Revendedores'
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData({ ...formData, logo: file });
    }
  };

  const generateContent = async () => {
    setIsGenerating(true);
    
    // Simula geração de conteúdo com IA
    setTimeout(() => {
      const mockContent = {
        title: `🔥 ${formData.promotion.toUpperCase()} 🔥`,
        subtitle: `${formData.businessName} - Oferta Imperdível!`,
        description: `Não perca esta oportunidade única! ${formData.promotion} válida por tempo limitado. Garje já o seu!`,
        templates: [
          { id: 1, name: 'Moderno Gradiente', preview: '/placeholder-template-1.jpg' },
          { id: 2, name: 'Elegante Minimalista', preview: '/placeholder-template-2.jpg' },
          { id: 3, name: 'Vibrante Colorido', preview: '/placeholder-template-3.jpg' }
        ]
      };
      setGeneratedContent(mockContent);
      setIsGenerating(false);
      setStep(3);
    }, 2000);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nome do seu negócio
        </label>
        <Input
          placeholder="Ex: IPTV Premium, Loja do João, Delivery Express"
          value={formData.businessName}
          onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          O que você quer divulgar?
        </label>
        <Textarea
          placeholder="Ex: Promoção de 50% off no primeiro mês, Novo filme disponível, Black Friday com desconto especial"
          value={formData.promotion}
          onChange={(e) => setFormData({ ...formData, promotion: e.target.value })}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Público-alvo
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={formData.targetAudience}
            onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
          >
            <option value="revendedores">Revendedores</option>
            <option value="clientes-finais">Clientes Finais</option>
            <option value="empresarios">Empresários</option>
            <option value="jovens">Jovens (18-35)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tom da mensagem
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={formData.tone}
            onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
          >
            <option value="persuasivo">Persuasivo</option>
            <option value="amigavel">Amigável</option>
            <option value="profissional">Profissional</option>
            <option value="urgente">Urgente</option>
          </select>
        </div>
      </div>

      <Button 
        onClick={() => setStep(2)} 
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
        disabled={!formData.businessName || !formData.promotion}
      >
        Continuar
      </Button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 text-center">
      <div>
        <Upload className="w-16 h-16 text-purple-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Faça upload da sua logo
        </h3>
        <p className="text-gray-600">
          Sua logo será automaticamente inserida em todos os banners criados
        </p>
      </div>

      <div 
        className="border-2 border-dashed border-purple-300 rounded-lg p-8 cursor-pointer hover:border-purple-500 transition-colors"
        onClick={() => fileInputRef.current?.click()}
      >
        {formData.logo ? (
          <div>
            <Image className="w-12 h-12 text-green-600 mx-auto mb-2" />
            <p className="text-green-600 font-medium">{formData.logo.name}</p>
            <p className="text-sm text-gray-500">Clique para alterar</p>
          </div>
        ) : (
          <div>
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">Clique para fazer upload</p>
            <p className="text-sm text-gray-500">PNG, JPG até 5MB</p>
          </div>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleLogoUpload}
      />

      <div className="flex space-x-4">
        <Button 
          variant="outline" 
          onClick={() => setStep(1)}
          className="flex-1"
        >
          Voltar
        </Button>
        <Button 
          onClick={generateContent}
          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600"
        >
          Gerar Banner com IA
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      {isGenerating ? (
        <div className="text-center py-12">
          <Wand2 className="w-16 h-16 text-purple-600 mx-auto mb-4 animate-spin" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Gerando seu banner...
          </h3>
          <p className="text-gray-600">
            Nossa IA está criando textos e sugestões personalizadas para você
          </p>
        </div>
      ) : (
        <div>
          <div className="bg-purple-50 p-6 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-purple-900 mb-3">
              Conteúdo gerado pela IA:
            </h3>
            <div className="space-y-2">
              <div>
                <span className="font-medium text-purple-800">Título:</span>
                <p className="text-purple-700">{generatedContent.title}</p>
              </div>
              <div>
                <span className="font-medium text-purple-800">Subtítulo:</span>
                <p className="text-purple-700">{generatedContent.subtitle}</p>
              </div>
              <div>
                <span className="font-medium text-purple-800">Descrição:</span>
                <p className="text-purple-700">{generatedContent.description}</p>
              </div>
            </div>
          </div>

          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Escolha um template:
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {generatedContent.templates.map((template) => (
              <Card key={template.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="aspect-square bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-white font-bold">Preview</span>
                  </div>
                  <h5 className="font-medium text-gray-900">{template.name}</h5>
                  <Button 
                    className="w-full mt-3" 
                    variant="outline"
                    onClick={() => setStep(4)}
                  >
                    Usar Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Preview */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Preview</h4>
          <div className="aspect-square bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">{generatedContent.title}</h2>
              <p className="text-lg mb-4">{generatedContent.subtitle}</p>
              {formData.logo && (
                <div className="w-16 h-16 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-gray-600 text-xs">LOGO</span>
                </div>
              )}
              <p className="text-sm opacity-90">{generatedContent.description}</p>
            </div>
          </div>
        </div>

        {/* Editor */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Editar</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título
              </label>
              <Input
                value={generatedContent.title}
                onChange={(e) => setGeneratedContent({ ...generatedContent, title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtítulo
              </label>
              <Input
                value={generatedContent.subtitle}
                onChange={(e) => setGeneratedContent({ ...generatedContent, subtitle: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição
              </label>
              <Textarea
                value={generatedContent.description}
                onChange={(e) => setGeneratedContent({ ...generatedContent, description: e.target.value })}
                rows={3}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <Button 
          variant="outline" 
          onClick={() => setStep(3)}
          className="flex-1"
        >
          Voltar
        </Button>
        <Button 
          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600"
        >
          <Download className="w-4 h-4 mr-2" />
          Baixar Banner
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {categoryTitles[category as keyof typeof categoryTitles]}
              </h1>
              <p className="text-sm text-gray-500">Passo {step} de 4</p>
            </div>
          </div>
          <Badge variant="secondary">
            Gratuito - 1/3 banners
          </Badge>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
              {step === 1 && 'Conte-nos sobre sua divulgação'}
              {step === 2 && 'Upload da sua logo'}
              {step === 3 && 'Geração com IA'}
              {step === 4 && 'Editar e finalizar'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateBanner;
