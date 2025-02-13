import React, { useEffect } from "react";
import { RiCloseFill } from "react-icons/ri";
import { useAppStore } from "../../../../../../store";
import { host } from "../../../../../../../utils/constants";
import { getColor } from "../../../../../../lib/utils";

const ChatHeader = () => {
  const { closeChat, selectedChatData, selectedChatType } = useAppStore();

 

  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between p-6 py-9">
      <div className="flex gap-5 items-center justify-between w-full">
        <div className="flex justify-between items-center w-full gap-5">
          <div className="flex gap-5 items-center">
            {selectedChatType === "contact" && (
              <>
                <div className="avatar size-11 bg-white rounded-full flex justify-center items-center">
                  {selectedChatData.image ? (
                    <>
                      <img
                        src={`${host}profiles/${selectedChatData.image}`}
                        alt="profile"
                        className={`rounded-full border-2 size-10 flex justify-center items-center text-3xl font-bold `}
                      />
                    </>
                  ) : (
                    <>
                      <p
                        className={`rounded-full border-2 size-10 flex justify-center items-center text-lg font-bold ${
                          selectedChatData.color
                        } ${getColor(selectedChatData.color)} `}
                      >
                        {selectedChatData.firstname[0].toUpperCase()}
                      </p>
                    </>
                  )}
                </div>
                <div className="user-info flex flex-col">
                  <p className="name capitalize text-neutral-100">{`${selectedChatData.firstname} ${selectedChatData.lastname}`}</p>
                  <p className="email text-neutral-400 italic text-xs">{`${selectedChatData.email}`}</p>
                </div>
              </>
            )}
            {selectedChatType === "channel" && (
              <>
                <div className="avatar size-11 bg-white rounded-full flex justify-center items-center">
                  {selectedChatData.image ? (
                    <>
                      <img
                        src={`${host}profiles/${selectedChatData.image}`}
                        alt="profile"
                        className={`rounded-full border-2 size-10 flex justify-center items-center text-3xl font-bold `}
                      />
                    </>
                  ) : (
                    <>
                      <p
                        className={`rounded-full border-2 size-10 flex justify-center items-center text-lg font-bold text-black`}
                      >
                        {selectedChatData.name[0].toUpperCase()}
                      </p>
                    </>
                  )}
                </div>
                <div className="user-info flex flex-col">
                  <p className="name capitalize text-neutral-100">{`${selectedChatData.name}`}</p>
                  {/* <p className="email text-neutral-400 italic text-xs">{`${selectedChatData.email}`}</p> */}
                </div>
              </>
            )}
          </div>

          <button
            onClick={closeChat}
            className="text-neutral-500 text-3xl focus:border-none focus:outline-none focus:text-white duration-100 transition-all"
          >
            <RiCloseFill />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
