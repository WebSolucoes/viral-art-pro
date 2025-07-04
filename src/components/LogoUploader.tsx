
import React, { useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, X, Check, Image } from 'lucide-react';

interface LogoUploaderProps {
  onLogoUpload: (file: File) => void;
  currentLogo?: File | string;
  className?: string;
}

const LogoUploader: React.FC<LogoUploaderProps> = ({ 
  onLogoUpload, 
  currentLogo, 
  className = "" 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      // Validação de tamanho (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('O arquivo deve ter no máximo 5MB');
        return;
      }

      // Criar preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      onLogoUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const removeLogo = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Logo da sua marca
          </h3>
          <p className="text-sm text-gray-600">
            Sua logo será automaticamente inserida em todos os banners
          </p>
        </div>

        <div
          className={`
            border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
            ${isDragging 
              ? 'border-purple-500 bg-purple-50' 
              : previewUrl 
                ? 'border-green-300 bg-green-50'
                : 'border-gray-300 hover:border-purple-400'
            }
          `}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
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
                <span className="font-medium">Logo carregada com sucesso!</span>
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
                  Clique aqui ou arraste sua logo
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
          onChange={handleFileInputChange}
        />

        {/* Dicas */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-medium text-blue-900 mb-2">
            💡 Dicas para uma logo perfeita:
          </h4>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• Use fundo transparente (PNG) para melhor resultado</li>
            <li>• Resolução mínima: 300x300 pixels</li>
            <li>• Evite textos muito pequenos</li>
            <li>• Cores contrastantes funcionam melhor</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default LogoUploader;
