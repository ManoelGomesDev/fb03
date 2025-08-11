'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePropertyStore } from '@/store/usePropertyStore';
import { etherToWei } from '@/utils/ethereum';
import { Building2, DollarSign, Calendar, Image } from 'lucide-react';
import { toast } from 'sonner';

export function PropertyRegistration() {
  const { addProperty, isWalletConnected, error } = usePropertyStore();
  const [formData, setFormData] = useState({
    description: '',
    dailyRate: '',
    availableDays: '',
    imageUrl: '',
    propertyType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isWalletConnected) {
      toast.error('Conecte sua carteira antes de cadastrar um imóvel');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const dailyRateInWei = etherToWei(parseFloat(formData.dailyRate));
      
      addProperty({
        description: formData.description,
        dailyRate: dailyRateInWei,
        availableDays: parseInt(formData.availableDays),
        imageUrl: formData.imageUrl,
        propertyType: formData.propertyType,
        isAvailable: true,
      });

      // Reset form
      setFormData({
        description: '',
        dailyRate: '',
        availableDays: '',
        imageUrl: '',
        propertyType: ''
      });

      toast.success('Imóvel cadastrado com sucesso!', {
        description: 'Seu imóvel já está disponível para aluguel na plataforma.'
      });
    } catch (error) {
      console.error('Erro ao cadastrar imóvel:', error);
      toast.error('Erro ao cadastrar imóvel', {
        description: 'Verifique os dados e tente novamente.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isWalletConnected) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6">
            <div className="text-center">
              <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Conecte sua carteira</h3>
              <p className="text-muted-foreground">
                Para cadastrar um imóvel, você precisa conectar sua carteira primeiro.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building2 className="h-6 w-6" />
            <span>Cadastrar Novo Imóvel</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tipo de Imóvel */}
            <div className="space-y-2">
              <Label htmlFor="propertyType">Tipo de Imóvel</Label>
              <Select 
                value={formData.propertyType} 
                onValueChange={(value) => handleInputChange('propertyType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de imóvel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartamento">Apartamento</SelectItem>
                  <SelectItem value="casa">Casa</SelectItem>
                  <SelectItem value="studio">Studio</SelectItem>
                  <SelectItem value="loft">Loft</SelectItem>
                  <SelectItem value="comercial">Comercial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Descrição */}
            <div className="space-y-2">
              <Label htmlFor="description">Descrição do Imóvel</Label>
              <Textarea
                id="description"
                placeholder="Descreva as características principais do imóvel..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="min-h-[100px]"
                required
              />
            </div>

            {/* Valor da Diária */}
            <div className="space-y-2">
              <Label htmlFor="dailyRate" className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4" />
                <span>Valor da Diária (ETH)</span>
              </Label>
              <Input
                id="dailyRate"
                type="number"
                step="0.001"
                placeholder="0.05"
                value={formData.dailyRate}
                onChange={(e) => handleInputChange('dailyRate', e.target.value)}
                required
              />
            </div>

            {/* Dias Disponíveis */}
            <div className="space-y-2">
              <Label htmlFor="availableDays" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Dias Disponíveis para Locação</span>
              </Label>
              <Input
                id="availableDays"
                type="number"
                min="1"
                placeholder="30"
                value={formData.availableDays}
                onChange={(e) => handleInputChange('availableDays', e.target.value)}
                required
              />
            </div>

            {/* URL da Imagem */}
            <div className="space-y-2">
              <Label htmlFor="imageUrl" className="flex items-center space-x-2">
                <Image className="h-4 w-4" />
                <span>URL da Imagem</span>
              </Label>
              <Input
                id="imageUrl"
                type="url"
                placeholder="https://exemplo.com/imagem.jpg"
                value={formData.imageUrl}
                onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                required
              />
            </div>

            {/* Preview da imagem */}
            {formData.imageUrl && (
              <div className="space-y-2">
                <Label>Preview da Imagem</Label>
                <div className="relative aspect-video max-w-xs mx-auto overflow-hidden rounded-lg border">
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              </div>
            )}

            {/* Mensagem de erro */}
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )}

            {/* Botão de envio */}
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Cadastrando...' : 'Cadastrar Imóvel'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
