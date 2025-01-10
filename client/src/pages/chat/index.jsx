import React from 'react'
import { useAppStore } from '../../store'

const Chat = () => {
  
  const {userInfo} = useAppStore();

  return (
    <div>Chat:
      <p>hey! {userInfo && userInfo.id}</p>
    </div>
  )
}

export default Chat