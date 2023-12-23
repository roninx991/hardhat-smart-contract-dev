import mongoose, { CHAINS_COLLECTION } from "../config/database";
import { Chain } from "../interfaces/chain";

export const getChain = async (chainId: number) => {
    return mongoose.connection.db.collection(CHAINS_COLLECTION).findOne({ "chainId": chainId }) as unknown as Chain;
}

export const saveChain = async (chain: Chain) => {
    await mongoose.connection.db.collection(CHAINS_COLLECTION).insertOne(chain);
}
