// import React from "react";
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
  // const clientId =
  //   "162265749756-6rogh84nkiukqh6ntlvhunm0oaqb3k6r.apps.googleusercontent.com";

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
