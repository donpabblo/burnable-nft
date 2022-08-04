const { task } = require("hardhat/config");
const { writeConfig } = require("./helpers");

task("deploy", "Deploys contract")
    .setAction(async function (taskArguments, hre) {
        const contract = await hre.ethers.getContractFactory("BurnableNFT");
        const BurnableNFT = await contract.deploy("Don Pablo BurnableNFT", "BUR");
        const address = BurnableNFT.address;
        console.log(`NFT contract deployed to address: ${address}`);

        writeConfig(address);

    });