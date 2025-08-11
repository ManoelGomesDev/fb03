'use client';

import { Button } from '@/components/ui/button';
import { usePropertyStore } from '@/store/usePropertyStore';
import { Building, Search, Plus } from 'lucide-react';
import { useState } from 'react';

interface NavigationProps {
  activeTab: 'browse' | 'register';
  onTabChange: (tab: 'browse' | 'register') => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const { isWalletConnected } = usePropertyStore();

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
            disabled={!isWalletConnected}
            className="flex items-center space-x-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            <Plus className="h-4 w-4" />
            <span>Cadastrar Imóvel</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
