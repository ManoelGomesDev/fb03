import { Address } from 'viem'

// Endereço do contrato deployado na Sepolia (usando variável de ambiente)
export const PROPERTY_RENTAL_ADDRESS: Address = (process.env.NEXT_PUBLIC_PROPERTY_RENTAL_ADDRESS || '0x01A2B32ba4B68F4B621133C77bAD97C6D43F8305') as Address

// ABI do contrato PropertyRental
export const PROPERTY_RENTAL_ABI = [
  {
      "type": "constructor",
      "inputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "BASIS_POINTS",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "PLATFORM_FEE",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "allPropertyIds",
      "inputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "collectPlatformFees",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "getAllProperties",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "tuple[]",
              "internalType": "struct PropertyRental.Property[]",
              "components": [
                  {
                      "name": "id",
                      "type": "uint256",
                      "internalType": "uint256"
                  },
                  {
                      "name": "owner",
                      "type": "address",
                      "internalType": "address"
                  },
                  {
                      "name": "description",
                      "type": "string",
                      "internalType": "string"
                  },
                  {
                      "name": "imageUrl",
                      "type": "string",
                      "internalType": "string"
                  },
                  {
                      "name": "propertyType",
                      "type": "string",
                      "internalType": "string"
                  },
                  {
                      "name": "dailyRate",
                      "type": "uint256",
                      "internalType": "uint256"
                  },
                  {
                      "name": "availableDays",
                      "type": "uint256",
                      "internalType": "uint256"
                  },
                  {
                      "name": "isAvailable",
                      "type": "bool",
                      "internalType": "bool"
                  },
                  {
                      "name": "createdAt",
                      "type": "uint256",
                      "internalType": "uint256"
                  }
              ]
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "getOwnerPropertyCount",
      "inputs": [
          {
              "name": "_owner",
              "type": "address",
              "internalType": "address"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "getPlatformStats",
      "inputs": [],
      "outputs": [
          {
              "name": "totalProperties",
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "name": "totalRentals",
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "name": "platformBalance",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "getPropertiesByOwner",
      "inputs": [
          {
              "name": "_owner",
              "type": "address",
              "internalType": "address"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "tuple[]",
              "internalType": "struct PropertyRental.Property[]",
              "components": [
                  {
                      "name": "id",
                      "type": "uint256",
                      "internalType": "uint256"
                  },
                  {
                      "name": "owner",
                      "type": "address",
                      "internalType": "address"
                  },
                  {
                      "name": "description",
                      "type": "string",
                      "internalType": "string"
                  },
                  {
                      "name": "imageUrl",
                      "type": "string",
                      "internalType": "string"
                  },
                  {
                      "name": "propertyType",
                      "type": "string",
                      "internalType": "string"
                  },
                  {
                      "name": "dailyRate",
                      "type": "uint256",
                      "internalType": "uint256"
                  },
                  {
                      "name": "availableDays",
                      "type": "uint256",
                      "internalType": "uint256"
                  },
                  {
                      "name": "isAvailable",
                      "type": "bool",
                      "internalType": "bool"
                  },
                  {
                      "name": "createdAt",
                      "type": "uint256",
                      "internalType": "uint256"
                  }
              ]
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "getProperty",
      "inputs": [
          {
              "name": "_propertyId",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "tuple",
              "internalType": "struct PropertyRental.Property",
              "components": [
                  {
                      "name": "id",
                      "type": "uint256",
                      "internalType": "uint256"
                  },
                  {
                      "name": "owner",
                      "type": "address",
                      "internalType": "address"
                  },
                  {
                      "name": "description",
                      "type": "string",
                      "internalType": "string"
                  },
                  {
                      "name": "imageUrl",
                      "type": "string",
                      "internalType": "string"
                  },
                  {
                      "name": "propertyType",
                      "type": "string",
                      "internalType": "string"
                  },
                  {
                      "name": "dailyRate",
                      "type": "uint256",
                      "internalType": "uint256"
                  },
                  {
                      "name": "availableDays",
                      "type": "uint256",
                      "internalType": "uint256"
                  },
                  {
                      "name": "isAvailable",
                      "type": "bool",
                      "internalType": "bool"
                  },
                  {
                      "name": "createdAt",
                      "type": "uint256",
                      "internalType": "uint256"
                  }
              ]
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "owner",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "address"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "ownerProperties",
      "inputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "platformEarnings",
      "inputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "address"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "properties",
      "inputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "outputs": [
          {
              "name": "id",
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "name": "owner",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "description",
              "type": "string",
              "internalType": "string"
          },
          {
              "name": "imageUrl",
              "type": "string",
              "internalType": "string"
          },
          {
              "name": "propertyType",
              "type": "string",
              "internalType": "string"
          },
          {
              "name": "dailyRate",
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "name": "availableDays",
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "name": "isAvailable",
              "type": "bool",
              "internalType": "bool"
          },
          {
              "name": "createdAt",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "registerProperty",
      "inputs": [
          {
              "name": "_description",
              "type": "string",
              "internalType": "string"
          },
          {
              "name": "_imageUrl",
              "type": "string",
              "internalType": "string"
          },
          {
              "name": "_propertyType",
              "type": "string",
              "internalType": "string"
          },
          {
              "name": "_dailyRate",
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "name": "_availableDays",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "rentProperty",
      "inputs": [
          {
              "name": "_propertyId",
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "name": "_days",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "outputs": [],
      "stateMutability": "payable"
  },
  {
      "type": "function",
      "name": "rentals",
      "inputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "outputs": [
          {
              "name": "propertyId",
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "name": "renter",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "startDate",
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "name": "rentalDays",
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "name": "totalAmount",
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "name": "isActive",
              "type": "bool",
              "internalType": "bool"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "event",
      "name": "PlatformFeeCollected",
      "inputs": [
          {
              "name": "amount",
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256"
          },
          {
              "name": "to",
              "type": "address",
              "indexed": false,
              "internalType": "address"
          }
      ],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "PropertyRegistered",
      "inputs": [
          {
              "name": "propertyId",
              "type": "uint256",
              "indexed": true,
              "internalType": "uint256"
          },
          {
              "name": "owner",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          },
          {
              "name": "propertyType",
              "type": "string",
              "indexed": false,
              "internalType": "string"
          },
          {
              "name": "dailyRate",
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256"
          }
      ],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "PropertyRented",
      "inputs": [
          {
              "name": "propertyId",
              "type": "uint256",
              "indexed": true,
              "internalType": "uint256"
          },
          {
              "name": "rentalId",
              "type": "uint256",
              "indexed": true,
              "internalType": "uint256"
          },
          {
              "name": "renter",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          },
          {
              "name": "rentalDays",
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256"
          },
          {
              "name": "totalAmount",
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256"
          }
      ],
      "anonymous": false
  }
] as const

// Tipos TypeScript para o contrato
export type PropertyStruct = {
  id: bigint
  owner: Address
  description: string
  imageUrl: string
  propertyType: string
  dailyRate: bigint
  availableDays: bigint
  isAvailable: boolean
  createdAt: bigint
}

export type RentalStruct = {
  propertyId: bigint
  renter: Address
  startDate: bigint
  rentalDays: bigint
  totalAmount: bigint
  isActive: boolean
}
