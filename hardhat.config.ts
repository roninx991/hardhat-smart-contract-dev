import { HardhatUserConfig, vars } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
        optimizer: {
            enabled: true,
            runs: 100
        },
        viaIR: true
    }
  },
  networks: {
    polygon_mumbai: {
        url: 'https://rpc-mumbai.maticvigil.com',
        accounts: [vars.get("ACCOUNT_PRIVATE_KEY")] // Set ACCOUNT_PRIVATE_KEY using command npx hardhat vars set ACCOUNT_PRIVATE_KEY
    }
  }
};

export default config;
