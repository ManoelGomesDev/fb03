import { create } from 'zustand';
import { Property, RentalRequest } from '@/types/property';
import { toast } from 'sonner';

interface PropertyState {
  // Estados de UI
  isLoading: boolean;
  error: string | null;
  
  // Ações
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Funções helper que agora são apenas utilitárias
  // A lógica real será feita pelos hooks do Wagmi
  filterAvailableProperties: (properties: Property[]) => Property[];
  filterUnavailableProperties: (properties: Property[]) => Property[];
}

export const usePropertyStore = create<PropertyState>((set, get) => ({
  // Estado inicial
  isLoading: false,
  error: null,

  // Ações
  setLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error }),

  // Funções utilitárias
  filterAvailableProperties: (properties: Property[]) => {
    return properties.filter(p => p.isAvailable);
  },

  filterUnavailableProperties: (properties: Property[]) => {
    return properties.filter(p => !p.isAvailable);
  },
}));
