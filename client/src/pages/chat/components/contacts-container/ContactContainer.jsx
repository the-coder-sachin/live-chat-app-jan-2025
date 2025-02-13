import React, { useEffect } from 'react'
import appLogo from "@/assets/chat-box.png";
import ProfileInfo from './components/profile-info/ProfileInfo';
import NewDm from './components/new-dm/NewDm';
import { apiClient } from '../../../../lib/api-client';
import { GET_ALL_CONTACTS, GET_DM_LIST, GET_USER_CHANNEL } from '../../../../../utils/constants.js';
import { useAppStore } from '../../../../store';
import ContactList from '../../../../components/ui/ContactList';
import CreateChannel from './components/create-channel/CreateChannel.jsx';

const ContactContainer = () => {

  const { setDirectMessagesContacts, directMessagesContacts, channels, setChannels } = useAppStore();

  useEffect(()=>{
    const getContacts = async ()=>{
      const response = await apiClient.get(GET_DM_LIST, {withCredentials: true});
      if(response.data && response.data.contact){
        setDirectMessagesContacts(response.data.contact)
      }
    }
    const getChannels = async ()=>{
      const response = await apiClient.get(GET_USER_CHANNEL, {withCredentials: true});
      if(response.data && response.data.channels){
        setChannels(response.data.channels)
      }
    }
    getContacts()
    getChannels()
  },[])

  useEffect(()=>{
    const getAllContacts = async ()=>{
      const response = await apiClient.get(GET_ALL_CONTACTS, {withCredentials: true});
      if(response.data && response.data.contact){
        setDirectMessagesContacts(response.data.contact)
      }
    }
    getAllContacts()
  },[])


  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[25vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-[100vw] select-none">
      <Logo />

      <div className="my-5"></div>
      <div className="flex justify-between pr-10 items-center">
        <Title text={"direct messages"} />
        <NewDm />
      </div>

      <div className="max-h-[160px] overflow-y-auto scrollbar-none">
        <ContactList contacts={directMessagesContacts} />
      </div>

      <div className="my-5"></div>
      <div className="flex justify-between pr-10 items-center">
        <Title text={"channels"} />
        <CreateChannel />
      </div>

      <div className="max-h-[160px] overflow-y-auto scrollbar-none">
        <ContactList contacts={channels} isChannel={true} />
      </div>

      <div className="my-5"></div>
      <div className="flex justify-between pr-10 items-center">
        <Title text={"direct messages"} />
      </div>
      <ProfileInfo />
    </div>
  );
}

const Logo = ()=>{
  return (
    <div className="flex justify-center items-center p-4 text-nowrap relative">
      <img src={appLogo} alt="" className="size-14 object-cover shrink" />
      <h1 data-heading="FREE CHAT" className="golden text-3xl flex-shrink">
        free chat
      </h1>
    </div>
  );
}

const Title = ({text})=>{
  return(
    <h6
    className='uppercase tracking-widest text-sm text-neutral-400 pl-10 font-light text-opacity-90'
    >{text}</h6>
  )
}

export default ContactContainer