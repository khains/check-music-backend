const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
 

const mnemonic = "border senior glare delay family stone hill middle dog century sick milk";
const ropsten_url = "ropsten.infura.io/v3/71b5fd4f2e6e40a28b8bd966505394e4";
const provider = new HDWalletProvider(
    mnemonic,
    ropsten_url
);
 
const web3 = new Web3(provider);
 
const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attemping to deploy from account', accounts[0]);
 
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there!'] })
        .send({ gas: '1000000', from: accounts[0] });
        
    console.log(interface);
    console.log('Contract deployed to ', result.options.address);
};
 
deploy();