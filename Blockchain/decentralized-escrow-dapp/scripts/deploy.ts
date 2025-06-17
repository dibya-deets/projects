const { ethers } = require("hardhat");

async function main(){
      const signers = await ethers.getSigners();
    if (signers.length < 2) {
        throw new Error("Not enough signers. Please configure your network with at least 2 accounts.");
    }
    const [depositor, receiver] = await ethers.getSigners();
    const Escrow = await ethers.getContractFactory("Escrow");
    const escrow = await Escrow.deploy(receiver.address);
    await escrow.waitForDeployment();
    console.log("Escrow contract deployed to:", await escrow.getAddress());
    console.log("Depositor address:", depositor.address);
    console.log("Receiver address:", receiver.address);
    const deploymentTx = escrow.deploymentTransaction();
    console.log("Transaction hash:", deploymentTx ? deploymentTx.hash : "Transaction not available");
        const contractAbi = await JSON.stringify(escrow.interface.fragments);
    console.log("Token contract abi is:", contractAbi);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});