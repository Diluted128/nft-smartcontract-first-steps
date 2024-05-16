require("dotenv").config();
require("@nomicfoundation/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("@nomicfoundation/hardhat-verify");
const {API_URL, PRIVATE_KEY, ETHERSCAN_API  } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.24",
    networks: {
        hardhat: {},
        sepolia: {
            url: API_URL,
            accounts: [`0x${PRIVATE_KEY}`],
        },
    },
    etherscan: {
        apiKey: {
            sepolia: ETHERSCAN_API,
        }
    }
}
