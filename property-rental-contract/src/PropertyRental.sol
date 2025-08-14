// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title PropertyRental
 * @dev Contrato inteligente para plataforma de aluguel de imóveis descentralizada
 * @author RentChain Team
 */
contract PropertyRental {
    // ========== ESTRUTURAS DE DADOS ==========
    
    /**
     * @dev Estrutura que representa um imóvel na plataforma
     */
    struct Property {
        uint256 id;                    // ID único do imóvel
        address owner;                 // Endereço do proprietário
        string description;            // Descrição do imóvel
        string imageUrl;              // URL da imagem
        string propertyType;          // Tipo do imóvel (apartamento, casa, etc.)
        uint256 dailyRate;            // Valor da diária em wei
        uint256 availableDays;        // Dias disponíveis para locação
        bool isAvailable;             // Status de disponibilidade
        uint256 createdAt;            // Timestamp de criação
    }

    /**
     * @dev Estrutura que representa um aluguel ativo
     */
    struct Rental {
        uint256 propertyId;           // ID do imóvel alugado
        address renter;               // Endereço do locatário
        uint256 startDate;            // Data de início do aluguel
        uint256 rentalDays;           // Quantidade de dias alugados
        uint256 totalAmount;          // Valor total pago
        bool isActive;                // Status do aluguel
    }

    // ========== VARIÁVEIS DE ESTADO ==========
    
    address public owner;                              // Dono da plataforma
    uint256 public constant PLATFORM_FEE = 200;       // Taxa da plataforma: 2% (200 basis points)
    uint256 public constant BASIS_POINTS = 10000;     // Base para cálculos de porcentagem
    
    uint256 private propertyCounter;                   // Contador para IDs únicos
    uint256 private rentalCounter;                     // Contador para aluguéis
    
    // Mappings para armazenar dados
    mapping(uint256 => Property) public properties;                    // ID => Property
    mapping(address => uint256[]) public ownerProperties;             // Owner => Property IDs
    mapping(uint256 => Rental) public rentals;                       // Rental ID => Rental
    mapping(address => uint256) public platformEarnings;             // Ganhos da plataforma

    // Arrays para listagem
    uint256[] public allPropertyIds;                   // Todos os IDs de imóveis

    // ========== EVENTOS ==========
    
    /**
     * @dev Emitido quando um novo imóvel é cadastrado
     */
    event PropertyRegistered(
        uint256 indexed propertyId,
        address indexed owner,
        string propertyType,
        uint256 dailyRate
    );

    /**
     * @dev Emitido quando um imóvel é alugado
     */
    event PropertyRented(
        uint256 indexed propertyId,
        uint256 indexed rentalId,
        address indexed renter,
        uint256 rentalDays,
        uint256 totalAmount
    );

    /**
     * @dev Emitido quando a taxa da plataforma é coletada
     */
    event PlatformFeeCollected(uint256 amount, address to);

    // ========== MODIFICADORES ==========
    
    /**
     * @dev Modifier para verificar se o caller é o dono da plataforma
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "Apenas o dono da plataforma pode executar esta funcao");
        _;
    }

    /**
     * @dev Modifier para verificar se o imóvel existe
     */
    modifier propertyExists(uint256 _propertyId) {
        require(_propertyId > 0 && _propertyId <= propertyCounter, "Imovel nao existe");
        _;
    }

    // ========== CONSTRUTOR ==========
    
    /**
     * @dev Construtor do contrato
     * Define o deployer como dono da plataforma
     */
    constructor() {
        owner = msg.sender;
        propertyCounter = 0;
        rentalCounter = 0;
    }

    // ========== FUNÇÕES PRINCIPAIS ==========

    /**
     * @dev Cadastra um novo imóvel na plataforma
     * @param _description Descrição do imóvel
     * @param _imageUrl URL da imagem do imóvel
     * @param _propertyType Tipo do imóvel
     * @param _dailyRate Valor da diária em wei
     * @param _availableDays Quantidade de dias disponíveis
     * @return propertyId ID do imóvel cadastrado
     */
    function registerProperty(
        string memory _description,
        string memory _imageUrl,
        string memory _propertyType,
        uint256 _dailyRate,
        uint256 _availableDays
    ) external returns (uint256) {
        require(bytes(_description).length > 0, "Descricao nao pode estar vazia");
        require(bytes(_propertyType).length > 0, "Tipo do imovel nao pode estar vazio");
        require(_dailyRate > 0, "Valor da diaria deve ser maior que zero");
        require(_availableDays > 0, "Dias disponiveis deve ser maior que zero");

        // Incrementa o contador e cria novo ID
        propertyCounter++;
        uint256 newPropertyId = propertyCounter;

        // Cria a estrutura do imóvel
        properties[newPropertyId] = Property({
            id: newPropertyId,
            owner: msg.sender,
            description: _description,
            imageUrl: _imageUrl,
            propertyType: _propertyType,
            dailyRate: _dailyRate,
            availableDays: _availableDays,
            isAvailable: true,
            createdAt: block.timestamp
        });

        // Adiciona aos arrays de controle
        ownerProperties[msg.sender].push(newPropertyId);
        allPropertyIds.push(newPropertyId);

        // Emite evento
        emit PropertyRegistered(newPropertyId, msg.sender, _propertyType, _dailyRate);

        return newPropertyId;
    }

    /**
     * @dev Aluga um imóvel por uma quantidade específica de dias
     * @param _propertyId ID do imóvel a ser alugado
     * @param _days Quantidade de dias para aluguel
     */
    function rentProperty(uint256 _propertyId, uint256 _days) 
        external 
        payable 
        propertyExists(_propertyId) 
    {
        Property storage property = properties[_propertyId];
        
        // Validações
        require(property.isAvailable, "Imovel nao esta disponivel");
        require(property.owner != msg.sender, "Proprietario nao pode alugar seu proprio imovel");
        require(_days > 0 && _days <= property.availableDays, "Quantidade de dias invalida");
        
        // Calcula valores
        uint256 totalCost = property.dailyRate * _days;
        uint256 platformFee = (totalCost * PLATFORM_FEE) / BASIS_POINTS;
        uint256 ownerAmount = totalCost - platformFee;
        
        require(msg.value >= totalCost, "Valor enviado insuficiente");

        // Incrementa contador de aluguéis
        rentalCounter++;

        // Cria registro do aluguel
        rentals[rentalCounter] = Rental({
            propertyId: _propertyId,
            renter: msg.sender,
            startDate: block.timestamp,
            rentalDays: _days,
            totalAmount: totalCost,
            isActive: true
        });

        // Marca imóvel como indisponível
        property.isAvailable = false;

        // Registra ganhos da plataforma
        platformEarnings[owner] += platformFee;

        // Transfere pagamento para o proprietário
        payable(property.owner).transfer(ownerAmount);

        // Retorna troco se houver
        if (msg.value > totalCost) {
            payable(msg.sender).transfer(msg.value - totalCost);
        }

        // Emite evento
        emit PropertyRented(_propertyId, rentalCounter, msg.sender, _days, totalCost);
    }

    /**
     * @dev Retorna todos os imóveis cadastrados na plataforma
     * @return Lista com todos os imóveis
     */
    function getAllProperties() external view returns (Property[] memory) {
        Property[] memory allProperties = new Property[](allPropertyIds.length);
        
        for (uint256 i = 0; i < allPropertyIds.length; i++) {
            allProperties[i] = properties[allPropertyIds[i]];
        }
        
        return allProperties;
    }

    /**
     * @dev Retorna todos os imóveis de um proprietário específico
     * @param _owner Endereço do proprietário
     * @return Lista com imóveis do proprietário
     */
    function getPropertiesByOwner(address _owner) external view returns (Property[] memory) {
        uint256[] memory ownerPropertyIds = ownerProperties[_owner];
        Property[] memory ownerProps = new Property[](ownerPropertyIds.length);
        
        for (uint256 i = 0; i < ownerPropertyIds.length; i++) {
            ownerProps[i] = properties[ownerPropertyIds[i]];
        }
        
        return ownerProps;
    }

    /**
     * @dev Permite ao dono da plataforma coletar as taxas acumuladas
     */
    function collectPlatformFees() external onlyOwner {
        uint256 amount = platformEarnings[owner];
        require(amount > 0, "Nenhuma taxa disponivel para coleta");
        
        platformEarnings[owner] = 0;
        payable(owner).transfer(amount);
        
        emit PlatformFeeCollected(amount, owner);
    }

    // ========== FUNÇÕES DE VISUALIZAÇÃO ==========

    /**
     * @dev Retorna informações básicas da plataforma
     * @return totalProperties Total de imóveis cadastrados
     * @return totalRentals Total de aluguéis realizados
     * @return platformBalance Taxa acumulada da plataforma
     */
    function getPlatformStats() external view returns (
        uint256 totalProperties,
        uint256 totalRentals,
        uint256 platformBalance
    ) {
        return (
            propertyCounter,
            rentalCounter,
            platformEarnings[owner]
        );
    }

    /**
     * @dev Retorna um imóvel específico pelo ID
     * @param _propertyId ID do imóvel
     * @return Dados completos do imóvel
     */
    function getProperty(uint256 _propertyId) 
        external 
        view 
        propertyExists(_propertyId) 
        returns (Property memory) 
    {
        return properties[_propertyId];
    }

    /**
     * @dev Retorna a quantidade de imóveis de um proprietário
     * @param _owner Endereço do proprietário
     * @return Quantidade de imóveis
     */
    function getOwnerPropertyCount(address _owner) external view returns (uint256) {
        return ownerProperties[_owner].length;
    }
}
