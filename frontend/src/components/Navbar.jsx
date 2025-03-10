/* eslint-disable react/prop-types */
import MenuIcon from "@mui/icons-material/Menu";
import YouTubeLogo from "./YouTubeLogo";
import SearchIcon from "@mui/icons-material/Search";
import MicIcon from "@mui/icons-material/Mic";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import axios from "axios";

export default function Navbar({ handleSideNavbar, sideNavbar }) {
  // State to store user profile image URL
  const [user, setUser] = useState(
    "https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
  );
  const [modal, setModal] = useState(false); // State to manage the modal visibility
  const [login, setLogin] = useState(false); // State to manage login modal visibility
  const [isloggedin, setIsloggedin] = useState(false); // State to check if the user is logged in
  const modalRef = useRef(null); // Ref to detect outside click for closing modal
  const navigate = useNavigate(); // Hook to navigate between routes

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modal]);

  // Function to close login modal
  const setLoginModal = () => {
    setLogin(false);
  };

  // Function to make API call for logging out the user
  const getLogoutFunction = async () => {
    await axios
      .post(`http://localhost:4000/auth/logout`, {}, { withCredentials: true })
      .then(() => {
        console.log("Logged out");
      })
      .catch((err) => console.log(err));
  };

  // Function to handle login and logout actions
  const handleLogin = (button) => {
    setModal(false);
    if (button === "login") {
      setLogin(true);
    } else {
      localStorage.clear();
      getLogoutFunction();
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 2000);
    }
  };

   // Check if user is already logged in or not and set the user profile pic
  useEffect(() => {
    let userProfilePic = localStorage.getItem("userProfilePic");
    setIsloggedin(localStorage.getItem("userId") !== null ? true : false);
    if (userProfilePic !== null) {
      setUser(userProfilePic);
    }
  }, []);

  return (
    <div className="h-14 px-2 sm:px-4 py-2.5 flex items-center w-full justify-between top-0 fixed bg-black z-50">
      {/** Left part of the navbar */}
      <div className="flex gap-2.5 justify-center items-center w-fit">
        <div
          className="w-10 h-10 flex justify-center items-center cursor-pointer"
          onClick={() => handleSideNavbar(!sideNavbar)}
        >
          <MenuIcon sx={{ color: "white" }} />
        </div>
        <Link to={"/"}>
          <div className="flex justify-center items-center cursor-pointer text-white no-underline text-[20px]">
            <YouTubeLogo />
          </div>
        </Link>
      </div>

      {/** Middle part of the navbar */}
      <div className="flex gap-2.5 flex-grow max-w-[600px] mx-2 sm:mx-4">
        <div className="w-full flex">
          <input
            type="text"
            placeholder="Search"
            className="rounded-tl-[20px] rounded-bl-[20px] border border-gray-700 bg-[#121212] text-white text-[16px] pl-[30px] pr-4 outline-none placeholder:text-[16px] w-full"
          />
          <div className="w-[70px] border border-gray-600 bg-gray-700 flex justify-center items-center rounded-tr-[20px] rounded-br-[20px] cursor-pointer hover:bg-gray-600 transition">
            <SearchIcon sx={{ fontSize: "28px", color: "white" }} />
          </div>
        </div>
        <div className="flex justify-center items-center bg-gray-700 rounded-full w-10 h-10 cursor-pointer hover:bg-gray-600 transition">
          <MicIcon sx={{ color: "white" }} />
        </div>
      </div>

      {/** Right part of the navbar */}
      <div className="flex relative gap-2 sm:gap-5 justify-center items-center">
        <Link to={"/1/upload"}>
          <VideoCallIcon
            sx={{ color: "white", cursor: "pointer" }}
            className="hidden sm:block" // Hide on small screens
          />
        </Link>
        <NotificationsIcon
          sx={{ color: "white", cursor: "pointer" }}
          className="hidden sm:block" // Hide on small screens
        />
        <img
          src={user}
          alt="avatar"
          className="w-7 h-7 rounded-full cursor-pointer"
          onClick={() => setModal(!modal)}
        />

        {modal && (
          <div
            ref={modalRef}
            className="absolute top-12 right-0 w-32 bg-gray-700 text-white rounded-lg shadow-lg z-[1000]"
          >
            {isloggedin && (
              <Link to={`/user/${localStorage.getItem("userId")}`}>
                <div
                  className="p-2.5 cursor-pointer hover:bg-gray-600 rounded-t-lg"
                  onClick={() => setModal(false)}
                >
                  Profile
                </div>
              </Link>
            )}
            {isloggedin && (
              <div
                className="p-2.5 cursor-pointer hover:bg-gray-600"
                onClick={() => handleLogin("logout")}
              >
                Logout
              </div>
            )}
            {!isloggedin && (
              <div
                className="p-2.5 cursor-pointer hover:bg-gray-600 rounded-b-lg"
                onClick={() => handleLogin("login")}
              >
                Login
              </div>
            )}
          </div>
        )}
      </div>

      {login && <Login setLoginModal={setLoginModal} />}
    </div>
  );
}