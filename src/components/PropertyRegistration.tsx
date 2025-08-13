'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, DollarSign, Calendar, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';
import { useAccount } from 'wagmi';
import { useRegisterProperty } from '@/hooks/usePropertyRental';

export function PropertyRegistration() {
  const { isConnected } = useAccount();
  const { registerProperty, isPending, isConfirming, error } = useRegisterProperty();
  const [formData, setFormData] = useState({
    description: '',
    dailyRate: '',
    availableDays: '',
    imageUrl: '',
    propertyType: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      toast.error('Conecte sua carteira antes de cadastrar um imóvel');
      return;
    }

    // Validação dos campos obrigatórios
    if (!formData.description.trim()) {
      toast.error('Descrição é obrigatória');
      return;
    }
    if (!formData.propertyType) {
      toast.error('Tipo do imóvel é obrigatório');
      return;
    }
    if (!formData.dailyRate || parseFloat(formData.dailyRate) <= 0) {
      toast.error('Valor da diária deve ser maior que zero');
      return;
    }
    if (!formData.availableDays || parseInt(formData.availableDays) <= 0) {
      toast.error('Dias disponíveis deve ser maior que zero');
      return;
    }
    
    try {
      await registerProperty(
        formData.description,
        formData.imageUrl || '',
        formData.propertyType,
        parseFloat(formData.dailyRate),
        parseInt(formData.availableDays)
      );

      // Reset form
      setFormData({
        description: '',
        dailyRate: '',
        availableDays: '',
        imageUrl: '',
        propertyType: ''
      });
    } catch (error) {
      console.error('Erro ao cadastrar imóvel:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Verificar se o formulário está válido (simplificado)
  const isFormValid = Boolean(
    formData.description?.trim() &&
    formData.propertyType &&
    formData.dailyRate &&
    formData.availableDays &&
    parseFloat(formData.dailyRate) > 0 &&
    parseInt(formData.availableDays) > 0
  );

  // Debug para identificar problema
  console.log('DEBUG - Form validation:', {
    description: formData.description?.trim(),
    propertyType: formData.propertyType,
    dailyRate: formData.dailyRate,
    availableDays: formData.availableDays,
    isFormValid,
    isConnected
  });

  if (!isConnected) {
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
              <Label htmlFor="propertyType">Tipo de Imóvel <span className="text-red-500">*</span></Label>
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
              <Label htmlFor="description">Descrição do Imóvel <span className="text-red-500">*</span></Label>
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
                <span>Valor da Diária (ETH) <span className="text-red-500">*</span></span>
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
                <span>Dias Disponíveis para Locação <span className="text-red-500">*</span></span>
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
                <ImageIcon className="h-4 w-4" />
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
                  <Image
                    src={formData.imageUrl}
                    alt="Preview do imóvel"
                    fill
                    className="object-cover"
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
                {error.message || 'Erro ao cadastrar propriedade'}
              </div>
            )}

            {/* Aviso sobre validação */}
            {!isFormValid && (
              <div className="p-3 text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-md">
                Preencha todos os campos obrigatórios para habilitar o cadastro
              </div>
            )}

            {/* Debug info */}
            <div className="text-xs text-gray-500 space-y-1 p-3 bg-gray-50 rounded-md">
              <div>🔗 Conectado: {isConnected ? '✅' : '❌'}</div>
              <div>📝 Descrição: {formData.description?.trim() ? '✅' : '❌'}</div>
              <div>🏠 Tipo: {formData.propertyType ? '✅' : '❌'}</div>
              <div>💰 Diária: {formData.dailyRate && parseFloat(formData.dailyRate) > 0 ? '✅' : '❌'}</div>
              <div>📅 Dias: {formData.availableDays && parseInt(formData.availableDays) > 0 ? '✅' : '❌'}</div>
              <div>✅ Form válido: {isFormValid ? '✅' : '❌'}</div>
              <div>⏳ Processando: {isPending || isConfirming ? '✅' : '❌'}</div>
            </div>

            {/* Botão de envio */}
            <Button 
              type="submit" 
              className="w-full" 
              disabled={!isFormValid || isPending || isConfirming}
            >
              {isPending || isConfirming ? 'Cadastrando...' : 'Cadastrar Imóvel'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
