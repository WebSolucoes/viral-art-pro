
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
    if (!user) {
      toast.error('Você precisa estar logado para fazer upload');
      return;
    }
    
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

      console.log('Iniciando upload da logo...');

      // Upload para Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `logo-${user.id}-${Date.now()}.${fileExt}`;
      
      console.log('Nome do arquivo:', fileName);

      const { data, error } = await supabase.storage
        .from('logos')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) {
        console.error('Erro no upload:', error);
        throw error;
      }

      console.log('Upload realizado com sucesso:', data);

      // Obter URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('logos')
        .getPublicUrl(data.path);

      console.log('URL pública:', publicUrl);

      setPreviewUrl(publicUrl);
      onLogoUploaded(publicUrl);

      // Salvar no perfil do usuário
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          logo_url: publicUrl
        }, {
          onConflict: 'user_id'
        });

      if (profileError) {
        console.error('Erro ao salvar no perfil:', profileError);
        throw profileError;
      }

      console.log('Logo salva no perfil com sucesso');
      toast.success('Logo carregada com sucesso!');
    } catch (error: any) {
      console.error('Erro completo ao fazer upload:', error);
      toast.error('Erro ao carregar logo: ' + (error.message || 'Erro desconhecido'));
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('Arquivo selecionado:', file.name, file.size, file.type);
      handleFileUpload(file);
    }
  };

  const removeLogo = async () => {
    try {
      setPreviewUrl('');
      onLogoUploaded('');
      
      if (user) {
        await supabase
          .from('profiles')
          .upsert({
            user_id: user.id,
            logo_url: null
          }, {
            onConflict: 'user_id'
          });
      }
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      toast.success('Logo removida com sucesso!');
    } catch (error) {
      console.error('Erro ao remover logo:', error);
      toast.error('Erro ao remover logo');
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
          onClick={() => !uploading && fileInputRef.current?.click()}
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
                  disabled={uploading}
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
                disabled={uploading}
              >
                {uploading ? 'Carregando...' : 'Alterar logo'}
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
