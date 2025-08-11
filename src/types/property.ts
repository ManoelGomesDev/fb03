export interface Property {
  id: string;
  owner: string;
  description: string;
  dailyRate: number; // em wei
  availableDays: number;
  imageUrl: string;
  propertyType: string;
  isAvailable: boolean;
  createdAt: Date;
}

export interface RentalRequest {
  propertyId: string;
  renterAddress: string;
  days: number;
  totalAmount: number; // em wei
}
