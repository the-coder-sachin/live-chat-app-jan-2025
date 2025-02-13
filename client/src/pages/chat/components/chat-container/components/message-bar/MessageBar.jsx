import React, { useRef, useState } from 'react'
import { GrAttachment } from "react-icons/gr";
import { RiEmojiStickerLine } from 'react-icons/ri';
import { AiOutlineSend } from "react-icons/ai";
import EmojiPicker from 'emoji-picker-react'
import { useAppStore } from '../../../../../../store';
import { useSocket } from '../../../../../../context/SocketContext';
import { apiClient } from '../../../../../../lib/api-client';
import { UPLOAD_FILES } from '../../../../../../../utils/constants';


const MessageBar = () => {
    const fileInputRef = useRef()
    const emojiRef = useRef()
    const socket = useSocket()
    const {selectedChatType, selectedChatData, userInfo, setIsUploading, setFileUploadProgress} = useAppStore()
    const [emojiPickerState, setEmojiPickerState] = useState(false)

    const [message, setMessage] = useState('')

    const handleAddEmoji = (emoji)=>{
        setMessage(msg => msg + emoji.emoji)
    }

    const handleSendMessage = async ()=>{
      if(selectedChatType === 'contact'){
        socket.emit("sendMessage" , {
          sender: userInfo.id,
          content: message,
          recipient: selectedChatData._id,
          messageType : 'text',
          fileUrl: undefined,
        })
      }else if(selectedChatType === 'channel'){
        socket.emit("send-channel-message" , {
          sender: userInfo.id,
          content: message,
          messageType : 'text',
          fileUrl: undefined,
          channelId: selectedChatData._id,
        })
      }
      setMessage('')
      setEmojiPickerState(false)
    }

    const handleFileInputClick = ()=>{
      if(fileInputRef.current){
        fileInputRef.current.click()
        console.log('click running');
        
      }
    }

    const handleFileInputChange = async(e)=>{
      try {
        const file = e.target.files[0];

        if(file){
          const formdata = new FormData();
          formdata.append('file', file);
          setIsUploading(true)
          const response = await apiClient.post(UPLOAD_FILES, formdata, {withCredentials:true, onUploadProgress:data=>setFileUploadProgress(Math.round(data.loaded/data.total * 100))})
          if(response.status === 200 && response.data){
            setIsUploading(false)
            if (selectedChatType === "contact") {
              socket.emit("sendMessage", {
                sender: userInfo.id,
                content: undefined,
                recipient: selectedChatData._id,
                messageType: "file",
                fileUrl: response.data.filePath,
              });
            } else if (selectedChatType === "channel") {
              socket.emit("send-channel-message", {
                sender: userInfo.id,
                content: undefined,
                messageType: "file",
                fileUrl: response.data.filePath,
                channelId: selectedChatData._id,
              });
            }
          }
        }
        
      } catch (error) {
        
      }
    }


  return (
    <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center p-8 mb-5 gap-6">
      <div className="flex flex-1 bg-[#2a2b33] rounded-full gap-5 items-center pr-5">
        <input
          type="text"
          className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none"
          placeholder="enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={handleFileInputClick}
          className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-100 transition-all"
        >
          <GrAttachment className="text-xl" />
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileInputChange}
          />
        </button>
        <div className="relative">
          <button
            onClick={() => setEmojiPickerState((prev) => !prev)}
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-100 transition-all"
          >
            <RiEmojiStickerLine className="text-xl" />
          </button>
        </div>
        <div className="absolute bottom-16 right-0">
          <EmojiPicker
            theme="dark"
            open={emojiPickerState}
            onEmojiClick={handleAddEmoji}
            autoFocusSearch={false}
          />
        </div>
      </div>
      <button
        onClick={handleSendMessage}
        className="focus:border-none focus:outline-none focus:text-white duration-100 transition-all bg-[#c0029dd9] text-[#f9b7fe] items-center justify-center p-5 hover:bg-[#c0029d] hover:text-white rounded-full"
      >
        <AiOutlineSend className="text-xl" />
      </button>
    </div>
  );
}

export default MessageBar