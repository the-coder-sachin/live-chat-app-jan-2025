import React, { useEffect, useRef, useState } from 'react'
import { useAppStore } from '../../../../../../store'
import moment from 'moment'
import bg from '@/assets/dark-chat-background.jpg'
import { apiClient } from '../../../../../../lib/api-client'
import { IoChevronBack, IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import { GET_ALL_MESSAGES, host } from '../../../../../../../utils/constants.js'
import { IoChevronBackCircle } from "react-icons/io5";

const MessageContainer = () => {

  const {selectedChatType, selectedChatData, selectedChatMessages, setSelectedChatMessages} = useAppStore();
  const scrollRef = useRef();
  const [showImage, setShowImage] = useState(false);
  const [imageURL, setImageURL] = useState(null);

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

  const checkIfImage = (filePath)=>{
    const imgRegex = /\.(jpg|jpeg|png|bmp|tiff|tif|webp|svg|ico|heic|heif)$/i;

    return imgRegex.test(filePath)
  }

  const handleDownload = async (url)=>{
    const response = await apiClient.get(`${host}${url}`, {responseType: Blob})
    const urlBlob = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement("a")
    link.href = urlBlob
    link.setAttribute('download', url.split('/').pop());
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(urlBlob);
  }

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
             }border inline-block py-2 px-4 my-1 lg:max-w-[50%]  break-words`}
           >
             {message.content}
           </div>
         )}
         {message.messageType === "file" && (
           <div
             className={`${
               message.sender !== selectedChatData._id
                 ? "bg-[#c0029d3a] text-[#f9b7fe] border-[#ca73f3] rounded-xl rounded-br-none "
                 : "bg-[#038bcf8e] text-[#bcfbff] border-[#ffffff]/20 rounded-xl rounded-tl-none "
             }border inline-block p-1  my-1 lg:max-w-[50%] break-words`}
           >
             {checkIfImage(message.fileUrl) ? (
               <div 
               onClick={()=>{setImageURL(message.fileUrl);
                setShowImage(true)
               }}
               className="cursor-pointer">
                 <img
                   src={`${host}${message.fileUrl}`}
                   alt="image"
                   className="size-52 object-cover rounded-xl"
                 />
               </div>
             ) : (
               <div className="flex justify-center items-center gap-5">
                 <span className="rounded-full p-3 text-3xl text-neutral-200">
                   <IoDocumentTextOutline />
                 </span>
                 <span className='text-start text-xs'>{message.fileUrl.split("/").pop()}</span>
                 <span
                 onClick={()=>handleDownload(message.fileUrl)}
                 className="rounded-full p-3 text-2xl text-neutral-400 hover:bg-black/30 cursor-pointer">
                   <MdOutlineFileDownload />
                 </span>
               </div>
             )}
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
      {showImage && (
        <div className="h-[100vh] w-[100vw] backdrop-blur-md fixed top-0 left-0 flex justify-center items-center flex-col z-10 bg-black/30">
          <div className="flex fixed left-0 top-0 justify-center items-center ">
            <button
              className="rounded-full m-3 p-3 text-2xl text-neutral-400 hover:text-white hover:bg-black/40 cursor-pointer flex justify-center items-center"
              onClick={() => setShowImage(false)}
            >
              <IoChevronBack />
            </button>
          </div>
          <div>
            <img
              src={`${host}${imageURL}`}
              alt="image"
              className="w-fit h-fit max-w-[90vw] max-h-[90vh] object-cover rounded-md"
            />
          </div>
          <div className="flex fixed left-0 bottom-0 justify-center items-center ">
            <button
              onClick={() => handleDownload(imageURL)}
              className="rounded-full m-3 p-3 text-2xl text-neutral-400 hover:bg-black/30 hover:text-white cursor-pointer"
            >
              <MdOutlineFileDownload />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MessageContainer