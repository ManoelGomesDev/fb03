// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/PropertyRental.sol";

/**
 * @title PropertyRentalTest
 * @dev Testes para o contrato PropertyRental
 */
contract PropertyRentalTest is Test {
    PropertyRental public propertyRental;
    
    // Endereços para testes
    address public owner;           // Dono da plataforma
    address public propertyOwner;   // Proprietário de imóvel
    address public renter;          // Locatário
    
    // Dados de exemplo para testes
    string constant DESCRIPTION = "Apartamento moderno no centro";
    string constant IMAGE_URL = "https://example.com/image.jpg";
    string constant PROPERTY_TYPE = "apartamento";
    uint256 constant DAILY_RATE = 0.05 ether;
    uint256 constant AVAILABLE_DAYS = 30;

    function setUp() public {
        // Define endereços para os testes
        owner = address(this);           // O contrato de teste é o owner
        propertyOwner = makeAddr("propertyOwner");
        renter = makeAddr("renter");
        
        // Deploy do contrato
        propertyRental = new PropertyRental();
        
        // Fornece ETH para os endereços de teste
        vm.deal(propertyOwner, 10 ether);
        vm.deal(renter, 10 ether);
    }

    /**
     * @dev Teste 1: Cadastro de imóvel com sucesso
     */
    function test_RegisterProperty_Success() public {
        // Muda para o endereço do proprietário
        vm.prank(propertyOwner);
        
        // Cadastra o imóvel
        uint256 propertyId = propertyRental.registerProperty(
            DESCRIPTION,
            IMAGE_URL,
            PROPERTY_TYPE,
            DAILY_RATE,
            AVAILABLE_DAYS
        );
        
        // Verifica se o imóvel foi cadastrado corretamente
        PropertyRental.Property memory property = propertyRental.getProperty(propertyId);
        
        assertEq(property.id, 1);
        assertEq(property.owner, propertyOwner);
        assertEq(property.description, DESCRIPTION);
        assertEq(property.imageUrl, IMAGE_URL);
        assertEq(property.propertyType, PROPERTY_TYPE);
        assertEq(property.dailyRate, DAILY_RATE);
        assertEq(property.availableDays, AVAILABLE_DAYS);
        assertTrue(property.isAvailable);
        
        // Verifica estatísticas da plataforma
        (uint256 totalProperties, , ) = propertyRental.getPlatformStats();
        assertEq(totalProperties, 1);
        
        // Verifica se o proprietário tem 1 imóvel
        assertEq(propertyRental.getOwnerPropertyCount(propertyOwner), 1);
    }

    /**
     * @dev Teste 2: Aluguel de imóvel com sucesso
     */
    function test_RentProperty_Success() public {
        // Primeiro cadastra um imóvel
        vm.prank(propertyOwner);
        uint256 propertyId = propertyRental.registerProperty(
            DESCRIPTION,
            IMAGE_URL,
            PROPERTY_TYPE,
            DAILY_RATE,
            AVAILABLE_DAYS
        );
        
        // Calcula valores para 5 dias
        uint256 rentalDays = 5;
        uint256 totalCost = DAILY_RATE * rentalDays;
        uint256 platformFee = (totalCost * 200) / 10000; // 2%
        uint256 ownerAmount = totalCost - platformFee;
        
        // Registra saldo inicial do proprietário
        uint256 initialOwnerBalance = propertyOwner.balance;
        
        // Renter aluga o imóvel
        vm.prank(renter);
        propertyRental.rentProperty{value: totalCost}(propertyId, rentalDays);
        
        // Verifica se o imóvel ficou indisponível
        PropertyRental.Property memory property = propertyRental.getProperty(propertyId);
        assertFalse(property.isAvailable);
        
        // Verifica se o proprietário recebeu o pagamento (menos a taxa)
        assertEq(propertyOwner.balance, initialOwnerBalance + ownerAmount);
        
        // Verifica estatísticas da plataforma
        (, uint256 totalRentals, uint256 platformBalance) = propertyRental.getPlatformStats();
        assertEq(totalRentals, 1);
        assertEq(platformBalance, platformFee);
    }

    /**
     * @dev Teste 3: Falha ao proprietário tentar alugar próprio imóvel
     */
    function test_RentProperty_OwnerCannotRentOwnProperty() public {
        // Cadastra um imóvel
        vm.prank(propertyOwner);
        uint256 propertyId = propertyRental.registerProperty(
            DESCRIPTION,
            IMAGE_URL,
            PROPERTY_TYPE,
            DAILY_RATE,
            AVAILABLE_DAYS
        );
        
        // Proprietário tenta alugar seu próprio imóvel
        vm.prank(propertyOwner);
        vm.expectRevert("Proprietario nao pode alugar seu proprio imovel");
        propertyRental.rentProperty{value: DAILY_RATE}(propertyId, 1);
    }

    /**
     * @dev Teste 4: Listagem de todos os imóveis
     */
    function test_GetAllProperties() public {
        // Cadastra múltiplos imóveis
        vm.prank(propertyOwner);
        propertyRental.registerProperty(DESCRIPTION, IMAGE_URL, PROPERTY_TYPE, DAILY_RATE, AVAILABLE_DAYS);
        
        vm.prank(propertyOwner);
        propertyRental.registerProperty("Casa na praia", IMAGE_URL, "casa", 0.1 ether, 15);
        
        // Lista todos os imóveis
        PropertyRental.Property[] memory allProperties = propertyRental.getAllProperties();
        
        // Verifica se retornou 2 imóveis
        assertEq(allProperties.length, 2);
        assertEq(allProperties[0].description, DESCRIPTION);
        assertEq(allProperties[1].description, "Casa na praia");
    }

    /**
     * @dev Teste 5: Coleta de taxas da plataforma
     */
    function test_CollectPlatformFees() public {
        // Cadastra e aluga um imóvel para gerar taxas
        vm.prank(propertyOwner);
        uint256 propertyId = propertyRental.registerProperty(
            DESCRIPTION,
            IMAGE_URL,
            PROPERTY_TYPE,
            DAILY_RATE,
            AVAILABLE_DAYS
        );
        
        uint256 totalCost = DAILY_RATE * 3;
        uint256 expectedFee = (totalCost * 200) / 10000; // 2%
        
        vm.prank(renter);
        propertyRental.rentProperty{value: totalCost}(propertyId, 3);
        
        // Verifica saldo da plataforma antes da coleta
        (, , uint256 platformBalance) = propertyRental.getPlatformStats();
        assertEq(platformBalance, expectedFee);
        
        // Registra saldo inicial do owner
        uint256 initialBalance = address(this).balance;
        
        // Coleta as taxas
        propertyRental.collectPlatformFees();
        
        // Verifica se as taxas foram coletadas
        assertEq(address(this).balance, initialBalance + expectedFee);
        
        // Verifica se o saldo da plataforma zerou
        (, , uint256 newPlatformBalance) = propertyRental.getPlatformStats();
        assertEq(newPlatformBalance, 0);
    }

    // ========== TESTES DE FALHA ==========

    /**
     * @dev Teste de falha: Cadastro com descrição vazia
     */
    function test_RegisterProperty_FailEmptyDescription() public {
        vm.prank(propertyOwner);
        vm.expectRevert("Descricao nao pode estar vazia");
        propertyRental.registerProperty("", IMAGE_URL, PROPERTY_TYPE, DAILY_RATE, AVAILABLE_DAYS);
    }

    /**
     * @dev Teste de falha: Aluguel com valor insuficiente
     */
    function test_RentProperty_FailInsufficientValue() public {
        vm.prank(propertyOwner);
        uint256 propertyId = propertyRental.registerProperty(
            DESCRIPTION,
            IMAGE_URL,
            PROPERTY_TYPE,
            DAILY_RATE,
            AVAILABLE_DAYS
        );
        
        vm.prank(renter);
        vm.expectRevert("Valor enviado insuficiente");
        propertyRental.rentProperty{value: DAILY_RATE - 1}(propertyId, 1);
    }

    /**
     * @dev Teste de falha: Tentativa de alugar imóvel inexistente
     */
    function test_RentProperty_FailNonexistentProperty() public {
        vm.prank(renter);
        vm.expectRevert("Imovel nao existe");
        propertyRental.rentProperty{value: DAILY_RATE}(999, 1);
    }

    /**
     * @dev Teste de falha: Coleta de taxas por usuário não autorizado
     */
    function test_CollectPlatformFees_FailUnauthorized() public {
        vm.prank(renter);
        vm.expectRevert("Apenas o dono da plataforma pode executar esta funcao");
        propertyRental.collectPlatformFees();
    }

    // ========== FUNÇÕES AUXILIARES ==========

    /**
     * @dev Função para receber ETH (necessária para o teste de coleta de taxas)
     */
    receive() external payable {}
}
