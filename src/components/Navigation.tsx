'use client';

import { Button } from '@/components/ui/button';
import { Search, Plus, Crown } from 'lucide-react';
import { useAccount } from 'wagmi';
import { useIsContractOwner } from '@/hooks/usePropertyRental';

interface NavigationProps {
  activeTab: 'browse' | 'register' | 'admin';
  onTabChange: (tab: 'browse' | 'register' | 'admin') => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const { isConnected } = useAccount();
  const { isOwner } = useIsContractOwner();

  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-1">
          <Button
            variant={activeTab === 'browse' ? 'default' : 'ghost'}
            onClick={() => onTabChange('browse')}
            className="flex items-center space-x-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            <Search className="h-4 w-4" />
            <span>Explorar Imóveis</span>
          </Button>
          
          <Button
            variant={activeTab === 'register' ? 'default' : 'ghost'}
            onClick={() => onTabChange('register')}
            disabled={!isConnected}
            className="flex items-center space-x-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            <Plus className="h-4 w-4" />
            <span>Cadastrar Imóvel</span>
          </Button>

          {/* Painel Admin - apenas para o owner */}
          {isOwner && (
            <Button
              variant={activeTab === 'admin' ? 'default' : 'ghost'}
              onClick={() => onTabChange('admin')}
              className="flex items-center space-x-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600"
            >
              <Crown className="h-4 w-4" />
              <span>Admin</span>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
