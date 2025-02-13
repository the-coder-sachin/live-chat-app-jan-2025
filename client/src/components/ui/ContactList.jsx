import React, { useEffect, useMemo } from 'react'
import { useAppStore } from '../../store'
import { host } from '../../../utils/constants'
import { getColor } from '../../lib/utils'
import { MdGroups2 } from "react-icons/md";

const ContactList = ({contacts, isChannel = false}) => {
   
  const {
    selectedChatData,
    setSelectedChatData,
    setSelectedChatType,
    setSelectedChatMessages,
    channels
    } = useAppStore();


  const handleClick = (contact)=>{
   
    if(isChannel){setSelectedChatType('channel')}else setSelectedChatType('contact')
    setSelectedChatData(contact)
    if(selectedChatData && selectedChatData._id !== contacts._id){
        setSelectedChatMessages([])
    }

  }
  useEffect(() => {
    console.log(channels);
    console.log(contacts);
  }, [])
  
  
  return (
    <div className="mt-5">
      {contacts.map((contact, index) => (
        <div
          key={index}
          onClick={() => handleClick(contact)}
          className={`pl-10 py-2 transition-all duration-300 cursor-pointer text-neutral-400 ${
            selectedChatData && selectedChatData._id === contact._id
              ? "bg-cyan-500 font-semibold hover:bg-cyan-600 text-white"
              : "hover:bg-[#f1f1f111] hover:text-neutral-200"
          }`}
        >
          <div className="flex gap-5 select-none">
            {!isChannel ? (
              <>
                <div className="avatar size-11 bg-white rounded-full flex justify-center items-center">
                  {contact.image ? (
                    <>
                      <img
                        src={`${host}profiles/${contact.image}`}
                        alt="profile"
                        className={`rounded-full border-2 size-10 flex justify-center items-center text-3xl font-bold `}
                      />
                    </>
                  ) : (
                    <>
                      <p
                        className={`rounded-full border-2 size-10 flex justify-center items-center text-lg font-bold ${
                          contact.color
                        } ${getColor(contact.color)} `}
                      >
                        {contact.firstname[0].toUpperCase()}
                      </p>
                    </>
                  )}
                </div>
                <div className="user-info flex flex-col">
                  <p className="name capitalize ">{`${contact.firstname} ${contact.lastname}`}</p>
                  <p className="email italic text-xs">{`${contact.email}`}</p>
                </div>
              </>
            ): (
              <p key={index} className='flex justify-center items-center'>
                <span className="mr-3 text-2xl">
                  <MdGroups2 />
                </span>
                {contact.name}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ContactList