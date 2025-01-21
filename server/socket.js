import { Server } from "socket.io";
import { messageModel } from "./models/MessageModel.js";

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

    const sendMessage = async (message) => {
        const senderShocketId = userSocketMap.get(message.sender);
        const recipientShocketId = userSocketMap.get(message.recipient);

        const createdMessage = await messageModel.create(message)

        const messageData = await messageModel.findById(createdMessage._id)
        .populate('sender', 'id email firstname lastname image color')
        .populate('recipient', 'id email firstname lastname image color')

        if(recipientShocketId){
            io.to(recipientShocketId).emit('recieveMessage', messageData)
        }

        if(senderShocketId){
            io.to(senderShocketId).emit('recieveMessage', messageData)
        }
    }

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

        socket.on("sendMessage" , sendMessage)

        socket.on("disconnect", ()=> disconnect(socket))
    })
}

export default setupShocket;