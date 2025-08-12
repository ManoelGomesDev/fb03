import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount, useBlockNumber } from 'wagmi'
import { PROPERTY_RENTAL_ADDRESS, PROPERTY_RENTAL_ABI, type PropertyStruct } from '@/contracts/PropertyRental'
import { parseEther } from 'viem'
import { sepolia } from 'wagmi/chains'
import { toast } from 'sonner'
import { convertContractPropertyToFrontend } from '@/utils/ethereum'
import { useEffect } from 'react'

// Hook para ler todas as propriedades
export function useGetAllProperties() {
  const result = useReadContract({
    address: PROPERTY_RENTAL_ADDRESS,
    abi: PROPERTY_RENTAL_ABI,
    functionName: 'getAllProperties',
    chainId: sepolia.id,
    query: {
      refetchInterval: 30000, // Refetch a cada 30 segundos em vez de todo bloco
      staleTime: 20000, // Dados são frescos por 20 segundos
    }
  })

  return {
    ...result,
    data: result.data?.map(convertContractPropertyToFrontend) || []
  }
}

// Hook para ler propriedades de um owner específico
export function useGetPropertiesByOwner(owner?: string) {
  const result = useReadContract({
    address: PROPERTY_RENTAL_ADDRESS,
    abi: PROPERTY_RENTAL_ABI,
    functionName: 'getPropertiesByOwner',
    args: owner ? [owner as `0x${string}`] : undefined,
    chainId: sepolia.id,
    query: {
      enabled: !!owner,
      refetchInterval: 30000, // Refetch a cada 30 segundos
      staleTime: 20000, // Dados são frescos por 20 segundos
    },
  })

  return {
    ...result,
    data: result.data?.map(convertContractPropertyToFrontend) || []
  }
}

// Hook para registrar uma propriedade
export function useRegisterProperty() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const registerProperty = async (
    description: string,
    imageUrl: string,
    propertyType: string,
    dailyRateEth: number,
    availableDays: number
  ) => {
    try {
      const dailyRateWei = parseEther(dailyRateEth.toString())
      
      writeContract({
        address: PROPERTY_RENTAL_ADDRESS,
        abi: PROPERTY_RENTAL_ABI,
        functionName: 'registerProperty',
        args: [description, imageUrl, propertyType, dailyRateWei, BigInt(availableDays)],
        chainId: sepolia.id,
      })
    } catch (err) {
      console.error('Erro ao registrar propriedade:', err)
      toast.error('Erro ao registrar propriedade')
    }
  }

  // Mostrar toast quando a transação for confirmada
  useEffect(() => {
    if (isSuccess) {
      toast.success('Propriedade registrada com sucesso!')
    }
  }, [isSuccess])

  // Mostrar toast se houver erro
  useEffect(() => {
    if (error) {
      toast.error('Erro ao registrar propriedade: ' + error.message)
    }
  }, [error])

  return {
    registerProperty,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  }
}

// Hook para alugar uma propriedade
export function useRentProperty() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const rentProperty = async (
    propertyId: string,
    days: number,
    totalAmountEth: number
  ) => {
    try {
      const valueWei = parseEther(totalAmountEth.toString())
      
      writeContract({
        address: PROPERTY_RENTAL_ADDRESS,
        abi: PROPERTY_RENTAL_ABI,
        functionName: 'rentProperty',
        args: [BigInt(propertyId), BigInt(days)],
        value: valueWei,
        chainId: sepolia.id,
      })
    } catch (err) {
      console.error('Erro ao alugar propriedade:', err)
      toast.error('Erro ao alugar propriedade')
    }
  }

  // Mostrar toast quando a transação for confirmada
  useEffect(() => {
    if (isSuccess) {
      toast.success('Propriedade alugada com sucesso!')
    }
  }, [isSuccess])

  // Mostrar toast se houver erro
  useEffect(() => {
    if (error) {
      toast.error('Erro ao alugar propriedade: ' + error.message)
    }
  }, [error])

  return {
    rentProperty,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  }
}

// Hook para ler estatísticas da plataforma
export function useGetPlatformStats() {
  return useReadContract({
    address: PROPERTY_RENTAL_ADDRESS,
    abi: PROPERTY_RENTAL_ABI,
    functionName: 'getPlatformStats',
    chainId: sepolia.id,
  })
}

// Hook para ler uma propriedade específica
export function useGetProperty(propertyId?: string) {
  return useReadContract({
    address: PROPERTY_RENTAL_ADDRESS,
    abi: PROPERTY_RENTAL_ABI,
    functionName: 'getProperty',
    args: propertyId ? [BigInt(propertyId)] : undefined,
    chainId: sepolia.id,
    query: {
      enabled: !!propertyId,
    },
  })
}
