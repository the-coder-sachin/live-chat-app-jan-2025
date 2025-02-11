import { createContext, useState, useEffect, useRef, useContext } from "react";
import { useAppStore } from "../store";
import { host } from "../../utils/constants";
import { io } from 'socket.io-client'

const SocketContext = createContext(null)

export const useSocket = () =>{
    return useContext(SocketContext)
}

export const SocketProvider = ({children})=>{
    const socket = useRef()
    const {userInfo, addMessage} = useAppStore()
    useEffect(() => {
      if(userInfo){
        socket.current = io(host, {
            withCredentials : true,
            query : {userId: userInfo.id}
        })

        socket.current.on("connect", ()=>{
            console.log(`connected to socket server`);
        })

        const handleRecieveMessage = (message)=>{
            const {selectedChatData , selectedChatType} = useAppStore.getState()

            if(selectedChatType !== undefined && (selectedChatData._id === message.sender._id || selectedChatData._id === message.recipient._id)){
                addMessage(message)
            }
        }

        socket.current.on("recieveMessage", handleRecieveMessage)
        return ()=>{
            socket.current.disconnect()
        }
      }
    }, [userInfo])

    return (
        <SocketContext.Provider value={socket.current}>
            {children}
        </SocketContext.Provider>
    )
    
}