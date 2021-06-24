const BlockChain = require('../blockchain/blockchain')
const P2pServer = require('./p2p-server')

const express = require("express");
const app = express() ; 
const HTTP_PORT = process.env.HTTP_PORT || 3000;

app.use(express.static(__dirname+"/public"));
app.use(express.json());

const blockchain = new BlockChain();
const peer2peer = new P2pServer(blockchain);

app.get('/blocks',(req, res)=>{
    res.send( blockchain )
})

app.post('/add',(req, res )=>{
    const data = req.body.data;
    const newBlock  = blockchain.addToChain(data); 
    peer2peer.syncAll();
    res.redirect('/blocks')
})

app.listen(HTTP_PORT,()=>{
    console.log(`server started at port  ${HTTP_PORT}`)
})
peer2peer.listen()