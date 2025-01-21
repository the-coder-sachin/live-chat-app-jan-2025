import React, { useEffect, useRef } from 'react'
import { useAppStore } from '../../../../../../store'
import moment from 'moment'
import bg from '@/assets/dark-chat-background.jpg'

const MessageContainer = () => {

  const {selectedChatType, selectedChatData, userInfo, selectedChatMessages} = useAppStore();
  const scrollRef = useRef();

  useEffect(()=>{
    if(scrollRef.current){
      scrollRef.current.scrollIntoView({behaviour: 'smooth'})
    }
  },[selectedChatMessages])

  const renderMessages = ()=>{
    let lastDate = null;
    return selectedChatMessages.map((message, index)=>
    {
      const messageDate = moment(message.timestamp).format('YYYY-MM-DD')
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;
      return (
        <div key={index}>
          {showDate && <div className='text-center to-gray-500 my-2'>{moment(message.timestamp).format('LL')}</div>}
          {selectedChatType === 'contact' && renderDmMessages(message) }
        </div>
      )
    }
    )
  }

  const renderDmMessages = (message) =>{
     return (
       <div
         className={`${
           message.sender === selectedChatData._id ? "text-left" : "text-right"
         }`}
       >
         {message.messageType === "text" && (
           <div
             className={`${
               message.sender !== selectedChatData._id
                 ? "bg-[#c0029dd9] text-[#f9b7fe] border-[#ca73f3] rounded-full rounded-br-none "
                 : "bg-[#038bcf8e] text-[#bcfbff] border-[#ffffff]/20 rounded-full rounded-tl-none "
             }border inline-block py-2 px-4 my-1 max-w-[50%] break-words`}
           >
             {message.content}
           </div>
         )}
         <div className="text-xs text-gray-600">
           {moment(message.timestamp).format("LT")}
         </div>
       </div>
     );
  }




  return (
    <div className="flex-1 overflow-y-auto scrollbar-none p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full">
      
      {renderMessages()}
      <div ref={scrollRef} />
    </div>
  );
}

export default MessageContainer