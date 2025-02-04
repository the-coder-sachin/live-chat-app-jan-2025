import React, { useEffect, useState } from "react";
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
import { FaPlus } from "react-icons/fa";
import EmptyChatContainer from "../../../empty-chat-container.jsx/EmptyChatContainer";
import Lottie from "react-lottie";
import { animationDefaultOptions, getColor } from "../../../../../../lib/utils";
import { apiClient } from "../../../../../../lib/api-client";
import { GET_ALL_CONTACTS, host, SEARCH_CONTACT } from "../../../../../../../utils/constants";
import { useAppStore } from "../../../../../../store";
import MultipleSelector from "../../../../../../components/ui/multipleselect";

const CreateChannel = () => {
  const { setSelectedChatType, setSelectedChatData } = useAppStore();
  const [newChannelModel, setNewChannelModel] = useState(false);
  const [searchedContactList, setSearchedContactList] = useState([]);
  const [allContacts, setAllContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState([]);
  const [channelName, setChannelName] = useState('');

  useEffect(() => {
    const getData = async ()=>{
        const response = await apiClient.get(GET_ALL_CONTACTS, {withCredentials: true});
        if(response.status === 200 && response.data){
            setAllContacts(response.data.contacts)
        }
    }
    getData()
  }, [])
    const createChannel = async ()=>{

    }

 
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              onClick={() => setNewChannelModel(true)}
              className="text-neutral-400 cursor-pointer text-opacity-90 hover:text-neutral-100 "
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>write a new message</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {newChannelModel && (
        <Dialog
          open={newChannelModel}
          onOpenChange={setNewChannelModel}
        >
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col ">
            <DialogHeader>
              <DialogTitle />
              <DialogDescription />
              <div className="flex items-center gap-2 justify-center font-semibold">
                Create Channel
                <TbUserSearch className="font-bold" />
              </div>
            </DialogHeader>
            <input
              type="text"
              value={channelName}
              placeholder="Enter channel name here!"
              onChange={(e) => setChannelName(e.target.value)}
              className="bg-[#2c2e3b] placeholder:text-center rounded-full p-2 border-none outline-none px-5 text-neutral-300"
            />
            <div>
                <MultipleSelector 
                className = 'rounded-lg bg-[#2c2e2b] border-none py-2 outline-none'
                defaultOptions={allContacts}
                placeholder='search contacts'
                value={selectedContact}
                onChange={setSelectedContact}
                emptyIndicator={
                    <p className="text-gray-400 text-center leading-10">no results found.</p>
                } 
                />
            </div>
            <button className="w-full bg-cyan-600 py-2 md:text-lg rounded-full hover:bg-cyan-700">create channel</button>
            
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default CreateChannel;
