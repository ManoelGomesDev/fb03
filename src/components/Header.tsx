'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatWalletAddress } from '@/utils/ethereum';
import { Home, Wallet, Crown } from 'lucide-react';
import { toast } from 'sonner';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { metaMask } from 'wagmi/connectors';
import { sepolia } from 'wagmi/chains';
import { useIsContractOwner } from '@/hooks/usePropertyRental';

export function Header() {
  const { address, isConnected, chain } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { isOwner } = useIsContractOwner();

  const handleConnectWallet = async () => {
    try {
      connect({ 
        connector: metaMask(),
        chainId: sepolia.id
      });
      toast.success('Carteira conectada com sucesso!', {
        description: address ? `Endereço: ${formatWalletAddress(address)}` : ''
      });
      
      // Toast especial para o owner
      if (isOwner) {
        setTimeout(() => {
          toast.success('🎉 Bem-vindo, Owner!', {
            description: 'Você tem acesso ao Painel Administrativo.'
          });
        }, 1500);
      }
    } catch (error) {
      console.error('Erro ao conectar carteira:', error);
      toast.error('Erro ao conectar carteira', {
        description: 'Verifique se você tem uma carteira instalada.'
      });
    }
  };

  const handleDisconnectWallet = () => {
    disconnect();
    toast.info('Carteira desconectada', {
      description: 'Você pode reconectar a qualquer momento.'
    });
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
            {isConnected && address ? (
              <div className="flex items-center space-x-2">
                {/* Indicador de Admin */}
                {isOwner && (
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 shadow-lg animate-pulse">
                    <Crown className="h-3 w-3 mr-1" />
                    Owner
                  </Badge>
                )}
                
                <div className="flex items-center space-x-2 px-3 py-2 bg-secondary rounded-lg">
                  <Wallet className="h-4 w-4 text-secondary-foreground" />
                  <span className="text-sm font-medium text-secondary-foreground">
                    {formatWalletAddress(address)}
                  </span>
                  {chain && (
                    <span className="text-xs text-muted-foreground">
                      {chain.name}
                    </span>
                  )}
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleDisconnectWallet}
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
