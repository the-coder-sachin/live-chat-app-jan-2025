import React, { useEffect } from 'react'
import { useAppStore } from '../../store'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

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
    <div>Chat:
      <p>hey! {userInfo && userInfo.id}</p>
    </div>
  )
}

export default Chat