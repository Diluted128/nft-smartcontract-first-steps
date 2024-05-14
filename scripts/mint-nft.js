require('dotenv').config();

const ethers= require('ethers');

const API_KEY = process.env.API_KEY;
const privateKey = process.env.PRIVATE_KEY

const contract = require("../artifacts/contracts/CuteFruits.sol/CuteFruits.json");
const contractAddress = '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9'
const abi = contract.abi

const tokenUri = "https://gateway.pinata.cloud/ipfs/QmVqPk1zQs1y6NX9CeEfsGfEJZmtxfbjziEy8vzFbS6gUh"

// Call mintNFT function
const mintNFT = async () => {
    const provider = new ethers.AlchemyProvider('sepolia', API_KEY)
    const signer = new ethers.Wallet(privateKey, provider)
    const myNftContract = new ethers.Contract(contractAddress, abi, signer)
    let nftTxn = await myNftContract.payToMint(signer.address, tokenUri)
    await nftTxn.wait()
    console.log(`NFT Minted! Check it out at: https://sepolia.etherscan.io/tx/${nftTxn.hash}`)
    console.log("NFT " + tokenUri + " has been minted.");
}

mintNFT()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });