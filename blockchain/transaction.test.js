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
    it('checks that the input amount is equal to the balance of the wallet',()=>{
        // @ts-ignore
        expect(transaction.input.amount).toEqual(wallet.balance)
    })

    // @ts-ignore
    it("checks if the transaction is valid", ()=>{
        // @ts-ignore
        expect(Transaction.verifyTransaction(transaction)).toBe(true); 
    })

    // @ts-ignore
    it("checks if tempered with transaction is not valid",()=>{
        transaction.outputs[0].amount= 50000;
        // @ts-ignore
        expect(Transaction.verifyTransaction(transaction)).toBe(false);
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


    // @ts-ignore
    describe('upading a transaction', () => {
        let nextAmount, nextRecipient; 
        // @ts-ignore
        beforeEach(()=>{
            nextAmount= 20;
            nextRecipient ="n3xt-4dder355";
            transaction=transaction.update(wallet, nextRecipient,nextAmount)
        })

        // @ts-ignore
        it('substracts the next amout from senders output',()=>{
            // @ts-ignore
            expect(
                transaction.outputs.find(output=> output.address === wallet.publicKey).amount
            ).toEqual(
                // @ts-ignore
                wallet.balance - amount -nextAmount
            )
        })

        // @ts-ignore
        it('outputs the amount of the next recipient',()=>{
            // @ts-ignore
            expect(
                transaction.outputs.find(output=>output.address ===nextRecipient).amount
            )
            .toEqual(
                nextAmount
            )
        })
    });
    
    
})