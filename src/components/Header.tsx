'use client';

import { Button } from '@/components/ui/button';
import { usePropertyStore } from '@/store/usePropertyStore';
import { connectWallet, formatWalletAddress } from '@/utils/ethereum';
import { Home, Wallet } from 'lucide-react';
import { toast } from 'sonner';

export function Header() {
  const { 
    walletAddress, 
    isWalletConnected, 
    connectWallet: setConnectedWallet,
    disconnectWallet 
  } = usePropertyStore();

  const handleConnectWallet = async () => {
    try {
      const address = await connectWallet();
      if (address) {
        setConnectedWallet(address);
        toast.success('Carteira conectada com sucesso!', {
          description: `Endereço: ${formatWalletAddress(address)}`
        });
      } else {
        toast.error('Erro ao conectar carteira', {
          description: 'Não foi possível conectar com a carteira. Tente novamente.'
        });
      }
    } catch (error) {
      console.error('Erro ao conectar carteira:', error);
      toast.error('Erro ao conectar carteira', {
        description: 'Verifique se você tem uma carteira instalada.'
      });
    }
  };

  return (
    <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
              <Home className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">RentChain</h1>
              <p className="text-xs text-muted-foreground">Aluguel Descentralizado</p>
            </div>
          </div>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-4">
            {isWalletConnected && walletAddress ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2 px-3 py-2 bg-secondary rounded-lg">
                  <Wallet className="h-4 w-4 text-secondary-foreground" />
                  <span className="text-sm font-medium text-secondary-foreground">
                    {formatWalletAddress(walletAddress)}
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    disconnectWallet();
                    toast.info('Carteira desconectada', {
                      description: 'Você pode reconectar a qualquer momento.'
                    });
                  }}
                >
                  Desconectar
                </Button>
              </div>
            ) : (
              <Button 
                onClick={handleConnectWallet}
                className="flex items-center space-x-2"
              >
                <Wallet className="h-4 w-4" />
                <span>Conectar Carteira</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
