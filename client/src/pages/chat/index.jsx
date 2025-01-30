import React, { useEffect } from "react";
import { useAppStore } from "../../store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ChatContainer from "./components/chat-container/ChatContainer";
import ContactContainer from "./components/contacts-container/ContactContainer";
import EmptyChatContainer from "./components/empty-chat-container.jsx/EmptyChatContainer";

const Chat = () => {
  const {
    userInfo,
    selectedChatType,
    isUploading,
    isDownloading,
    fileUploadProgress,
    fileDownloadProgress,
  } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast("please setup your profile first...");
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  return (
    <>
      <div className="flex h-[100vh] text-white overflow-hidden">
        {isUploading && <div className="flex justify-center items-center fixed top-0 left-0 z-10 h-[100vh] w-[100vw] bg-black/80 backdrop-blur-sm">
        <h3 className="text-xl lg:text-5xl animate-pulse">uploading file...</h3>
        {fileUploadProgress}%
        </div>}
        {isDownloading && <div className="flex justify-center items-center fixed top-0 left-0 z-10 h-[100vh] w-[100vw] bg-black/80 backdrop-blur-sm">
        <h3 className="text-xl lg:text-5xl animate-pulse">downloading file...</h3>
        {fileDownloadProgress}%
        </div>}
        <ContactContainer />
        {selectedChatType == undefined ? (
          <EmptyChatContainer />
        ) : (
          <ChatContainer />
        )}
      </div>
    </>
  );
};

export default Chat;
