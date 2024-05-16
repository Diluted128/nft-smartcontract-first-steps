require('dotenv').config();

const ethers= require('ethers');

const API_KEY = process.env.API_KEY;
const privateKey = process.env.PRIVATE_KEY

const contract = require("../artifacts/contracts/CuteFruits.sol/CuteFruits.json");
const contractAddress = '0xB9D075aD847Bd64906805AD91241fC564Ab4d125'
const abi = contract.abi

// Call mintNFT function
const mintNFT = async () => {
    const provider = new ethers.AlchemyProvider('sepolia', API_KEY)
    const signer = new ethers.Wallet(privateKey, provider)
    const myNftContract = new ethers.Contract(contractAddress, abi, signer)
    let nftTxn = await myNftContract.mintFruit(8, { value: ethers.parseEther("0.004") });
    await nftTxn.wait()
    console.log(`NFT Minted! Check it out at: https://sepolia.etherscan.io/tx/${nftTxn.hash}`)
}

mintNFT()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });