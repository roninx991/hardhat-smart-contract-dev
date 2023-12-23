import { ethers } from "hardhat";
import { addContract, saveContract } from "../services/contract";
import { getChain } from "../services/chain";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = ethers.parseEther("0.001");

  const lock = await ethers.deployContract("Lock", [unlockTime], {
    value: lockedAmount,
  });

  await lock.waitForDeployment();

  let chain = await getChain(Number((await ethers.provider.getNetwork()).chainId))

  if (chain.contracts.findIndex((contract) => contract.name == "Lock") >= 0) {
    saveContract("Lock", lock);
  } else {
    addContract(
      Number((await ethers.provider.getNetwork()).chainId), 
      "Lock", 
      lock.target.toString(), 
      JSON.parse(lock.interface.formatJson())
    )  
  }

  console.log(
    `Lock with ${ethers.formatEther(
      lockedAmount
    )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`
  );

  process.exit(0);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
