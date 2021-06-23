const BlockChain = require('./blockchain/blockchain')

const express = require("express");
const app = express() ; 
const PORT = 3000;


app.use(express.static(__dirname+"/public"));
app.use(express.json());

const blockchain = new BlockChain();

app.get('/blocks',(req, res)=>{
    res.send( blockchain )
})

app.post('/add',(req, res )=>{
    console.log(req);
    const data = req.body.data;
    

    const newBlock  = blockchain.addToChain(data); 
    res.redirect('/blocks')
})

app.listen(PORT,()=>{
    console.log(`server started at port  ${PORT}`)
})