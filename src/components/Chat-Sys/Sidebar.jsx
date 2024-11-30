import { useState, useEffect, useRef } from "react";
import {
  Search as SearchIcon,
  Add as AddIcon,
  FilterList as FilterListIcon,
  ArrowBack,
} from "@mui/icons-material";
import { Menu, MenuItem, Button } from "@mui/material";

function Sidebar({ onSelectUser, activeUserId, users, currentUserId }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [archivedUsers, setArchivedUsers] = useState([]);
  const [alwaysVisibleUsers, setAlwaysVisibleUsers] = useState(() => {
    // Load always visible users from local storage
    const savedUsers = localStorage.getItem("alwaysVisibleUsers");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });
  const [showArchived, setShowArchived] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [blankError, setBlankError] = useState("");
  const sidebarRef = useRef(null);

  useEffect(() => {
    const visibleUsers = alwaysVisibleUsers.map(userId =>
      users.find(user => user._id === userId)
    ).filter(user => user !== undefined); // Remove undefined users in case of stale IDs
    setFilteredUsers(visibleUsers);

    const handleClickOutside = (event) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen, users, alwaysVisibleUsers]);

  useEffect(() => {
    // Save alwaysVisibleUsers to local storage on change
    localStorage.setItem("alwaysVisibleUsers", JSON.stringify(alwaysVisibleUsers));
  }, [alwaysVisibleUsers]);

  const handleFilterClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleUserClick = (userId) => {
    onSelectUser(userId);
    setAlwaysVisibleUsers((prev) => [...new Set([...prev, userId])]); // Ensure no duplicates
    setIsSidebarOpen(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const searchParts = searchTerm.trim().split(" ");
      const filtered = users
        .filter((user) => user._id !== currentUserId)
        .filter((user) => {
          const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
          const isNameMatch =
            searchParts.length === 2 &&
            fullName.includes(searchParts[0].toLowerCase()) &&
            fullName.includes(searchParts[1].toLowerCase());
          const isMobileMatch =
            searchTerm.trim() === user.mobile; // Check for exact mobile match
          return isNameMatch || isMobileMatch;
        });

      if (filtered.length > 0) {
        setFilteredUsers(filtered);
        setSearchError("");
        setBlankError("");
      } else {
        setFilteredUsers([]);
        setSearchError("No matching user found.");
        setBlankError("");
      }
    } else if (searchTerm.trim() === "") {
      setBlankError("Enter valid search criteria.");
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      {!isSidebarOpen && (
        <button
          className="lg:hidden fixed top-[87px] z-20 p-5 rounded-full"
          onClick={toggleSidebar}
        >
          <ArrowBack />
        </button>
      )}

      <div
        ref={sidebarRef}
        className={`fixed lg:static top-0 left-0 w-80 bg-white border-r overflow-y-auto h-screen z-10 transition-transform transform lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 sticky top-0 bg-white z-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Chats</h2>
            <div className="flex space-x-2">
              <button
                className="text-gray-500 hover:bg-blue-50 rounded-full p-1"
              >
                <AddIcon fontSize="small" />
              </button>
              <button
                className="text-gray-500 hover:bg-gray-100 rounded-full p-1"
                onClick={handleFilterClick}
              >
                <FilterListIcon fontSize="small" />
              </button>
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search users (name or mobile number)"
              className="w-full p-2 pl-8 bg-gray-100 rounded-full text-sm"
              value={searchTerm}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
            <SearchIcon
              className="absolute left-2 top-2.5 text-gray-400"
              fontSize="small"
            />
          </div>

          {searchError && (
            <p className="text-red-500 text-sm mt-2">{searchError}</p>
          )}
          {blankError && (
            <p className="text-red-500 text-sm mt-2">{blankError}</p>
          )}
        </div>

        <ul>
          {filteredUsers.map((user) => (
            <li
              key={user._id}
              className={`px-4 py-3 hover:bg-gray-100 cursor-pointer ${
                activeUserId === user._id ? "bg-gray-100" : ""
              }`}
              onClick={() => handleUserClick(user._id)}
            >
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full mr-3 bg-gray-300 flex items-center justify-center">
                  {user.avatar ? (
                    <img
                      src={`https://api.messageinabotlle.app/${user.avatar}`}
                      alt={user.firstName}
                      className="rounded-full"
                    />
                  ) : (
                    <span className="text-xl text-gray-600">
                      {user.firstName[0]}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-sm text-gray-600 truncate">
                    {user.mobile}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
