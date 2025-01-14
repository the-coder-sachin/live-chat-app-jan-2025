import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store";
import { IoIosArrowBack } from "react-icons/io";
import { colors, getColor } from "../../lib/utils";
import { toast } from "sonner";
import { apiClient } from "../../lib/api-client";
import { FaUserEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { REMOVE_PROFILE_IMAGE_ROUTE, UPDATE_PROFILE_IMAGE_ROUTE, UPDATE_PROFILE_ROUTE } from "../../../utils/constants";


const Profile = () => {
  const navigate = useNavigate();
  const inputRef = useRef();
  const { userInfo, setUserInfo } = useAppStore();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [colorTheme, setColorTheme] = useState(1);

  const validator = () => {
    if (!firstName || !firstName.trim().length) {
      toast.error("please enter first name");
      return false;
    }
    if (!lastName || !lastName.trim().length) {
      toast.error("please enter last name");
      return false;
    }
    if (!colorTheme) {
      toast.error("please choose a color theme");
      return false;
    }
    return true;
  };

  const saveChanges = async () => {
    if (validator()) {
      try {
        const response = await apiClient.post(
          UPDATE_PROFILE_ROUTE,
          { firstName, lastName, color: colorTheme },
          { withCredentials: true }
        )
        if (response.status === 200) {
          setUserInfo({...userInfo, ...response.data });
          toast.success("your profile has been updated");
        }
      } catch (error) {
        console.log(error);
        toast("something went wrong!");
      }
    }
  };

  const changeProfileImage = async (e)=>{
    const file = e.target.files[0];
    setProfileImage(URL.createObjectURL(file))
        if(file){
          const formdata = new FormData()
          formdata.append('profile', file)
          const res = await apiClient.post(
            UPDATE_PROFILE_IMAGE_ROUTE,
            formdata,
            {withCredentials : true}
          )
          if(res.status === 200 && res.data.image){
            setUserInfo({...userInfo, image:res.data.image})
            toast('profile picture updated')
          }
          
        }
    
  }

  const deleteImage = async ()=>{
    console.log(`trying to delete image 1122`);
    const response = await apiClient.delete(REMOVE_PROFILE_IMAGE_ROUTE, {withCredentials : true})
    console.log(response.data);
     if (response.status === 200 && response.data.image) {
       setUserInfo({ ...userInfo, image: response.data.image });
       toast("profile picture removed successfully!");
     }else{
      toast('something went wrong #0823')
     }
    
  }

  useEffect(() => {
    if(userInfo.profileSetup){
      setFirstName(userInfo.firstname);
      setLastName(userInfo.lastname)
      setColorTheme(userInfo.color)
    }
    if(userInfo.image){
      setProfileImage(`http://localhost:3000/profiles/${userInfo.image}`);
    }
    console.log(userInfo);
    
  }, [userInfo, setUserInfo, ])
  

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
            <div
              onClick={() => {
                if (!profileImage) {
                  if (inputRef.current) {
                    inputRef.current.click();
                    setHovered(false);
                  }
                } else {
                  setProfileImage(null);
                  deleteImage()
                }
              }}
              onMouseMove={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="img border-white rounded-full w-fit hover:scale-110 transition-all ease-in-out cursor-pointer relative"
            >
              {hovered && (
                <div className="absolute h-full w-full bg-[#6b6b6b59] rounded-full flex justify-center items-center text-xl">
                  {profileImage ? <RiDeleteBin5Fill /> : <FaUserEdit />}
                </div>
              )}
              {profileImage ? (
                <>
                  <img
                    src={profileImage}
                    alt="profile"
                    className={`rounded-full border-4 size-20 flex justify-center items-center text-3xl font-bold ${
                      hovered && "blud"
                    }`}
                  />
                </>
              ) : (
                <>
                  <p
                    className={`rounded-full border-4 size-20 flex justify-center items-center text-3xl font-bold ${getColor(
                      colorTheme
                    )} ${hovered && "blur-md"} `}
                  >
                    S
                  </p>
                  <input
                    onChange={changeProfileImage}
                    ref={inputRef}
                    type="file"
                    name="profile-image"
                    id="profile-image"
                    className="hidden"
                    accept=".png, .jpg, .jpeg"
                  />
                </>
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
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="first name"
              className="outline-none rounded-full bg-red-300 text-white placeholder:text-red-100 shadow-red-300 shadow-md p-2 border-rose-100 border text-xs md:text-base pl-4"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="last name"
              className="outline-none rounded-full bg-red-300 text-white placeholder:text-red-100 shadow-red-300 shadow-md p-2 border-rose-100 border text-xs md:text-base pl-4"
            />
            <div className="flex gap-2 p-4 justify-center">
              {colors.map((color, index) => (
                <div
                  key={index}
                  onClick={() => setColorTheme(index + 1)}
                  className={`size-8 md:size-12 ${color} rounded-full border-2 hover:border-white hover:scale-[1.2] transition-all ease-in-out cursor-pointer`}
                ></div>
              ))}
            </div>
            <button
              onClick={saveChanges}
              className="bg-rose-500 text-white font-semibold rounded-md py-2 hover:bg-rose-700 "
            >
              save changes
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
