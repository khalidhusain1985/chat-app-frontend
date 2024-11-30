import { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import ProfileSidebar from "./ChatComponents/ProfileSidebar";
import AudioCallComponent from "./ChatComponents/AudioCallComponent";
import VideoComponent from "./ChatComponents/VideoCallComponent";
import { io } from "socket.io-client";
import chatbg from "../../assets/chatbg.png";
import logo from "../../assets/logo.jpg";

import {
  SearchIcon,
  SidebarIcon,
  VideosIcon,
  AddIcon,
  EmojiIcon,
  PhotoIcon,
  RecordIcon,
  AudioCallIcon,
} from "./Icons";
import { DockIcon, FileScan, List } from "lucide-react";
import { DocumentScanner, LocationOn, LockClock, PunchClock, Share } from "@mui/icons-material";
import { ListItemIcon, Select } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const SOCKET_URL = "http://api.messageinabotlle.app";
const ALLOWED_FILE_TYPES = {
  image: ["image/jpeg", "image/png", "image/gif"],
  video: ["video/mp4", "video/webm"],
  audio: ["audio/mp3", "audio/wav", "audio/mpeg"],
  document: ["application/pdf", "application/msword", "text/plain"],
};

function ChatArea({ activeUser }) {
  const navigate = useNavigate();
  const userId = localStorage.getItem("Puser");
  const [message, setMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showLocation,setShowLocation] = useState(false);
  const [muteModalOpen, setMuteModalOpen] = useState(false);
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const [isAudioCallOpen, setIsAudioCallOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [messagesByContact, setMessagesByContact] = useState({});
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [audioPreview, setAudioPreview] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // useEffect(() => {
  //   console.log("Socket initialized:", socket);
  // }, [socket]);

  // Initialize socket connection
  // Initialize socket connection
  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to socket server");
      newSocket.emit("register", userId);
    });

    // Listen for incoming messages
    newSocket.on("receive-message", (data) => {
      setMessagesByContact((prev) => ({
        ...prev,
        [data.senderId]: [
          ...(prev[data.senderId] || []),
          {
            senderId: data.senderId,
            content: data.message,
            type: data.type,
            timestamp: data.timestamp,
          },
        ],
      }));
    });
    // const scrollToBottom = () => {
    //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    // };

    // File upload handler
    // Fetch chat history when component mounts
    const fetchChatHistory = async () => {
      try {
        const response = await fetch(`${SOCKET_URL}/chat-history/${userId}`);
        const history = await response.json();

        // Organize messages by contact
        const messagesByContactId = {};
        history.forEach((msg) => {
          const contactId =
            msg.senderId === userId ? msg.receiverId : msg.senderId;
          if (!messagesByContactId[contactId]) {
            messagesByContactId[contactId] = [];
          }
          messagesByContactId[contactId].push({
            senderId: msg.senderId,
            content: msg.content,
            timestamp: msg.timestamp,
            type: msg.type,
          });
        });

        setMessagesByContact(messagesByContactId);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchChatHistory();

    return () => newSocket.close();
  }, [userId]);

  // Handle starting audio recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudio(audioBlob);
        setAudioPreview(audioUrl);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
      alert("Could not access microphone");
    }
  };

  // Handle stopping audio recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  // Handle sending recorded audio
  const sendRecordedAudio = async () => {
    if (!recordedAudio) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", recordedAudio, "audio-message.webm");
    formData.append("senderId", userId);
    formData.append("receiverId", activeUser._id);

    try {
      const response = await fetch(`${SOCKET_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.url) {
        const messageData = {
          senderId: userId,
          receiverId: activeUser._id,
          message: data.url,
          type: "audio",
        };

        // socket.emit("private-message", messageData);

        setMessagesByContact((prev) => ({
          ...prev,
          [activeUser._id]: [
            ...(prev[activeUser._id] || []),
            {
              senderId: userId,
              content: data.url,
              type: "audio",
              timestamp: new Date(),
            },
          ],
        }));
      }
    } catch (error) {
      console.error("Error uploading audio:", error);
      alert("Error uploading audio message");
    } finally {
      setIsUploading(false);
      setRecordedAudio(null);
      setAudioPreview(null);
    }
  };

  // Cancel recorded audio
  const cancelRecordedAudio = () => {
    setRecordedAudio(null);
    setAudioPreview(null);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const isValidType = Object.values(ALLOWED_FILE_TYPES)
      .flat()
      .includes(file.type);
    if (!isValidType) {
      alert("Invalid file type");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("senderId", userId);
    formData.append("receiverId", activeUser._id);

    try {
      const response = await fetch(`${SOCKET_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.url) {
        const messageData = {
          senderId: userId,
          receiverId: activeUser._id,
          message: data.url,
          type: getFileType(file.type),
        };

        // socket.emit("private-message", messageData);

        setMessagesByContact((prev) => ({
          ...prev,
          [activeUser._id]: [
            ...(prev[activeUser._id] || []),
            {
              senderId: userId,
              content: data.url,
              type: getFileType(file.type),
              timestamp: new Date(),
            },
          ],
        }));
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    } finally {
      setIsUploading(false);
    }
  };

  const getFileType = (mimeType) => {
    if (ALLOWED_FILE_TYPES.image.includes(mimeType)) return "image";
    if (ALLOWED_FILE_TYPES.video.includes(mimeType)) return "video";
    if (ALLOWED_FILE_TYPES.audio.includes(mimeType)) return "audio";
    return "document";
  };
  const sendLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationMessage = `https://www.google.com/maps?q=${latitude},${longitude}`;
  
          const messageData = {
            senderId: userId,
            receiverId: activeUser._id,
            message: locationMessage,
            type: "location",
          };
  
          socket.emit("private-message", messageData);
  
          setMessagesByContact((prev) => ({
            ...prev,
            [activeUser._id]: [
              ...(prev[activeUser._id] || []),
              {
                senderId: userId,
                content: locationMessage,
                timestamp: new Date(),
                type: "location",
              },
            ],
          }));
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Unable to fetch location. Please check your device settings.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };
  const handleVideoCallClick = () => {
    // Opens the video call page in a new tab
    window.open('/videocall', '_blank');
  };
  
  
  

  const renderMessage = (msg) => {
    const isFileUrl = (url) => {
      const extensions = [
        "jpg",
        "jpeg",
        "png",
        "gif",
        "pdf",
        "mp4",
        "mp3",
        "webm",
        "xls",
        "xlsx",
        "ppt",
        "xlsm",
        "wav",

      ];
      return extensions.some((ext) => url.toLowerCase().endsWith(ext));
    };

    if (isFileUrl(msg.content)) {
      console.log("msg type", msg.type);
      switch (msg.type) {
        case "image":
          return (
            <img
              src={msg.content}
              alt="Shared Image"
              className="max-w-xs rounded"
            />
          );
        case "video":
          return (
            <video controls className="max-w-xs">
              <source src={msg.content} type="video/mp4" />
            </video>
          );
        case "audio":
          return (
            <audio controls className="max-w-xs">
              <source src={msg.content} type="audio/webm" />
            </audio>
          );
          case "location":
            const locationCoords = msg.content.split('=')[1]; 
            const [latitude, longitude] = locationCoords.split(',');
          
            return (
              <div className="flex flex-col items-start space-y-2">
                <div
                  className="w-[50%] h-48 bg-cover bg-center rounded-md cursor-pointer"
                  style={{
                    backgroundImage: `url(https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=15&size=600x300&markers=color:red%7Clabel:S%7C${latitude},${longitude})`,
                  }}
                ></div>
                <div className="text-sm text-gray-500">Location shared</div>
              </div>
            );
          


        case "document":
          return (
            <a
              href={msg.content}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white-500 hover:underline"
            >
              <DocumentScanner/>
            </a>
          );
        default:
          return <div>Unsupported file format</div>;
      }
    } else {
      return <div>{msg.content}</div>;
    }
  };

  // Combined handle send function
  const handleSend = () => {
    if (audioPreview) {
      sendRecordedAudio();
    } else if (message.trim() && socket && activeUser) {
      const messageData = {
        senderId: userId,
        receiverId: activeUser._id,
        message: message.trim(),
      };

      socket.emit("private-message", messageData);

      setMessagesByContact((prev) => ({
        ...prev,
        [activeUser._id]: [
          ...(prev[activeUser._id] || []),
          {
            senderId: userId,
            content: message.trim(),
            timestamp: new Date(),
            type: "text",
          },
        ],
      }));

      setMessage("");
    }
  };

  const currentMessages = messagesByContact[activeUser?._id] || [];

  if (!activeUser) {
    return (
      <div
        className="flex-1 flex items-center justify-center bg-cover opacity-80 bg-center pt-72"
        style={{ backgroundImage: `url(${chatbg})` }}
      >
        <p className="text-[#26A69A] font-bold text-[25px] text-center ">
          Select a contact to start chatting
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white ">
  {/* Header */}
  <div className="bg-white p-4 flex justify-between items-center border-b">
    <div className="flex items-center mx-8 lg:mx-4 md:mx-8">
      <div className="w-10 h-10 rounded-full mr-3 bg-gray-300 flex items-center justify-center">
        <img
          src={`http://api.messageinabotlle.app/${activeUser.avatar}`}
          alt={activeUser.firstName}
          className="w-full h-full rounded-full object-cover"
        />
      </div>
      <div onClick={() => setIsSidebarOpen(true)}  className="cursor-pointer">
        <h2 className="font-semibold text-green-600 text-sm md:text-base" onClick={() => setIsSidebarOpen(true)}>
          {activeUser.firstName} {activeUser.lastName}
        </h2>
        <p className="text-xs text-gray-500 md:text-sm">{activeUser.mobile}</p>
      </div>
    </div>
    <div className="flex space-x-2 md:space-x-4">
      <button
        className="p-2 rounded-full"
        onClick={() => setIsAudioCallOpen(true)}
      >
        <AudioCallIcon />
      </button>
      
      <button className="p-2 rounded-full" onClick={handleVideoCallClick}>
      <VideosIcon />
    </button>
      
      
    </div>
  </div>

  {/* Messages Area */}
  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-cover bg-center"
    style={{ backgroundImage: `url(${chatbg})` }}>
    {(messagesByContact[activeUser._id] || []).map((msg, index) => (
      <div
        key={index}
        className={`flex ${msg.senderId === userId ? "justify-end" : "justify-start"}`}
      >
        
        <div
          className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
            msg.senderId === userId ? "bg-[#26A69A] text-white" : "bg-gray-100"
          }`}
        >
          {renderMessage(msg)}
          <div className="text-xs text-white mt-1">
            {new Date(msg.timestamp).toLocaleTimeString()}
          </div>
        </div>
      </div>
    ))}
    <div ref={messagesEndRef} />
    
  </div>

  {/* Input Area with File Upload */}
  <div className="border-t p-4">
    <div className="flex items-center space-x-1 w-full">
    
    
      <div className="flex flex-col">
  
      <button
        className="p-2 rounded-full  hover:bg-gray-200"
        onClick={() => setShowEmojis(!showEmojis)}
      >
        <EmojiIcon />
      </button>
      
      </div>

      {showEmojis && (
        <div className="absolute bottom-16 left-0 w-full sm:w-auto">
          <EmojiPicker
            onEmojiClick={(emojiObject) =>
              setMessage((prev) => prev + emojiObject.emoji)
            }
          />
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
      />
      <div className="flex">

      <button
        onClick={() => fileInputRef.current.click()}
        className="p-2  rounded-full hover:bg-gray-200"
      >
        <AddIcon />
        
      </button>
      <button
  className="p-2 rounded-full text-gray-700 hover:bg-gray-200"
  onClick={sendLocation}
>
  <LocationOn />
</button>

      </div>
      {showLocation && (
        <div className="absolute bottom-16 left-0 w-full sm:w-auto">
          
        </div>
      )}
      

      {isUploading && (
        <div className="h-1 w-20 sm:w-24 md:w-32 bg-gray-200 rounded">
          <div
            className="h-full bg-[#26A69A] rounded"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      )}

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
        placeholder="Write an note and put it in Botlle"
        className="flex-1 border rounded-full w-[10%] py-2 px-4 sm:px-3 md:px-4 focus:outline-none focus:ring-2 focus:ring-[#26A69A]"
      >
        </input>

      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`p-2 rounded-full ${
          isRecording
            ? "bg-red-500 animate-pulse"
            : "bg-gray-100 hover:bg-[#26A69A]"
        }`}
      >
        <RecordIcon />
      </button>

      {isUploading && (
        <div className="h-1 w-20 sm:w-24 md:w-32 bg-gray-200 rounded">
          <div
            className="h-full bg-[#26A69A] rounded"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      )}

      {audioPreview ? (
        <div className="flex items-center space-x-2">
          <audio
            src={audioPreview}
            controls
            className="h-8 w-32 sm:w-24 md:w-32"
          />
          <button
            className="p-2 rounded-full bg-gray-500 hover:bg-[#26A69A] text-white"
            onClick={handleSend}
          >
            <SearchIcon />
          </button>
          <button
            onClick={cancelRecordedAudio}
            className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white"
          >
            ✕
          </button>
        </div>
      ) : (
        <button
          className="p-2 rounded-full  hover:bg-[#26A69A] text-white"
          onClick={handleSend}
        >
          <SearchIcon  className="size-1" />
        </button>
      )}
    </div>
  </div>

  <ProfileSidebar
    open={isSidebarOpen}
    onClose={() => setIsSidebarOpen(false)}
    contact={activeUser}
    muteModalOpen={muteModalOpen}
    onMuteClick={() => setMuteModalOpen(true)}
    onMuteClose={() => setMuteModalOpen(false)}
    onMute={(duration) => console.log(`Muted for ${duration} minutes`)}
  />
  <AudioCallComponent
    open={isAudioCallOpen}
    onClose={() => setIsAudioCallOpen(false)}
    contact={activeUser}
    socket={socket}
  />
  
</div>

  );
}

export default ChatArea;
