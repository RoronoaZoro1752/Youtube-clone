import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress"; // Importing Circular Progress loader from MUI

export default function VideoUpload() {
  // State to manage form input data
  const [inputData, setInputData] = useState({
    title: "",
    description: "",
    videoLink: "",
    thumbnail: "",
    videoType: "",
  });

  // State to show loader when thumbnail is being uploaded
  const [thumbnailLoading, setThumbnailLoading] = useState(false);

  // State to show loader when video is being uploaded
  const [videoLoading, setVideoLoading] = useState(false);

  const navigate = useNavigate();

  // Handle input changes in text fields
  const handleUpload = (event, name) => {
    setInputData({
      ...inputData,
      [name]: event.target.value,
    });
  };

  // Function to upload image or video to Cloudinary
  const UploadImage = async (e, type) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "yt-clone");

    try {
      // Check if the file is a thumbnail or a video
      if (type === "image") {
        setThumbnailLoading(true); // Set loader for thumbnail
      } else {
        setVideoLoading(true); // Set loader for video
      }

      // Dynamically set Cloudinary URL based on file type
      const cloudinaryUrl =
        type === "image"
          ? `https://api.cloudinary.com/v1_1/dzyst0u7j/image/upload`
          : `https://api.cloudinary.com/v1_1/dzyst0u7j/video/upload`;

      // Upload file to Cloudinary
      const response = await axios.post(cloudinaryUrl, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Extract URL from Cloudinary response
      const url = response.data.secure_url;

      // Update the state based on file type
      if (type === "image") {
        setInputData({
          ...inputData,
          thumbnail: url,
        });
        setThumbnailLoading(false); // Turn off thumbnail loader
        toast.success("Thumbnail uploaded successfully!");
      } else {
        setInputData({
          ...inputData,
          videoLink: url,
        });
        setVideoLoading(false); // Turn off video loader
        toast.success("Video uploaded successfully!");
      }
    } catch (error) {
      // Handle error if upload fails
      console.error("Upload failed:", error);
      setThumbnailLoading(false);
      setVideoLoading(false);
      toast.error("Upload failed! Try again.");
    }
  };

  // Check if the user is logged in, if not redirect to home page
  useEffect(() => {
    let islogin = localStorage.getItem("userId");
    if (islogin === null) {
      toast.done("Login first");
      navigate("/");
    }
  }, []);

  // Handle form submission to upload video data to the database
  const handleSubmit = async () => {
    await axios
      .post(`http://localhost:4000/api/video`, inputData, {
        withCredentials: true,
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="pt-14 w-full flex flex-col items-center min-h-screen font-semibold bg-black text-white">
      {/* Container Section */}
      <div className="w-full max-w-2xl mt-5 p-6">
        {/* Page Title */}
        <div className="flex w-full justify-center items-center text-3xl mb-8">
          Upload Video
        </div>

        {/* Form Inputs */}
        <div className="flex flex-col gap-6 w-full">
          {/* Input field for video title */}
          <input
            type="text"
            placeholder="Title of the video"
            value={inputData.title}
            onChange={(e) => handleUpload(e, "title")}
            className="w-full h-12 px-4 text-sm text-white bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Input field for video description */}
          <input
            type="text"
            placeholder="Description"
            value={inputData.description}
            onChange={(e) => handleUpload(e, "description")}
            className="w-full h-12 px-4 text-sm text-white bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Input field for video category */}
          <input
            type="text"
            placeholder="Category"
            value={inputData.videoType}
            onChange={(e) => handleUpload(e, "videoType")}
            className="w-full h-12 px-4 text-sm text-white bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Upload Thumbnail Section */}
          <div className="flex flex-col gap-2">
            <label className="text-lg">Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => UploadImage(e, "image")}
              className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
            />
            {/* Loader will appear when thumbnail is uploading */}
            {thumbnailLoading && (
              <div className="flex justify-center items-center mt-2">
                <CircularProgress size={25} color="primary" />
                <span className="ml-2 text-sm">Uploading Thumbnail...</span>
              </div>
            )}
          </div>

          {/* Upload Video Section */}
          <div className="flex flex-col gap-2">
            <label className="text-lg">Video</label>
            <input
              type="file"
              accept="video/mp4, video/webm, video/*"
              onChange={(e) => UploadImage(e, "video")}
              className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
            />
            {/* Loader will appear when video is uploading */}
            {videoLoading && (
              <div className="flex justify-center items-center mt-2">
                <CircularProgress size={25} color="secondary" />
                <span className="ml-2 text-sm">Uploading Video...</span>
              </div>
            )}
          </div>
        </div>

        {/* Submit and Home Button */}
        <div className="flex gap-6 justify-center mt-10">
          <button
            className="py-2.5 px-6 bg-blue-500 text-white font-semibold text-lg rounded-lg hover:bg-blue-600 transition-all duration-300 cursor-pointer"
            onClick={handleSubmit}
          >
            Upload
          </button>
          <Link to="/">
            <button className="py-2.5 px-6 bg-gray-700 text-white font-semibold text-lg rounded-lg hover:bg-gray-800 transition-all duration-300 cursor-pointer">
              Home
            </button>
          </Link>
        </div>
      </div>

      {/* Toast Notification */}
      <ToastContainer />
    </div>
  );
}
