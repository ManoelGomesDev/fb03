# RentChain - Plataforma de Aluguel Descentralizada

Uma plataforma moderna de aluguel de imóveis gerenciada com contratos inteligentes, desenvolvida com NextJS, TypeScript, TailwindCSS e Shadcn/ui.

## 🚀 Funcionalidades

### ✅ Características Implementadas

- **Conexão de Carteira**: Conecte sua carteira para interagir com a plataforma
- **Cadastro de Imóveis**: Cadastre imóveis com informações detalhadas:
  - Descrição do imóvel
  - Valor da diária (em ETH/wei)
  - Quantidade de dias disponíveis para locação
  - Link de imagem do imóvel
  - Tipo de imóvel (apartamento, casa, studio, loft, comercial)
- **Listagem de Imóveis**: Visualize imóveis disponíveis e indisponíveis
- **Sistema de Aluguel**: Alugue imóveis com seleção de quantidade de diárias

### 🔒 Regras de Negócio

- ❌ Proprietário não pode alugar seu próprio imóvel
- ❌ Usuário deve conectar carteira antes de cadastrar ou alugar
- 📋 Imóveis disponíveis aparecem primeiro, indisponíveis com opacidade reduzida
- 💰 Valores são tratados em wei (unidade do Ethereum)
- 📊 Interface mostra informações do proprietário e valores claramente

## 🛠️ Tecnologias Utilizadas

- **Frontend**: NextJS 15 com App Router
- **Linguagem**: TypeScript
- **Estilização**: TailwindCSS com tema personalizado (cores de imobiliária)
- **Componentes**: Shadcn/ui
- **Estado Global**: Zustand
- **Ícones**: Lucide React

## 🎨 Design

- Layout moderno e clean
- Cores que remetem ao setor imobiliário (azuis e verdes)
- Interface responsiva
- Componentes acessíveis com Shadcn/ui

## 📦 Estrutura do Projeto

```
src/
├── app/                    # App Router do NextJS
├── components/             # Componentes React
│   ├── ui/                # Componentes do Shadcn/ui
│   ├── Header.tsx         # Cabeçalho com conexão de carteira
│   ├── Navigation.tsx     # Navegação entre abas
│   ├── PropertyCard.tsx   # Card de imóvel
│   ├── PropertyListing.tsx # Listagem de imóveis
│   └── PropertyRegistration.tsx # Formulário de cadastro
├── data/                  # Dados de exemplo
├── store/                 # Estado global com Zustand
├── types/                 # Definições de tipos TypeScript
└── utils/                 # Utilitários (conversão wei/ether)
```

## 🚦 Como Executar

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Executar em desenvolvimento**:
   ```bash
   npm run dev
   ```

3. **Acessar a aplicação**:
   ```
   http://localhost:3000
   ```

## 💡 Como Usar

1. **Conectar Carteira**: Clique em "Conectar Carteira" no header
2. **Explorar Imóveis**: Na aba "Explorar Imóveis", veja os imóveis disponíveis
3. **Cadastrar Imóvel**: Na aba "Cadastrar Imóvel", preencha o formulário
4. **Alugar Imóvel**: Clique em "Alugar Imóvel" e selecione a quantidade de dias

## 📋 Próximas Implementações

Para tornar a aplicação completamente funcional com blockchain:

1. **Integração Web3**:
   - Conectar com MetaMask/WalletConnect
   - Implementar contratos inteligentes Solidity
   - Transações reais na blockchain

2. **Backend/Indexer**:
   - API para indexar eventos da blockchain
   - Banco de dados para metadados dos imóveis

3. **Funcionalidades Avançadas**:
   - Sistema de avaliações
   - Chat entre proprietário e locatário
   - Histórico de aluguéis
   - Upload de imagens para IPFS

## 🎯 Observações de Desenvolvimento

- **Foco no Frontend**: Esta implementação prioriza a experiência do usuário
- **Abordagem Simples**: Interface intuitiva e funcional
- **Preparado para Web3**: Estrutura preparada para integração blockchain
- **Dados Simulados**: Usa dados de exemplo para demonstração

## 🧪 Dados de Exemplo

A aplicação inclui 4 propriedades de exemplo:
- Apartamento moderno (0.05 ETH/dia)
- Casa espaçosa (0.08 ETH/dia)  
- Studio compacto (0.03 ETH/dia)
- Loft industrial (0.12 ETH/dia) - Indisponível

---

Desenvolvido com ❤️ para o FlashBootcamp - Aula 3 EDU