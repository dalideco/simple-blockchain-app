const EC = require('elliptic').ec;
const ec = new EC('secp256k1')
const {v1:uuidv1} = require('uuid');

class ChainUtil{
    static genKeyPair(){
        return ec.genKeyPair();
    }
    static id(){
        return uuidv1() ;
    }
}

module.exports = ChainUtil;