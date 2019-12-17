const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {abi, address, MNEMONIC, INFURA_URL} = require('./config');

const provider = new HDWalletProvider(MNEMONIC, INFURA_URL);

const web3 = new Web3(provider);

const musicContract = new web3.eth.Contract(abi, address)

module.exports.musicContract = musicContract;
module.exports.web3 = web3;






