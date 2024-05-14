const hre = require("hardhat");
async function main() {
    const CuteFruits = await hre.ethers.getContractFactory("CuteFruits");
    const cuteFruits = await CuteFruits.deploy();
    console.log("Contract deployed to address:", cuteFruits.target);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });