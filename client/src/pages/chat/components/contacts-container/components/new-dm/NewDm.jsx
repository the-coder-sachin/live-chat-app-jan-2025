import React, { useState } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FiMail } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TbUserSearch } from "react-icons/tb";
import { FaPlus } from 'react-icons/fa';
import EmptyChatContainer from '../../../empty-chat-container.jsx/EmptyChatContainer';
import Lottie from 'react-lottie';
import { animationDefaultOptions, getColor } from '../../../../../../lib/utils';
import { apiClient } from '../../../../../../lib/api-client';
import { host, SEARCH_CONTACT } from '../../../../../../../utils/constants';


const NewDm = () => {
  const [openNewContactModel, setOpenNewContactModel] = useState(false)
  const [searchedContactList, setSearchedContactList] = useState([])

  const searchContact = async (search)=>{
    const query = search.replace(/ /g, '')
    try {
        if(query.length>0){
            const response = await apiClient.post(SEARCH_CONTACT,
                {query},
                {withCredentials:true}
            )
            if(response.status === 200 && response.data.users){
                setSearchedContactList(response.data.users)
            }
        }
        else{
            setSearchedContactList([])
        }
    } catch (error) {
        console.log({error});
        
    }
  }
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              onClick={() => setOpenNewContactModel(true)}
              className="text-neutral-400 cursor-pointer text-opacity-90 hover:text-neutral-100 "
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>write a new message</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {openNewContactModel && (
        <Dialog
          open={openNewContactModel}
          onOpenChange={setOpenNewContactModel}
        >
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col ">
            <DialogHeader>
            <DialogTitle />
            <DialogDescription/>
              <div className="flex items-center gap-2 justify-center font-semibold">
                Search Contact
                <TbUserSearch className="font-bold" />
              </div>
            </DialogHeader>
            <input
              type="text"
              onChange={(e) => searchContact(e.target.value)}
              className="bg-[#2c2e3b] rounded-full p-2 border-none outline-none px-5 text-neutral-300"
            />
            {searchedContactList.length > 0 && (
              <ScrollArea className="h-[300px]">
                <div className="flex flex-col gap-2">
                  {searchedContactList.map(
                    (contact, id) =>
                      contact.profileSetup && (
                        <div
                          key={id}
                          className="flex justify-between items-center p-3 bg-[#101013] rounded-lg cursor-pointer"
                        >
                          <div className="flex flex-col px-2">
                            <p className="flex items-center gap-3 capitalize">
                              <FaRegUser className="text-xs" />
                              {contact.firstname || "user"}{" "}
                              {contact.lastname || "not specified"}
                            </p>
                            <p className="text-neutral-400 text-xs flex items-center gap-3">
                              <FiMail />
                              {contact.email}
                            </p>
                          </div>
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
                        </div>
                      )
                  )}
                </div>
              </ScrollArea>
            )}
            {searchedContactList.length <= 0 && (
              <div className="flex justify-center items-center duration-1000 transition-all h-full">
                <div className="animate-pulse">
                  <Lottie
                    isClickToPauseDisabled={true}
                    height={150}
                    width={150}
                    options={animationDefaultOptions}
                  />
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default NewDm