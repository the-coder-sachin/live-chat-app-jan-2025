import React, { useState } from "react";
import { useAppStore } from "../../../../../../store";
import { host } from "../../../../../../../utils/constants.js";
import { getColor } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaUserEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const ProfileInfo = () => {
  const { userInfo } = useAppStore();
  const navigate = useNavigate()
  

  return (
    <div className="absolute bottom-0 flex h-16 items-center justify-between px-10 w-full bg-[#2a2b33] ">
      <div className="flex gap-3 items-center justify-center">
        <div className="img border-white rounded-full w-fit hover:scale-110 transition-all ease-in-out cursor-pointer relative">
          {userInfo.image ? (
            <>
              <img
                src={`${host}profiles/${userInfo.image}`}
                alt="profile"
                className={`rounded-full border-2 size-10 flex justify-center items-center text-3xl font-bold `}
              />
            </>
          ) : (
            <>
              <p
                className={`rounded-full border-2 size-10 flex justify-center items-center text-lg font-bold ${
                  userInfo.color
                } ${getColor(userInfo.color)} `}
              >
                {userInfo.firstname[0].toUpperCase()}
              </p>
            </>
          )}
        </div>
        <div>
          {userInfo.firstname && userInfo.lastname
            ? `${userInfo.firstname} ${userInfo.lastname}`
            : ``}
        </div>
      </div>
      <div className="flex gap-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FaUserEdit 
              onClick={()=>navigate('/profile')}
              className="text-xl text-yellow-600"/>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ProfileInfo;
