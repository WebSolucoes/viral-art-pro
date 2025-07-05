
import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { toast } from 'sonner';

interface BannerCanvasProps {
  title: string;
  subtitle?: string;
  description: string;
  logoUrl?: string;
  backgroundImage?: string;
  format: 'whatsapp-status' | 'instagram-post' | 'instagram-story';
  category: string;
  tmdbData?: any;
}

const BannerCanvas: React.FC<BannerCanvasProps> = ({
  title,
  subtitle,
  description,
  logoUrl,
  backgroundImage,
  format,
  category,
  tmdbData
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const formatDimensions = {
    'whatsapp-status': { width: 1080, height: 1920 },
    'instagram-post': { width: 1080, height: 1080 },
    'instagram-story': { width: 1080, height: 1920 }
  };

  const generateBanner = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsGenerating(true);

    try {
      const dimensions = formatDimensions[format];
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      
      if (category === 'iptv' || category === 'nova_serie') {
        gradient.addColorStop(0, '#1a1a2e');
        gradient.addColorStop(1, '#16213e');
      } else if (category === 'promocao') {
        gradient.addColorStop(0, '#ff6b6b');
        gradient.addColorStop(1, '#ee5a52');
      } else if (category === 'comemorativo') {
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
      } else {
        gradient.addColorStop(0, '#2c3e50');
        gradient.addColorStop(1, '#34495e');
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Background image (if available)
      if (backgroundImage) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = backgroundImage;
        });

        // Aplicar efeito de overlay
        ctx.globalAlpha = 0.3;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;

        // Overlay escuro
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Configurar texto
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';

      // Título
      const titleSize = format === 'instagram-post' ? 60 : 80;
      ctx.font = `bold ${titleSize}px Arial`;
      
      const titleLines = wrapText(ctx, title, canvas.width - 120);
      const titleY = format === 'instagram-post' ? 300 : 400;
      
      titleLines.forEach((line, index) => {
        ctx.fillText(line, canvas.width / 2, titleY + (index * (titleSize + 20)));
      });

      // Subtítulo
      if (subtitle) {
        const subtitleSize = format === 'instagram-post' ? 36 : 48;
        ctx.font = `${subtitleSize}px Arial`;
        ctx.fillStyle = '#f39c12';
        
        const subtitleY = titleY + (titleLines.length * (titleSize + 20)) + 60;
        ctx.fillText(subtitle, canvas.width / 2, subtitleY);
      }

      // Descrição
      const descSize = format === 'instagram-post' ? 28 : 36;
      ctx.font = `${descSize}px Arial`;
      ctx.fillStyle = '#ecf0f1';
      
      const descLines = wrapText(ctx, description, canvas.width - 140);
      const descY = format === 'instagram-post' ? 600 : 800;
      
      descLines.forEach((line, index) => {
        ctx.fillText(line, canvas.width / 2, descY + (index * (descSize + 15)));
      });

      // TMDB Data (rating, year)
      if (tmdbData) {
        ctx.font = 'bold 32px Arial';
        ctx.fillStyle = '#e74c3c';
        const rating = `⭐ ${tmdbData.vote_average?.toFixed(1)}/10`;
        ctx.fillText(rating, canvas.width / 2, descY + (descLines.length * (descSize + 15)) + 80);
      }

      // Logo no canto superior direito
      if (logoUrl) {
        const logo = new Image();
        logo.crossOrigin = 'anonymous';
        await new Promise((resolve, reject) => {
          logo.onload = resolve;
          logo.onerror = reject;
          logo.src = logoUrl;
        });

        const logoSize = format === 'instagram-post' ? 120 : 150;
        const logoX = canvas.width - logoSize - 40;
        const logoY = 40;
        
        // Background semi-transparente para o logo
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(logoX - 10, logoY - 10, logoSize + 20, logoSize + 20);
        
        ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
      }

      // Call to action no rodapé
      ctx.font = 'bold 42px Arial';
      ctx.fillStyle = '#2ecc71';
      const ctaY = canvas.height - 100;
      ctx.fillText('📱 Chama no WhatsApp!', canvas.width / 2, ctaY);

    } catch (error) {
      console.error('Erro ao gerar banner:', error);
      toast.error('Erro ao gerar banner');
    } finally {
      setIsGenerating(false);
    }
  };

  const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] => {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = ctx.measureText(currentLine + ' ' + word).width;
      if (width < maxWidth) {
        currentLine += ' ' + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  };

  const downloadBanner = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `banner-${format}-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
    
    toast.success('Banner baixado com sucesso!');
  };

  useEffect(() => {
    generateBanner();
  }, [title, subtitle, description, logoUrl, backgroundImage, format, category, tmdbData]);

  return (
    <div className="space-y-4">
      <div className="bg-gray-100 p-4 rounded-lg overflow-auto">
        <canvas
          ref={canvasRef}
          className="max-w-full h-auto border border-gray-300 rounded-lg shadow-lg"
          style={{ maxHeight: '500px' }}
        />
      </div>
      
      <div className="flex space-x-2">
        <Button 
          onClick={generateBanner}
          disabled={isGenerating}
          variant="outline"
          className="flex-1"
        >
          {isGenerating ? 'Gerando...' : 'Atualizar Banner'}
        </Button>
        <Button 
          onClick={downloadBanner}
          className="flex-1 bg-gradient-to-r from-green-600 to-blue-600"
        >
          <Download className="w-4 h-4 mr-2" />
          Baixar Banner
        </Button>
      </div>
    </div>
  );
};

export default BannerCanvas;
