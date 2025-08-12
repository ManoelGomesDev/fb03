'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useIsContractOwner, useGetPlatformStats, useCollectPlatformFees } from '@/hooks/usePropertyRental';
import { formatEther } from '@/utils/ethereum';
import { Crown, DollarSign, Building2, Users, Coins } from 'lucide-react';

export function AdminPanel() {
  const { isOwner, contractOwner } = useIsContractOwner();
  const { data: stats } = useGetPlatformStats();
  const { collectFees, isPending, isConfirming } = useCollectPlatformFees();

  if (!isOwner) {
    return null; // Não renderiza nada se não for o owner
  }

  const platformBalance = stats ? stats[2] : 0n; // platformBalance é o terceiro valor retornado
  const totalProperties = stats ? Number(stats[0]) : 0;
  const totalRentals = stats ? Number(stats[1]) : 0;

  const handleCollectFees = async () => {
    if (platformBalance > 0n) {
      await collectFees();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <Crown className="h-6 w-6 text-yellow-500" />
          <h2 className="text-2xl font-bold">Painel Administrativo</h2>
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Owner
          </Badge>
        </div>
        <p className="text-muted-foreground">
          Controle da plataforma de aluguel de imóveis
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total de Propriedades */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <Building2 className="h-4 w-4 text-blue-500" />
              <span>Total de Imóveis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalProperties}</div>
            <p className="text-xs text-muted-foreground">
              Cadastrados na plataforma
            </p>
          </CardContent>
        </Card>

        {/* Total de Aluguéis */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <Users className="h-4 w-4 text-green-500" />
              <span>Total de Aluguéis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totalRentals}</div>
            <p className="text-xs text-muted-foreground">
              Transações realizadas
            </p>
          </CardContent>
        </Card>

        {/* Saldo da Plataforma */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <Coins className="h-4 w-4 text-purple-500" />
              <span>Saldo da Plataforma</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {formatEther(platformBalance)}
            </div>
            <p className="text-xs text-muted-foreground">
              Taxas acumuladas (2%)
            </p>
          </CardContent>
        </Card>

        {/* Taxa da Plataforma */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-orange-500" />
              <span>Taxa da Plataforma</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">2%</div>
            <p className="text-xs text-muted-foreground">
              Por transação de aluguel
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Ações Administrativas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Crown className="h-5 w-5 text-yellow-500" />
            <span>Ações Administrativas</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Informações do Owner */}
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Informações do Owner</h3>
            <div className="space-y-1 text-sm">
              <div>
                <span className="text-muted-foreground">Endereço do contrato owner:</span>
                <code className="ml-2 px-2 py-1 bg-background rounded text-xs">
                  {contractOwner}
                </code>
              </div>
              <div>
                <span className="text-muted-foreground">Saldo disponível para saque:</span>
                <span className="ml-2 font-semibold text-purple-600">
                  {formatEther(platformBalance)}
                </span>
              </div>
            </div>
          </div>

          {/* Botão de Saque */}
          <div className="flex flex-col space-y-2">
            <Button
              onClick={handleCollectFees}
              disabled={platformBalance === 0n || isPending || isConfirming}
              className="w-full md:w-auto flex items-center space-x-2"
              size="lg"
            >
              <Coins className="h-4 w-4" />
              <span>
                {isPending || isConfirming 
                  ? 'Processando...' 
                  : `Sacar Taxas (${formatEther(platformBalance)})`
                }
              </span>
            </Button>
            
            {platformBalance === 0n && (
              <p className="text-sm text-muted-foreground">
                Não há taxas disponíveis para saque no momento.
              </p>
            )}
            
            <p className="text-xs text-muted-foreground">
              As taxas são coletadas automaticamente a cada aluguel realizado na plataforma.
              Você pode sacá-las a qualquer momento usando este botão.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
