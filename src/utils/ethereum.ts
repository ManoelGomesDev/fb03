import { formatEther as viemFormatEther, parseEther, type Address } from 'viem'

// Utilitários para conversão de wei/ether usando Viem
export const weiToEther = (wei: bigint): number => {
  return Number(viemFormatEther(wei));
};

export const etherToWei = (ether: number): bigint => {
  return parseEther(ether.toString());
};

export const formatEther = (wei: bigint): string => {
  const ether = viemFormatEther(wei);
  return `${Number(ether).toFixed(4)} ETH`;
};

export const formatWalletAddress = (address: string): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Utilitário para converter PropertyStruct do contrato para o tipo do frontend
export const convertContractPropertyToFrontend = (contractProperty: {
  id: bigint;
  owner: Address;
  description: string;
  imageUrl: string;
  propertyType: string;
  dailyRate: bigint;
  availableDays: bigint;
  isAvailable: boolean;
  createdAt: bigint;
}) => {
  return {
    id: contractProperty.id.toString(),
    owner: contractProperty.owner as Address,
    description: contractProperty.description,
    imageUrl: contractProperty.imageUrl,
    propertyType: contractProperty.propertyType,
    dailyRate: Number(contractProperty.dailyRate),
    availableDays: Number(contractProperty.availableDays),
    isAvailable: contractProperty.isAvailable,
    createdAt: new Date(Number(contractProperty.createdAt) * 1000)
  };
};

// Utilitário para validar endereços
export const isValidAddress = (address: string): address is Address => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};
