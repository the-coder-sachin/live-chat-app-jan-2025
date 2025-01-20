import { createContext, useState, useEffect, useRef, useContext } from "react";
import { useAppStore } from "../store";
import { host } from "../../utils/constants";
import { io } from 'socket.io-client'

const SocketContext = createContext(null)

export const userSocket = () =>{
    return useContext(SocketContext)
}

export const SocketProvider = ({children})=>{
    const socket = useRef()
    const {userInfo} = useAppStore()
    useEffect(() => {
      if(userInfo){
        socket.current = io(host, {
            withCredentials : true,
            query : {userId: userInfo.id}
        })

        socket.current.on("connect", ()=>{
            console.log(`connected to socket server`);
        })
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