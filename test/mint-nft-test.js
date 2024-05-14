const {expect} = require("chai");
const {ethers} = require("hardhat");

describe("MyNFT", function () {
    it('should mint ad transfer an NFT to someone', async () => {
        const CuteFruits = await ethers.getContractFactory("CuteFruits");
        const cuteFruits = await CuteFruits.deploy();

        const recipient = "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720";
        const tokenURI = 'testdata';
        let balance = await cuteFruits.balanceOf(recipient);

        expect(balance).to.equal(0);

        const newlyMintedToken = await cuteFruits.payToMint(
            recipient,
            tokenURI,
            {value: ethers.utils.parseEther('0.06')}
        )

        await newlyMintedToken.wait();

        balance = await cuteFruits.balanceOf(recipient);
        expect(balance).to.equal(1);
        expect(await cuteFruits.isContentOwned(tokenURI)).to.equal(true)
    });
})