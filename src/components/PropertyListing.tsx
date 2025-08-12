'use client';

import { usePropertyStore } from '@/store/usePropertyStore';
import { PropertyCard } from './PropertyCard';
import { Building2, Search, Loader2 } from 'lucide-react';
import { useGetAllProperties } from '@/hooks/usePropertyRental';

export function PropertyListing() {
  const { filterAvailableProperties, filterUnavailableProperties } = usePropertyStore();
  const { data: properties, isLoading, error } = useGetAllProperties();
  
  const availableProperties = filterAvailableProperties(properties);
  const unavailableProperties = filterUnavailableProperties(properties);
  const totalProperties = properties.length;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center max-w-md mx-auto">
          <Loader2 className="h-16 w-16 mx-auto text-muted-foreground mb-4 animate-spin" />
          <h3 className="text-xl font-semibold mb-2">Carregando imóveis...</h3>
          <p className="text-muted-foreground">
            Buscando dados na blockchain...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center max-w-md mx-auto">
          <Building2 className="h-16 w-16 mx-auto text-destructive mb-4" />
          <h3 className="text-xl font-semibold mb-2">Erro ao carregar imóveis</h3>
          <p className="text-muted-foreground mb-4">
            Não foi possível carregar os dados da blockchain. Tente novamente.
          </p>
        </div>
      </div>
    );
  }

  if (totalProperties === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center max-w-md mx-auto">
          <Building2 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">Nenhum imóvel cadastrado</h3>
          <p className="text-muted-foreground mb-4">
            Seja o primeiro a cadastrar um imóvel na plataforma!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <Search className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">Imóveis Disponíveis</h2>
        </div>
        <p className="text-muted-foreground">
          {availableProperties.length} imóvel(is) disponível(is) para aluguel
        </p>
      </div>

      {/* Imóveis Disponíveis */}
      {availableProperties.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {availableProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}

      {/* Imóveis Indisponíveis */}
      {unavailableProperties.length > 0 && (
        <div className="mt-12">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">
              Imóveis Indisponíveis
            </h3>
            <p className="text-sm text-muted-foreground">
              {unavailableProperties.length} imóvel(is) temporariamente indisponível(is)
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {unavailableProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
