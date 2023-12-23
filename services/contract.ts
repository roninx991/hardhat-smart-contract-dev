import { ethers } from "hardhat";
import { getChain, saveChain } from "../services/chain";
import { BaseContract, ContractInterface } from "ethers";
import mongoose, { CHAINS_COLLECTION } from "../config/database";

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

export const addContract = async (chainId: number, name: string, address: string, contract: ContractInterface) => {
    let chain = await getChain(chainId);
    let contracts = chain.contracts;
    contracts.push({
        name: name,
        address: address,
        abi: contract
    });
    await mongoose.connection.db.collection(CHAINS_COLLECTION).updateOne({ "chainId": chainId }, { $set: { "contracts": contracts }});
}
