import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store';
import { IoIosArrowBack } from "react-icons/io";
import { colors, getColor } from '../../lib/utils';
import { toast } from 'sonner';

const Profile = () => {
  
  
  
  const navigate = useNavigate();
  const {userInfo , setUserInfo} = useAppStore()
  
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [profileImage, setProfileImage] = useState(null);
  const [hovered, setHovered] = useState(false)
  const [colorTheme, setColorTheme] = useState(3)
  
  const validator = () =>{
    if(!firstName || !firstName.trim().length){
      toast.error('please enter first name')
      return false
    }
    if(!lastName || !lastName.trim().length){
      toast.error('please enter last name')
      return false
    }
    if(!colorTheme){
      toast.error('please choose a color theme')
      return false
    }
    return true;
  }
  
  const saveChanges = async ()=>{
    if(validator()){
      toast.success("your profile has been updated");
    }
  }
  

  return (
    <>
      <main className="bg-red-100 h-[100vh] flex justify-center items-center ">
        <div className="container bg-red-200 w-96 p-7 rounded-lg flex flex-col justify-between items-center gap-2 relative">
          <button
            onClick={() => navigate("/chat")}
            className="absolute text-xl p-2 text-white bg-red-300 rounded-full hover:bg-red-400 top-2 left-2 shadow-md border border-t-rose-200"
          >
            <IoIosArrowBack />
          </button>
          <div className="left-profile">
            <div className="img border-4 border-white rounded-full w-fit">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="profile"
                  className="rounded-full size-14"
                />
              ) : (
                <p
                  className={`rounded-full size-20 flex justify-center items-center text-3xl font-bold ${getColor(
                    colorTheme
                  )} `}
                >
                  S
                </p>
              )}
            </div>
          </div>
          <div className="right-details flex flex-col w-full p-3 gap-2 flex-grow">
            <p className="text-sm md:text-lg text-center font-bold text-rose-500">
              {" "}
              hey!
              <span className="text-cyan-600 text-xs md:text-base ml-2 font-normal">
                random@user.com
              </span>
            </p>
            <input
              type="text"
              value={firstName}
              onChange={e=>setFirstName(e.target.value)}
              placeholder="first name"
              className="outline-none rounded-full bg-red-300 text-white placeholder:text-red-100 shadow-red-300 shadow-md p-2 border-rose-100 border text-xs md:text-base pl-4"
            />
            <input
              type="text"
              value={lastName}
              onChange={e=>setLastName(e.target.value)}
              placeholder="last name"
              className="outline-none rounded-full bg-red-300 text-white placeholder:text-red-100 shadow-red-300 shadow-md p-2 border-rose-100 border text-xs md:text-base pl-4"
            />
            <div className="flex gap-2 p-4 justify-center">
              {colors.map((color, index) => (
                <div
                  key={index}
                  onClick={() => setColorTheme(index+1)}
                  className={`size-8 md:size-12 ${color} rounded-full border-2 hover:border-white hover:scale-[1.2] transition-all ease-in-out cursor-pointer`}
                ></div>
              ))}
            </div>
            <button 
            onClick={saveChanges}
            className="bg-rose-500 text-white font-semibold rounded-md py-2 hover:bg-rose-700 ">
              save changes
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default Profile