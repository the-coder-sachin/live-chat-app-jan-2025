import { Server } from "socket.io";

const setupShocket = (server) => {
    const io = new Server(server,
        {
            cors:{
                origin: process.env.ORIGIN,
                methods: ['get', 'post'],
                credentials: true
            }
        }
    )

    const userSocketMap = new Map()

    const disconnect = (socket) =>{
        console.log(`client disconnect : ${socket.id}`);
        for(const [userId, socketId] of userSocketMap.entries()){
            if(socketId === socket.id){
                userSocketMap.delete(userId)
                break;
            }
        }
    }

    io.on("connection", (socket)=>{
        const userId = socket.handshake.query.userId;

        if(userId){
            console.log(`user connected ${userId} @ socket id: ${socket.id}`);
            userSocketMap.set(userId, socket.id)
        }else{
            console.log(`user ID missing during connection`);
            
        }

        socket.on("disconnect", ()=> disconnect(socket))
    })
}

export default setupShocket;