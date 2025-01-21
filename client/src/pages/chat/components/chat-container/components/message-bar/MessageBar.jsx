import React, { useRef, useState } from 'react'
import { GrAttachment } from "react-icons/gr";
import { RiEmojiStickerLine } from 'react-icons/ri';
import { AiOutlineSend } from "react-icons/ai";
import EmojiPicker from 'emoji-picker-react'
import { useAppStore } from '../../../../../../store';
import { useSocket } from '../../../../../../context/SocketContext';


const MessageBar = () => {
    const emojiRef = useRef()
    const socket = useSocket()
    const {selectedChatType, selectedChatData, userInfo} = useAppStore()
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
      }
      setMessage('')
      setEmojiPickerState(false)
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
        <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-100 transition-all">
          <GrAttachment className="text-xl" />
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