// Utilitários para conversão de wei/ether
export const weiToEther = (wei: number): number => {
  return wei / Math.pow(10, 18);
};

export const etherToWei = (ether: number): number => {
  return ether * Math.pow(10, 18);
};

export const formatEther = (wei: number): string => {
  const ether = weiToEther(wei);
  return `${ether.toFixed(4)} ETH`;
};

export const formatWalletAddress = (address: string): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Simular conexão com carteira (MetaMask)
export const connectWallet = async (): Promise<string | null> => {
  try {
    // Simular endereço de carteira para desenvolvimento
    const mockAddress = `0x${Math.random().toString(16).slice(2, 42)}`;
    return mockAddress;
  } catch (error) {
    console.error('Erro ao conectar carteira:', error);
    return null;
  }
};
