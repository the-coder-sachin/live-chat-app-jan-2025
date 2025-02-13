import { Server } from "socket.io";
import { messageModel } from "./models/MessageModel.js";
import { channelModel } from "./models/ChannelModel.js";

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
    const sendChannelMessage = async (message)=>{
        const {channelId, sender, content, messageType, fileUrl} = message;

        const createdMessage = await messageModel.create({
            sender,
            recipient:null,
            content,
            messageType,
            timeStamp: new Date(),
            fileUrl,
        })

        const messageData = await messageModel.findById(createdMessage._id).populate('sender','id email firstname lastname image color').exec()

        await channelModel.findByIdAndUpdate(channelId, {
            $push:{message: createdMessage._id}
        })

        const channel = await channelModel.findById(channelId).populate('members');

        const finalData = {...messageData._doc, channelId: channel._id};

        if(channel && channel.members){
            channel.members.forEach(member=>{
                const memberSocketId = userSocketMap.get(member._id.toString())
                if(memberSocketId){
                    io.to(memberSocketId).emit('recieve-channel-message', finalData)
                }
            })
            const adminSocketId = userSocketMap.get(channel.admin._id.toString())
            if(adminSocketId){
                io.to(adminSocketId).emit('recieve-channel-message', finalData)
            }
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

        socket.on("send-channel-message", sendChannelMessage);
    })
}

export default setupShocket;