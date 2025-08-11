import { create } from 'zustand';
import { Property, RentalRequest } from '@/types/property';
import { sampleProperties } from '@/data/sampleProperties';
import { toast } from 'sonner';

interface PropertyState {
  // Estado da carteira
  walletAddress: string | null;
  isWalletConnected: boolean;
  
  // Lista de propriedades
  properties: Property[];
  
  // Estados de UI
  isLoading: boolean;
  error: string | null;
  
  // Ações
  connectWallet: (address: string) => void;
  disconnectWallet: () => void;
  addProperty: (property: Omit<Property, 'id' | 'createdAt'>) => void;
  rentProperty: (rental: RentalRequest) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  getAvailableProperties: () => Property[];
  getUnavailableProperties: () => Property[];
}

export const usePropertyStore = create<PropertyState>((set, get) => ({
  // Estado inicial
  walletAddress: null,
  isWalletConnected: false,
  properties: sampleProperties,
  isLoading: false,
  error: null,

  // Ações
  connectWallet: (address: string) => {
    set({ 
      walletAddress: address, 
      isWalletConnected: true,
      error: null 
    });
  },

  disconnectWallet: () => {
    set({ 
      walletAddress: null, 
      isWalletConnected: false 
    });
  },

  addProperty: (propertyData) => {
    const { walletAddress, isWalletConnected } = get();
    
    if (!isWalletConnected || !walletAddress) {
      toast.error('Conecte sua carteira antes de cadastrar um imóvel');
      return;
    }

    const newProperty: Property = {
      ...propertyData,
      id: crypto.randomUUID(),
      owner: walletAddress,
      createdAt: new Date(),
      isAvailable: true,
    };

    set(state => ({
      properties: [...state.properties, newProperty],
      error: null
    }));
  },

  rentProperty: (rental) => {
    const { walletAddress, isWalletConnected, properties } = get();
    
    if (!isWalletConnected || !walletAddress) {
      toast.error('Conecte sua carteira antes de alugar um imóvel');
      return;
    }

    const property = properties.find(p => p.id === rental.propertyId);
    
    if (!property) {
      toast.error('Propriedade não encontrada');
      return;
    }

    if (property.owner === walletAddress) {
      toast.error('Você não pode alugar seu próprio imóvel');
      return;
    }

    if (!property.isAvailable) {
      toast.error('Este imóvel não está disponível para aluguel');
      return;
    }

    // Simular aluguel (aqui seria feita a transação no blockchain)
    set(state => ({
      properties: state.properties.map(p => 
        p.id === rental.propertyId 
          ? { ...p, isAvailable: false }
          : p
      ),
      error: null
    }));
  },

  setLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error }),

  getAvailableProperties: () => {
    const { properties } = get();
    return properties.filter(p => p.isAvailable);
  },

  getUnavailableProperties: () => {
    const { properties } = get();
    return properties.filter(p => !p.isAvailable);
  },
}));
