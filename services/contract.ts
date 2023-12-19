import { ethers } from "hardhat";
import { getChain, saveChain } from "../services/chain";
import { BaseContract } from "ethers";

/**
 * 
 * @param name 
 * @param contract 
 */
export const saveContract = async(name: string, contract: BaseContract) => {
    const chainId = (await ethers.provider.getNetwork()).chainId;
    const chain = await getChain(Number(chainId));
    let contractIndex = chain.contracts.findIndex((chainContract) => chainContract.name === name);
    if(contractIndex < 0) {
        chain.contracts.push({
            name: name,
            address: contract.target.toString(),
            abi: JSON.parse(contract.interface.formatJson())
        })
    } else {
        chain.contracts[contractIndex].address = contract.target.toString();
        chain.contracts[contractIndex].abi = JSON.parse(contract.interface.formatJson());
    }
    saveChain(chain);
    console.log(`Deployed ${name} and saved address: ${contract.target}`);
}
