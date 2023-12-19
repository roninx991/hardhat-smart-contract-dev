import { ethers } from "ethers";
import mongoose, { CHAINS_COLLECTION } from "../config/database";
import { Chain } from "../interfaces/chain";

export const addContract = async (chainId: number, name: string, address: string, contract: ethers.ContractInterface) => {
    let chain = mongoose.connection.db.collection(CHAINS_COLLECTION).findOne({ "chainId": chainId }) as unknown as Chain;
    let contracts = chain.contracts;
    contracts.push({
        name: name,
        address: address,
        abi: contract
    });
    await mongoose.connection.db.collection(CHAINS_COLLECTION).updateOne({ "chainId": chainId }, { $set: { "contracts": contracts }});
}

export const getChain = async (chainId: number) => {
    return mongoose.connection.db.collection(CHAINS_COLLECTION).findOne({ "chainId": chainId }) as unknown as Chain;
}

export const saveChain = async (chain: Chain) => {
    await mongoose.connection.db.collection(CHAINS_COLLECTION).insertOne(chain);
}
