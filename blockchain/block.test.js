const Block = require('./block')


// @ts-ignore
describe('Block',()=>{

    let block ; 
    
    // @ts-ignore
    beforeEach(()=>{
        block = Block.mineBlock('foo',Block.genesis());
    })


    // @ts-ignore
    it('test if the data is accurate',()=>{
        // @ts-ignore
        expect(block.data).toEqual('foo')
    })

    // @ts-ignore
    it('tests if last hash equals to hash of last block',()=>{
        // @ts-ignore
        expect(block.lastHash).toEqual(Block.genesis().hash)
    })

   
    

    // @ts-ignore
    it("expects the block difficulty to get lower on larger timestamps",()=>{
        // @ts-ignore
        expect(Block.adjustDifficulty(block, block.timestamp+360000)).toEqual(block.difficulty-1)
    })

    // @ts-ignore
    it("expects the block difficulty to get bigger on smaller timestamps",()=>{
        // @ts-ignore
        expect(Block.adjustDifficulty(block, block.timestamp+1)).toEqual(block.difficulty+1)
    })

     // @ts-ignore
    it("expects the hash to match the difficulty",()=>{
        // @ts-ignore
        expect(block.hash.substring(0,block.difficulty)).toEqual('0'.repeat(block.difficulty));
    })
})