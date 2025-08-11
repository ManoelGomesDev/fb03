'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Navigation } from '@/components/Navigation';
import { PropertyListing } from '@/components/PropertyListing';
import { PropertyRegistration } from '@/components/PropertyRegistration';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'browse' | 'register'>('browse');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main>
        {activeTab === 'browse' ? (
          <PropertyListing />
        ) : (
          <PropertyRegistration />
        )}
      </main>
    </div>
  );
}
