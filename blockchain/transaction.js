const ChainUtil = require("../chain-util");

class Transaction { 
    constructor() { 
        this.id = ChainUtil.id(); 
        this.input = null; 
        this.outputs = [];
    }

    static newTransaction (senderWallet,recipient,amount){
        const transaction = new this (); 
        if(senderWallet.balance < amount ){
            console.log("balance not sufficient to pay an amout of "+amount ) ;
            return ; 
        }
        transaction.outputs.push(...[
            {amount: senderWallet.balance-amount, address : senderWallet.publicKey},
            {amount, address:recipient }
        ])
        return transaction;
    }

    toString (){
        return `
            id = ${this.id}
            input = ${this.input}
            outputs = ${this.outputs}
        `
    }
}

module.exports = Transaction