const sha256 = require('sha256')
const {DIFFICULTY, MINE_RATE} = require('../config');

class Block {

    constructor (hash , data, timestamp, lastHash, nonce, difficulty){
        this.hash =hash; 
        this.data=data;
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.nonce = nonce;
        this.difficulty= difficulty || DIFFICULTY
    }

    static genesis () {
        const hash = this.createHash([],'-----', '', 0,DIFFICULTY)
        return new this(hash, [],'-----', '', 0,DIFFICULTY);
    }

    static createHash(data, timestamp,lastHash,nonce , difficulty){
        return sha256(`${data}${timestamp}${lastHash}${nonce}${difficulty}`).toString();
    }

    //returns new block
    static mineBlock(data,lastBlock){

        let timestamp;
        let hash ; 
        let difficulty=lastBlock.difficulty ; 
        let nonce = 0 ; 
        
        do{
            timestamp = Date.now();
            nonce++;
            difficulty = Block.adjustDifficulty(lastBlock, timestamp);
            
            hash = this.createHash(data,timestamp,lastBlock.hash,nonce, difficulty);
        }while(hash.substring(0,difficulty)!=='0'.repeat(difficulty));

        return new this(hash, data, timestamp, lastBlock.hash, nonce, difficulty);
                
    }

    static adjustDifficulty(lastBlock, timestamp){
        return (lastBlock.timestamp+MINE_RATE> timestamp) ? lastBlock.difficulty+1 : lastBlock.difficulty-1;
    }

    toString(){
        return `
            hash = ${this.hash.substring(0,10)}
            data = ${this.data}
            timestamp = ${this.timestamp}
            lastHash = ${this.lastHash.substring(0,10)}
            nonce = ${this.nonce}
            difficulty = ${this.difficulty}
        `
    }
    

}

module.exports = Block;