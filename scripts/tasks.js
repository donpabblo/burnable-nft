const { task } = require("hardhat/config");
const { getContractAt } = require("@nomiclabs/hardhat-ethers/internal/helpers");
require('dotenv').config();
const { CONTRACT } = process.env;

task("set-base-token-uri", "Sets the base token URI for the deployed smart contract")
    .addParam("baseurl", "The base of the tokenURI endpoint to set")
    .setAction(async function (taskArguments, hre) {
        const contract = await getContractAt(hre, "BurnableNFT", CONTRACT);
        const response = await contract.setBaseTokenURI(taskArguments.baseurl, {
            gasLimit: 500_000,
        });
        console.log(`Transaction Hash: ${response.hash}`);
    });

task("get-base-token-uri", "Gets the base token URI for the deployed smart contract")
    .setAction(async function (taskArguments, hre) {
        const contract = await getContractAt(hre, "BurnableNFT", CONTRACT);
        const response = await contract.baseTokenURI();
        console.log(`Response: ${response}`);
    });

task("token-uri", "Gets the token URI metadata")
    .addParam("token", "The token id")
    .setAction(async function (taskArguments, hre) {
        const contract = await getContractAt(hre, "BurnableNFT", CONTRACT);
        const response = await contract.tokenURI(taskArguments.token);
        console.log(`Response: ${response}`);
    });

task("balance", "Gets NFT Owner balance")
    .setAction(async function (taskArguments, hre) {
        const [owner] = await ethers.getSigners();
        const contract = await getContractAt(hre, "BurnableNFT", CONTRACT);
        const response = await contract.balanceOf(owner.address);
        console.log(`Owner balance: ${response}`);
    });

task("ownerOf", "Get NFT Owner")
    .addParam("token", "The token id")
    .setAction(async function (taskArguments, hre) {
        const contract = await getContractAt(hre, "BurnableNFT", CONTRACT);
        const response = await contract.ownerOf(taskArguments.token);
        console.log(`Owner is: ${response}`);
    });

task("burn", "Burn NFT")
    .addParam("token", "The token id")
    .setAction(async function (taskArguments, hre) {
        const contract = await getContractAt(hre, "BurnableNFT", CONTRACT);
        const response = await contract.burn(taskArguments.token);
        console.log(`Result is: ${response}`);
    });

task("try-burn", "Burn NFT")
    .addParam("token", "The token id")
    .setAction(async function (taskArguments, hre) {
        const [owner, user] = await ethers.getSigners();
        const contract = await getContractAt(hre, "BurnableNFT", CONTRACT);
        const response = await contract.connect(user).burn(taskArguments.token)
            .catch(err => {
                console.log(`Result is: ${err}`);
            });
        console.log(`Result is: ${response}`);
    });

task("mint", "Burn NFT")
    .setAction(async function (taskArguments, hre) {
        const contract = await getContractAt(hre, "BurnableNFT", CONTRACT);
        const response = await contract.mint()
        console.log(`Result is: ${response}`);
    });

