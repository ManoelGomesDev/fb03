'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Navigation } from '@/components/Navigation';
import { PropertyListing } from '@/components/PropertyListing';
import { PropertyRegistration } from '@/components/PropertyRegistration';
import { AdminPanel } from '@/components/AdminPanel';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'browse' | 'register' | 'admin'>('browse');

  const renderContent = () => {
    switch (activeTab) {
      case 'browse':
        return <PropertyListing />;
      case 'register':
        return <PropertyRegistration />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <PropertyListing />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main>
        {renderContent()}
      </main>
    </div>
  );
}
