import { Property } from '@/types/property';
import { parseEther } from 'viem';

export const sampleProperties: Property[] = [
  {
    id: '1',
    owner: '0x1234567890123456789012345678901234567890',
    description: 'Apartamento moderno no centro da cidade com 2 quartos, sala ampla e vista para o mar. Totalmente mobiliado com ar condicionado.',
    dailyRate: Number(parseEther('0.05')),
    availableDays: 30,
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    propertyType: 'apartamento',
    isAvailable: true,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    owner: '0x2345678901234567890123456789012345678901',
    description: 'Casa espaçosa com 3 quartos, jardim e garagem. Perfeita para famílias, localizada em bairro residencial tranquilo.',
    dailyRate: Number(parseEther('0.08')),
    availableDays: 45,
    imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    propertyType: 'casa',
    isAvailable: true,
    createdAt: new Date('2024-01-10'),
  },
  {
    id: '3',
    owner: '0x3456789012345678901234567890123456789012',
    description: 'Studio compacto e funcional, ideal para profissionais. Localizado próximo ao metrô e centros comerciais.',
    dailyRate: Number(parseEther('0.03')),
    availableDays: 60,
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    propertyType: 'studio',
    isAvailable: true,
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '4',
    owner: '0x4567890123456789012345678901234567890123',
    description: 'Loft industrial moderno com pé direito alto, mezanino e acabamentos de luxo. Vista panorâmica da cidade.',
    dailyRate: Number(parseEther('0.12')),
    availableDays: 20,
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    propertyType: 'loft',
    isAvailable: false,
    createdAt: new Date('2024-01-05'),
  },
];
