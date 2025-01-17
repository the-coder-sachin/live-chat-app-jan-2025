import React from 'react'
import { RiCloseFill } from 'react-icons/ri'

const ChatHeader = () => {
  return (
    <div className='h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-20'>
        <div className="flex gap-5 items-center">
            <div className="flex justify-center gap-3 items-center"></div>
            <div className="flex justify-center items-center gap-5">
                <button className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-100 transition-all'>
                    <RiCloseFill/>
                </button>
            </div>
        </div>
        </div>
  )
}

export default ChatHeader