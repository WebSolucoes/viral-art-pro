
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Film, 
  Image, 
  Settings, 
  Sparkles,
  Crown
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Badge } from '@/components/ui/badge';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      path: '/dashboard',
    },
    {
      icon: Calendar,
      label: 'Eventos Esportivos',
      path: '/sports',
    },
    {
      icon: Film,
      label: 'Filmes & Séries',
      path: '/movies',
    },
    {
      icon: Image,
      label: 'Meus Banners',
      path: '/banners',
    },
    {
      icon: Settings,
      label: 'Configurações',
      path: '/settings',
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white z-50">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">PostPix IA</h1>
            <p className="text-sm text-gray-400">Gerador de Banners</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold">
              {user?.email?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium truncate">
              {user?.email?.split('@')[0]}
            </p>
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs">
              <Crown className="w-3 h-3 mr-1" />
              Plano Free
            </Badge>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              isActive(item.path)
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
        <div className="text-center">
          <p className="text-xs text-gray-500">
            © 2024 PostPix IA
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Powered by IA
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
