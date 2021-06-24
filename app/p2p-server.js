const webSocket = require('ws');
const P2P_PORT =process.env.P2P_PORT || 5000;
const peers = process.env.PEERS? process.env.PEERS.split(',') : []; //form is ws://localhost:port

class P2pServer{
    constructor(blockchain){
        this.blockchain = blockchain;
        this.sockets = [];
    }

    listen(){
        // @ts-ignore
        const server = new webSocket.Server({port: P2P_PORT});
        server.on('connection',(socket)=>{
            this.connectSocket(socket);
        })
        this.connectToPeers();
        console.log(`Listening for peer to peer connection at port ${P2P_PORT}`)
    }

    connectToPeers(){
        peers.forEach(peer=>{
            const socket = new webSocket(peer);
            socket.on('open',()=>{
                this.connectSocket(socket);      
            })
        })
    }

    connectSocket(socket){
        this.sockets.push(socket);
        console.log("Socket connected");
        this.handleMessages(socket);
        this.sendChain(socket);
    
    }
    handleMessages(socket){
        socket.on('message', message=>{
            const data =JSON.parse(message)
            
            this.blockchain.replaceChain(data)
        })
    }

    sendChain (socket){
        socket.send(JSON.stringify(this.blockchain.chain))
    }

    syncAll(){
        this.sockets.forEach(socket=>{
            this.sendChain(socket);
        })
    }

}

module.exports = P2pServer;