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

})