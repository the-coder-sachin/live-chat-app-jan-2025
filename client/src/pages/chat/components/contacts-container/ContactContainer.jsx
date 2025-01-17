import React from 'react'
import appLogo from "@/assets/chat-box.png";
import ProfileInfo from './components/profile-info/ProfileInfo';

const ContactContainer = () => {
  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vh] bg-[#1b1c24] border-r-2 border-[#2f303b] w-[100vw] ">
      <Logo/>

      <div className="my-5"></div>
      <div className="flex justify-between pr-10 items-center">
      <Title text={'direct messages'}/>
      </div>

      <div className="my-5"></div>
      <div className="flex justify-between pr-10 items-center">
      <Title text={'channels'}/>
      </div>

      <div className="my-5"></div>
      <div className="flex justify-between pr-10 items-center">
      <Title text={'direct messages'}/>
      </div>
      <ProfileInfo/>
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