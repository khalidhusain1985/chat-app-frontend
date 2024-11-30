import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  Box,
} from "@mui/material";
import axios from "axios";
import logo from "../../assets/logo.png";

const Header = ({
  onToggleSidebar,
  activeSidebar,
  onLogout,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userData, setUserData] = useState({});
  const [avatarPreview, setAvatarPreview] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://api.messageinabotlle.app/api/users/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const userData = response.data;
        setUserData(response.data);
        if (userData.avatar) {
          setAvatarPreview(
            `https://api.messageinabotlle.app/${userData.avatar}`
          );
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditProfile = () => {
    handleClose();
    navigate("/editprofile"); 
  };

  const handleAiFeaturesClick = () => {
    handleClose();
    navigate("/ai-features"); 
  };

  const handleLogout = () => {
    handleClose();
    localStorage.removeItem("token");
    onLogout();
    navigate("/login"); 
  };

  const iconButtonClass =
    "p-2 rounded-full transition-colors bg-white text-gray-600 hover:bg-gray-200";
  const activeIconButtonClass =
    "p-2 rounded-full transition-colors bg-[#E0F2F1] text-gray-800";

  return (
    <header className="bg-[#eaf8f0] shadow-md h-[80px]">
      <div className="container mx-auto px-4  flex items-center justify-between flex-wrap md:flex-nowrap">
      
        <Box className="flex items-center space-x-2 md:space-x-5 mb-2 md:mb-0">
          <img
            src={logo}
            alt="logo"
            style={{ height: "100px", width: "100px", borderRadius: "100%" }}
          />
          
          
        </Box>
        <p className="font-bold cursor-pointer bg-white rounded-full w-24 text-center" onClick={handleAiFeaturesClick}>Enable your <br/>AI Features</p>
         
        {/* Right Section - Notifications and Profile */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <p className="text-black text-sm font-extrabold text-center cursor-default">
            {userData.firstName || "User Name"}
          </p>

          <IconButton onClick={handleProfileClick}>
            <Avatar
              src={
                userData && userData.avatar
                  ? `https://api.messageinabotlle.app/${userData.avatar}`
                  : "/api/placeholder/32/32"
              }
              alt="Profile"
            />
          </IconButton>
        </div>
      </div>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleEditProfile}>Edit Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Log Out</MenuItem>
      </Menu>
    </header>
  );
};

export default Header;
