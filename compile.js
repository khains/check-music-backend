const path = require('path');
const fs = require('fs');
const solc = require('solc');

const musicPath = path.resolve(__dirname, 'contracts', 'upload.sol');
const source = fs.readFileSync(musicPath, 'utf8');
const compiledSource = solc.compile(source, 1).contracts[':CheckMusic'];


module.exports = compiledSource;
console.log(compiledSource);