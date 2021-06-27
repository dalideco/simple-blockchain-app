const Transaction = require('./transaction');
const Wallet = require('./wallet');

// @ts-ignore
describe('transaction', ()=>{
    let transaction, wallet, recipient, amount ;

    // @ts-ignore
    beforeEach(()=>{
        wallet = new Wallet () ;
        amount = 50 ;
        recipient = "r3c1pnt13"
        transaction = Transaction.newTransaction(wallet,recipient, amount) ;
    })

    // @ts-ignore
    it('checks that it ouputs the wallets new blance',()=>{
        // @ts-ignore
        expect(
            transaction.outputs.find(output=> output.address === wallet.publicKey).amount
        ).toEqual(
            wallet.balance -amount
        )
    })
    // @ts-ignore
    it('checks that it ouputs the amount',()=>{
        // @ts-ignore
        expect(
            transaction.outputs.find(output=> output.address === recipient).amount
        ).toEqual(
            amount
        )
    })


    // @ts-ignore
    describe('a transaction that exceeds the amount', () => {
        // @ts-ignore
        beforeEach(()=>{
            amount = 5000;
            transaction = Transaction.newTransaction(wallet, recipient, amount);
        })
        // @ts-ignore
        it("checks that it doesn't create the transaction",()=>{
            // @ts-ignore
            expect(transaction).toEqual(undefined);
        })
    });
    
})