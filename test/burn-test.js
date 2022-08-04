const { expect } = require("chai");

var contractAddress = "";
var numToken = 10;

describe("Setup", function () {
    it("Deployment", async function () {
        const contract = await ethers.getContractFactory("BurnableNFT");
        hardhatContract = await contract.deploy("BurnableNFT - Don Pabblo", "BUR");
        contractAddress = hardhatContract.address;
        expect(await hardhatContract.symbol()).to.equal("BUR");
    });
    it("Minting", async function () {
        const contract = await hre.ethers.getContractAt("BurnableNFT", contractAddress);
        for (let i = 0; i < numToken; i++) {
            const txResponse = await contract.mint();
            await txResponse.wait();
        }
        const [owner] = await ethers.getSigners();
        const balance = await contract.balanceOf(owner.address);
        expect(BigInt(balance)).to.equal(BigInt(numToken));
    });
});

describe("Burning", function () {
    it("Fails because not owner", async function () {
        const [owner, user] = await ethers.getSigners();
        const contract = await hre.ethers.getContractAt("BurnableNFT", contractAddress);
        await contract.connect(user).burn(1).catch(err => {
            expect(err.message).to.contain("Only the owner of NFT can transfer or burn it");
        });
    });
    it("Burning ok", async function () {
        const contract = await hre.ethers.getContractAt("BurnableNFT", contractAddress);
        const txResponse = await contract.burn(1);
        await txResponse.wait();
    });
    it("Check burned", async function () {
        const contract = await hre.ethers.getContractAt("BurnableNFT", contractAddress);
        
        await contract.ownerOf(1).catch(err => {
            expect(err.error.message).to.contain("ERC721: owner query for nonexistent token");
        });

        const [owner] = await ethers.getSigners();
        const balance = await contract.balanceOf(owner.address);
        expect(BigInt(balance)).to.equal(BigInt(numToken - 1));
    });
});
