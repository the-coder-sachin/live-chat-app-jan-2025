import React, { useRef, useState } from 'react'
import { GrAttachment } from "react-icons/gr";
import { RiEmojiStickerLine } from 'react-icons/ri';
import { AiOutlineSend } from "react-icons/ai";
import EmojiPicker from 'emoji-picker-react'

const MessageBar = () => {
    const emojiRef = useRef()
    const [emojiPickerState, setEmojiPickerState] = useState(false)

    const [message, setMessage] = useState('')

    const handleAddEmoji = (emoji)=>{
        setMessage(msg => msg + emoji.emoji)
    }

    const handleSendMessage = async ()=>{}
  return (
    <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center p-8 mb-5 gap-6">
      <div className="flex flex-1 bg-[#2a2b33] rounded-md gap-5 items-center pr-5">
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
        onClick={()=>setEmojiPickerState(prev=>!prev)}
        className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-100 transition-all">
          <RiEmojiStickerLine className="text-xl" />
        </button>
        </div>
        <div className="absolute bottom-16 right-0">
            <EmojiPicker 
            theme='dark' 
            open={emojiPickerState}
            onEmojiClick={handleAddEmoji}
            autoFocusSearch={false}
            />
        </div>
      </div>
      <button 
      onClick={handleSendMessage}
      className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-100 transition-all bg-green-600 rounded-md items-center justify-center p-5 hover:bg-green-800 hover:text-green-200">
        <AiOutlineSend className="text-xl" />
      </button>
    </div>
  );
}

export default MessageBar