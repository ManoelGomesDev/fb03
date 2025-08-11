'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Property } from '@/types/property';
import { usePropertyStore } from '@/store/usePropertyStore';
import { formatEther, formatWalletAddress } from '@/utils/ethereum';
import { Building2, User, Calendar, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const { walletAddress, rentProperty, isWalletConnected } = usePropertyStore();
  const [rentalDays, setRentalDays] = useState('1');
  const [isRenting, setIsRenting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isOwner = walletAddress === property.owner;
  const canRent = isWalletConnected && !isOwner && property.isAvailable;
  
  const totalCost = property.dailyRate * parseInt(rentalDays || '1');

  const handleRent = async () => {
    if (!canRent) return;
    
    setIsRenting(true);
    try {
      rentProperty({
        propertyId: property.id,
        renterAddress: walletAddress!,
        days: parseInt(rentalDays),
        totalAmount: totalCost,
      });
      
      toast.success('Imóvel alugado com sucesso!', {
        description: `Você alugou este imóvel por ${rentalDays} dia(s). Total: ${formatEther(totalCost)}`
      });
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Erro ao alugar imóvel:', error);
      toast.error('Erro ao alugar imóvel', {
        description: 'Tente novamente em alguns instantes.'
      });
    } finally {
      setIsRenting(false);
    }
  };

  return (
    <Card className={`overflow-hidden transition-all duration-200 hover:shadow-lg ${
      !property.isAvailable ? 'opacity-60' : ''
    }`}>
      {/* Imagem */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={property.imageUrl}
          alt={property.description}
          className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder-property.jpg';
          }}
        />
        <div className="absolute top-2 left-2">
          <Badge variant={property.isAvailable ? 'default' : 'secondary'}>
            {property.isAvailable ? 'Disponível' : 'Indisponível'}
          </Badge>
        </div>
        <div className="absolute top-2 right-2">
          <Badge variant="outline" className="bg-white/90 text-foreground">
            {property.propertyType}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {property.description}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Valor */}
        <div className="flex items-center space-x-2">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          <span className="font-semibold text-lg text-primary">
            {formatEther(property.dailyRate)}/dia
          </span>
        </div>

        {/* Proprietário */}
        <div className="flex items-center space-x-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Proprietário: {formatWalletAddress(property.owner)}
          </span>
          {isOwner && (
            <Badge variant="outline" className="text-xs">
              Seu imóvel
            </Badge>
          )}
        </div>

        {/* Dias disponíveis */}
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {property.availableDays} dias disponíveis
          </span>
        </div>
      </CardContent>

      <CardFooter>
        {!isWalletConnected ? (
          <Button disabled className="w-full">
            Conecte sua carteira para alugar
          </Button>
        ) : isOwner ? (
          <Button disabled className="w-full">
            Você não pode alugar seu próprio imóvel
          </Button>
        ) : !property.isAvailable ? (
          <Button disabled className="w-full">
            Imóvel indisponível
          </Button>
        ) : (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full">
                Alugar Imóvel
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Alugar Imóvel</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="days">Quantidade de dias</Label>
                  <Input
                    id="days"
                    type="number"
                    min="1"
                    max={property.availableDays}
                    value={rentalDays}
                    onChange={(e) => setRentalDays(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Valor por dia:</span>
                    <span>{formatEther(property.dailyRate)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Quantidade de dias:</span>
                    <span>{rentalDays}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t pt-2">
                    <span>Total:</span>
                    <span className="text-primary">{formatEther(totalCost)}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleRent}
                    disabled={isRenting}
                    className="flex-1"
                  >
                    {isRenting ? 'Alugando...' : 'Confirmar Aluguel'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardFooter>
    </Card>
  );
}
