import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Signup from "./components/Login/Signup/Signup";
import Forgot from "./components/Login/Forgot/Forgot";
import Login from "./components/Login/Login/Login";
import ChatApp from "./components/Chat-Sys/ChatApp";
import SetPasswordPage from "./components/Login/SetPasswordPage";
import VerifyPage from "./components/Login/VerifyCode";
import EditProfile from "./components/Chat-Sys/EditProfile";
import { Aifeatures } from "./components/Aifeatures/Aifeatures";
import VideoCallComponent from "./components/Chat-Sys/ChatComponents/VideoCallComponent";
import { Aiplan } from "./components/Aifeatures/Aiplan";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import AccountProvider from "./context/AccountProvider";

function App() {
  const user = localStorage.getItem("token");

  // Request permissions on app load
  useEffect(() => {
    // Requesting camera and microphone permissions (for video calls, etc.)
    const requestMediaPermissions = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,  // Camera permission
          audio: true,  // Microphone permission
        });
        console.log("Permissions granted for camera and microphone");
        stream.getTracks().forEach(track => track.stop()); // Stop the stream immediately
      } catch (err) {
        console.error("Permission denied for camera and microphone", err);
      }
    };

    // Request other permissions (e.g., notifications, location)
    const requestOtherPermissions = () => {
      if ("Notification" in window && Notification.permission !== "granted") {
        Notification.requestPermission()
          .then(permission => {
            if (permission === "granted") {
              console.log("Notification permission granted");
            } else {
              console.error("Notification permission denied");
            }
          });
      }

      // Location permission
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          position => {
            console.log("Location permission granted", position);
          },
          error => {
            console.error("Location permission denied", error);
          }
        );
      }
    };

    // Call permission functions
    requestMediaPermissions();
    requestOtherPermissions();

  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {user && <Route path="/" exact element={<ChatApp />} />}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<Forgot />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/app" element={<ChatApp />} />
        <Route path="/reset" element={<SetPasswordPage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/ai-features" element={<Aifeatures/>} />
        <Route path="/videocall" element={<VideoCallComponent/>} />
        <Route path="/aiplan" element={<Aiplan/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
