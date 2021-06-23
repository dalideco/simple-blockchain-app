import Block from './blockchain/block.js'; 

const genesisBlock = Block.genesis();

console.log(genesisBlock.toString());

const otherBlock = Block.mineBlock(['what the fuck'],genesisBlock);
console.log(otherBlock.toString());