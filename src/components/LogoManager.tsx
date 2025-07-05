
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, X, Check, Image as ImageIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface LogoManagerProps {
  onLogoUploaded: (logoUrl: string) => void;
  currentLogo?: string;
}

const LogoManager: React.FC<LogoManagerProps> = ({ onLogoUploaded, currentLogo }) => {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>(currentLogo || '');

  const handleFileUpload = async (file: File) => {
    if (!user) return;
    
    setUploading(true);
    
    try {
      // Validação de arquivo
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Arquivo muito grande. Máximo 5MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast.error('Apenas imagens são permitidas');
        return;
      }

      // Upload para Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('logos')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      // Obter URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('logos')
        .getPublicUrl(data.path);

      setPreviewUrl(publicUrl);
      onLogoUploaded(publicUrl);

      // Salvar no perfil do usuário
      await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          logo_url: publicUrl
        });

      toast.success('Logo carregada com sucesso!');
    } catch (error: any) {
      console.error('Erro ao fazer upload:', error);
      toast.error('Erro ao carregar logo: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const removeLogo = () => {
    setPreviewUrl('');
    onLogoUploaded('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <ImageIcon className="w-5 h-5 mr-2" />
          Logo da Marca
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
          onClick={() => !previewUrl && fileInputRef.current?.click()}
        >
          {previewUrl ? (
            <div className="space-y-4">
              <div className="relative inline-block">
                <img 
                  src={previewUrl} 
                  alt="Logo preview" 
                  className="max-w-32 max-h-32 object-contain mx-auto rounded-lg"
                />
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeLogo();
                  }}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
              <div className="flex items-center justify-center text-green-600">
                <Check className="w-5 h-5 mr-2" />
                <span className="font-medium">Logo carregada!</span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
              >
                Alterar logo
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="w-12 h-12 text-gray-400 mx-auto" />
              <div>
                <p className="text-gray-600 font-medium">
                  {uploading ? 'Carregando...' : 'Clique para carregar sua logo'}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  PNG, JPG, SVG até 5MB
                </p>
              </div>
            </div>
          )}
        </div>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={uploading}
        />

        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-800">
            💡 Dica: Use fundo transparente (PNG) para melhor resultado
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LogoManager;
