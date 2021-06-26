const Block = require("./block");

class BlockChain{
    constructor(){
        this.chain = [Block.genesis()]
    }

    addToChain =(data)=>{
        const newBlock = Block.mineBlock(data, this.chain[this.chain.length-1]);
        // @ts-ignore
        this.chain.push(newBlock);
        return newBlock;
    }

    isValid(){
        if(JSON.stringify(this.chain[0])!==JSON.stringify(Block.genesis()))
            return false;

        for(let i = 1; i<this.chain.length; i++){
            const {data, timestamp, lastHash,nonce, difficulty} = this.chain[i]
            if(this.chain[i].hash!== Block.createHash(data,timestamp,lastHash,nonce,difficulty))
                return false;
            if(this.chain[i].lastHash!==this.chain[i-1].hash)
                return false;
        }

        return true ;
    }

    replaceChain(chain){
        this.chain=[...chain];
    }

}

module.exports = BlockChain