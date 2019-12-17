
const abi = [{"constant":true,"inputs":[],"name":"getMusic","outputs":[{"components":[{"name":"_hashMusic","type":"string"}],"name":"","type":"tuple[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"musices","outputs":[{"name":"_hashMusic","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_hashMusic","type":"string"}],"name":"setMusic","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
const address = "0xFB01CD6cb7f01dA698D8Ed8a6D81a4E055211AAa"

const MNEMONIC = "border senior glare delay family stone hill middle dog century sick milk"
const INFURA_URL = "https://ropsten.infura.io/v3/71b5fd4f2e6e40a28b8bd966505394e4"

module.exports.abi  = abi;
module.exports.address = address;
module.exports.MNEMONIC = MNEMONIC;
module.exports.INFURA_URL = INFURA_URL;