import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import "react-toastify/ReactToastify.css";

export default function Signup() {
  // State to store input values for signup form
  const [signupInput, setSignupInput] = useState({
    channelName: "",
    userName: "",
    password: "",
    about: "",
    profilePic: "",
  });

  const [loading, setLoading] = useState(false); // State to manage the loading state when uploading an image

  const navigate = useNavigate(); // Hook to navigate to another page after successful signup

  // Function to handle changes in the input fields
  const handleSignup = (event, name) => {
    setSignupInput({
      ...signupInput,
      [name]: event.target.value,
    });
  };

  // Function to upload image to Cloudinary
  const UploadImage = async (e) => {
    const files = e.target.files; // Get the selected file
    const data = new FormData(); // Create form data to send the file
    data.append("file", files[0]); // Append file to form data
    data.append("upload_preset", "yt-clone"); // Cloudinary upload preset

    setLoading(true); // Show Loader

    try {
      // API call to upload image to Cloudinary
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dzyst0u7j/image/upload",
        data
      );
      const imgurl = response.data.url; // Get the uploaded image URL from Cloudinary response

      // Update the profilePic in state with uploaded image URL
      setSignupInput({
        ...signupInput,
        ["profilePic"]: imgurl,
      });
      // Show success toast notification
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.log(error);
      // Show error toast notification if image upload fails
      toast.error("Failed to upload image");
    } finally {
      setLoading(false); // Hide Loader
    }
  };

  // Function to handle final signup API call
  const handleFinalSignup = async () => {
    // API call to signup endpoint
    await axios
      .post("http://localhost:4000/auth/signUp", signupInput)
      .then((res) => {
        toast.success(res.data.message);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response?.data?.message || "Something went wrong");
      });
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md border border-gray-700 rounded-lg p-8 flex flex-col items-center">
        <div className="text-2xl font-bold mb-6">Signup</div>

        <div className="w-full flex flex-col gap-5">
          <input
            type="text"
            placeholder="Channel name"
            value={signupInput.channelName}
            onChange={(e) => handleSignup(e, "channelName")}
            className="w-full h-12 px-4 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="User name"
            value={signupInput.userName}
            onChange={(e) => handleSignup(e, "userName")}
            className="w-full h-12 px-4 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={signupInput.password}
            onChange={(e) => handleSignup(e, "password")}
            className="w-full h-12 px-4 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="About your channel"
            value={signupInput.about}
            onChange={(e) => handleSignup(e, "about")}
            maxLength={100}
            className="w-full h-12 px-4 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex items-center gap-4">
            <input
              type="file"
              onChange={(e) => UploadImage(e)}
              className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 hover:file:cursor-pointer"
              disabled={loading}
            />
            {loading && <CircularProgress size={24} color="inherit" />}
          </div>

          <div className="w-full flex items-center justify-center gap-4 mt-6">
            <button
              className="px-6 py-2 text-sm font-semibold rounded-md border border-white text-white hover:bg-white hover:text-black transition duration-200"
              onClick={handleFinalSignup}
            >
              Signup
            </button>
            <Link
              to="/"
              className="px-6 py-2 text-sm font-semibold rounded-md border border-white text-white hover:bg-white hover:text-black transition duration-200"
            >
              Home
            </Link>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
