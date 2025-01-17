import React, { useEffect } from 'react'
import { useAppStore } from '../../store'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ChatContainer from './components/chat-container/ChatContainer';
import ContactContainer from './components/contacts-container/ContactContainer';
import EmptyChatContainer from './components/empty-chat-container.jsx/EmptyChatContainer';

const Chat = () => {
  
  const {userInfo} = useAppStore();
  const navigate = useNavigate()


  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast("please setup your profile first...");
      navigate("/profile");
    }
  }, [userInfo, navigate])
  

  return (
    <>
    <div className='flex h-[100vh] text-white overflow-hidden'>
      <ContactContainer/>
      {/* <EmptyChatContainer/> */}
      <ChatContainer/>
    </div>
    </>
  )
}

export default Chat