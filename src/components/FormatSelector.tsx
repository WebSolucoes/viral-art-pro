
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Instagram, MessageSquare } from 'lucide-react';

interface FormatSelectorProps {
  selectedFormat: string;
  onFormatChange: (format: string) => void;
}

const FormatSelector: React.FC<FormatSelectorProps> = ({ selectedFormat, onFormatChange }) => {
  const formats = [
    {
      id: 'whatsapp-status',
      name: 'Status WhatsApp',
      dimensions: '1080x1920',
      icon: MessageSquare,
      description: 'Formato vertical para status'
    },
    {
      id: 'instagram-post',
      name: 'Post Instagram',
      dimensions: '1080x1080',
      icon: Instagram,
      description: 'Formato quadrado para feed'
    },
    {
      id: 'instagram-story',
      name: 'Stories',
      dimensions: '1080x1920',
      icon: Smartphone,
      description: 'Formato vertical para stories'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Formato do Banner</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {formats.map((format) => (
            <div
              key={format.id}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedFormat === format.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => onFormatChange(format.id)}
            >
              <div className="text-center space-y-2">
                <format.icon className={`w-8 h-8 mx-auto ${
                  selectedFormat === format.id ? 'text-blue-600' : 'text-gray-500'
                }`} />
                <h3 className="font-semibold">{format.name}</h3>
                <Badge variant="secondary" className="text-xs">
                  {format.dimensions}
                </Badge>
                <p className="text-xs text-gray-600">{format.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FormatSelector;
