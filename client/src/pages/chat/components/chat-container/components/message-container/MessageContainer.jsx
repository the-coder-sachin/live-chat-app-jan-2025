import React, { useEffect, useRef } from 'react'
import { useAppStore } from '../../../../../../store'
import moment from 'moment'
import bg from '@/assets/dark-chat-background.jpg'
import { AwardIcon } from 'lucide-react'
import { apiClient } from '../../../../../../lib/api-client'
import { GET_ALL_MESSAGES } from '../../../../../../../utils/constants'

const MessageContainer = () => {

  const {selectedChatType, selectedChatData, selectedChatMessages, setSelectedChatMessages} = useAppStore();
  const scrollRef = useRef();

  useEffect( () => {
    const getAllMessages = async () =>{
      try {
        
        const response = await apiClient.post(
          GET_ALL_MESSAGES,
          { id: selectedChatData._id },
          { withCredentials: true }
        );

        if (response.data.messages) {
          setSelectedChatMessages(response.data.messages);
        }
      } catch (error) {
        console.log({ error });
      }
    }
    if(selectedChatData._id){
      if(selectedChatType === 'contact'){
        getAllMessages()
      }
    }
  }, [setSelectedChatMessages, selectedChatData, selectedChatType]);

  useEffect(()=>{
    if(scrollRef.current){
      scrollRef.current.scrollIntoView({behaviour: 'smooth'})
    }
  },[selectedChatMessages])

  const renderMessages = ()=>{
    let lastDate = null;
    return selectedChatMessages.map((message, index)=>
    {
      const messageDate = moment(message.timeStamp).format('YYYY-MM-DD')
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;
      return (
        <div key={index}>
          {showDate && <div className='text-center text-gray-400 my-2 border-y py-2'>{moment(message.timeStamp).format('LL')}</div>}
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
           {moment(message.timeStamp).format("LT")}
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