const Block = require('./blockchain/block')

const genesisBlock = Block.genesis();

console.log(genesisBlock.toString());

const otherBlock = Block.mineBlock(['what the fuck'],genesisBlock);
// @ts-ignore
console.log(otherBlock.toString());

const secondBlock = Block.mineBlock(['not the fuck'],otherBlock);

console.log(secondBlock.toString());

console.log(otherBlock.difficulty,Block.adjustDifficulty(otherBlock,otherBlock.timestamp+3005))