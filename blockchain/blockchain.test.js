const BlockChain = require('./blockchain');

// @ts-ignore
describe('blockchain',()=>{
    let blockchain ; 

    // @ts-ignore
    beforeEach(()=>{
        blockchain = new BlockChain();
        blockchain.addToChain(['hello']);
    })

    // @ts-ignore
    it('checks if valid',()=>{
        // @ts-ignore
        expect(blockchain.isValid()).toBe(true);
    })
})