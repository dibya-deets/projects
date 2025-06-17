require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // Load environment variables

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL, 
      accounts: [process.env.PRIVATE_KEY_ACC1, process.env.PRIVATE_KEY_ACC2] // Replace with your private keys
       // MetaMask private key
    },
  },
  // etherscan: {
  //   apiKey: process.env.ETHERSCAN_API_KEY, // For verifying contracts
  // },
};