// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/PropertyRental.sol";

/**
 * @title DeployPropertyRental
 * @dev Script para deploy do contrato PropertyRental
 */
contract DeployPropertyRental is Script {
    function run() external {
        // Inicia o broadcast para deploy
        vm.startBroadcast();
        
        // Deploy do contrato PropertyRental
        PropertyRental propertyRental = new PropertyRental();
        
        // Log do endereço do contrato deployado
        console.log("PropertyRental deployed at:", address(propertyRental));
        console.log("Owner:", propertyRental.owner());
        
        // Para o broadcast
        vm.stopBroadcast();
    }
}
