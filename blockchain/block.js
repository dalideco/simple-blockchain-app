const sha256 = require('sha256')

class Block {

    constructor (hash , data, timestamp, lastHash){
        this.hash =hash; 
        this.data=data;
        this.timestamp = timestamp;
        this.lastHash = lastHash;
    }

    static genesis () {
        return new this(this.createHash([],'-----', ''), [],'-----', '');
    }

    static createHash(data, timestamp,lastHash){
        return sha256(`${data}${timestamp}${lastHash}`).toString();
    }

    static mineBlock(data,lastBlock){
        const timestamp = Date.now() ; 
        const lastHash = lastBlock.hash;
        const hash= this.createHash(data, timestamp,lastHash);
        return new this(hash, data, timestamp, lastHash);
    }

    toString(){
        return `
            hash = ${this.hash.substring(0,10)}
            data = ${this.data}
            timestamp = ${this.timestamp}
            lastHash = ${this.lastHash.substring(0,10)}
        `
    }
    

}

module.exports = Block;