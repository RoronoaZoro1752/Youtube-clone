import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

// eslint-disable-next-line react/prop-types
export default function Login({ setLoginModal }) {
  const navigate = useNavigate();
  const [loginInput, setLoginInput] = useState({ username: "", password: "" });

  const handleSignup = () => {
    setLoginModal(false);
    navigate("/signup");
  };

  const handleChangeInput = (event, name) => {
    setLoginInput({
      ...loginInput,
      [name]: event.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
    "http://localhost:4000/auth/login", 
    {
      userName: loginInput.username,  
      password: loginInput.password
    },
    {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
        }
    }
  );
  
      // Store the token and user data in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user._id);
      localStorage.setItem("userProfilePic", response.data.user.profilePic);
  
      // Reload the page or navigate to a different route
      navigate('/')
      window.location.reload();
    } catch (err) {
      console.log(err);
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="w-full h-full bg-[rgba(0,0,0,0.7)] fixed top-0 left-0 flex justify-center items-center text-white font-semibold">
      <div className="w-[400px] bg-black rounded-lg shadow-lg p-8 flex flex-col items-center">
        <div className="text-2xl font-bold mb-6">Login</div>

        <div className="w-full flex flex-col gap-6">
          <div className="w-full">
            <input
              type="text"
              placeholder="Enter Username"
              value={loginInput.username}
              onChange={(e) => handleChangeInput(e, "username")}
              className="w-full h-12 px-4 rounded-md bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="w-full">
            <input
              type="password"
              value={loginInput.password}
              onChange={(e) => handleChangeInput(e, "password")}
              placeholder="Enter Password"
              className="w-full h-12 px-4 rounded-md bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="w-full flex justify-between mt-8">
          <button
            className="w-[30%] h-10 border text-white rounded-md hover:bg-white hover:text-black transition duration-200 hover:cursor-pointer"
            onClick={handleLogin}
          >
            Login
          </button>

          <button
            className="w-[30%] h-10 border text-white rounded-md hover:bg-white hover:text-black transition duration-200 hover:cursor-pointer"
            onClick={handleSignup}
          >
            Signup
          </button>

          <button
            className="w-[30%] h-10 border text-white rounded-md hover:bg-white hover:text-black transition duration-200 hover:cursor-pointer"
            onClick={setLoginModal}
          >
            Cancel
          </button>
        </div>
      </div>
      {/* ToastContainer to display toast messages */}
      <ToastContainer />
    </div>
  );
}