import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

export default function Video() {
  // State to store the comment input value
  const [comment, setComment] = useState("");

  // Get the video id from the URL params
  const { id } = useParams();

  // State to store the video data
  const [data, setData] = useState(null);

  // State to store the video URL
  const [videoUrl, setVideoUrl] = useState("");

  // State to store the comments of the video
  const [comments, setComments] = useState([]);

  // State to store the current logged-in user
  const [currentUser, setCurrentUser] = useState(null);

  // Function to fetch the video data based on ID
  const fetchVideoById = async () => {
    await axios
      .get(`http://localhost:4000/api/getVideoById/${id}`)
      .then((res) => {
        setData(res.data.video);
        setVideoUrl(res.data.video?.videoLink);
      })
      .catch(() => {
        toast.error("Failed to load video! Try again later.");
      });
  };

  // Function to clear the comment input field
  const handleClearInput = async () => {
    setComment("");
  };

  // Function to get the current logged-in user details
  const getCurrentUser = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/auth/currentUser`, {
        withCredentials: true,
      });

      if (res.data.user) {
        setCurrentUser(res.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("User not logged in or token expired.");
      }
    }
  };

  // Function to fetch comments based on video ID
  const getCommentByVideoId = async () => {
    await axios
      .get(`http://localhost:4000/commentApi/comment/${id}`)
      .then((res) => {
        setComments(res.data.comments);
      })
      .catch(() => {
        toast.error("Failed to load comments. Please try again.");
      });
  };

  // useEffect to fetch video and comments when component mounts
  useEffect(() => {
    fetchVideoById();
    getCommentByVideoId();
    if (!currentUser) {
      getCurrentUser();
    }
  }, []);

  // Function to handle adding a new comment
  const handleComment = async () => {
    const body = {
      message: comment,
      video: id,
    };
    await axios
      .post(`http://localhost:4000/commentApi/comment`, body, {
        withCredentials: true,
      })
      .then((res) => {
        const newcomment = res.data.comment;
        setComments([newcomment, ...comments]);
        setComment("");
      })
      .catch(() => {
        toast.error("Login first");
      });
  };

  return (
    <div className="mt-14 flex py-8 justify-center bg-black text-white flex-col lg:flex-row px-4 sm:px-8">
      {/* Left Section - Video and Comments */}
      <div className="w-full max-w-[875px] flex flex-col">
        {/* Video Section */}
        <div className="w-full">
          {data && (
            <div className="relative pt-[56.25%]">
              <video
                autoPlay
                controls
                className="absolute top-0 left-0 w-full h-full rounded-xl"
              >
                <source src={videoUrl} type="video/mp4" />
                <source src={videoUrl} type="video/webm" />
              </video>
            </div>
          )}
        </div>

        {/* Video Details Section */}
        <div className="flex flex-col">
          <div className="text-xl font-bold mt-4">{data?.title}</div>

          {/* Video Owner Details and Like/Dislike */}
          <div className="flex items-center mt-2.5 gap-4 justify-between flex-wrap">
            {/* User Info Section */}
            <Link to={`/user/${data?.user?._id}`}>
              <div className="flex gap-4 cursor-pointer">
                <div className="w-9 h-9 cursor-pointer">
                  <img
                    src={data?.user?.profilePic}
                    alt="UserProfile"
                    className="w-full rounded-full h-full"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="font-semibold text-[16px]">
                    {data?.user?.channelName}
                  </div>
                  <div className="text-xs text-gray-400">
                    {data?.user?.createdAt.slice(0, 10)}
                  </div>
                </div>
              </div>
            </Link>

            {/* Like, Dislike and Subscribe Button */}
            <div className="flex items-center gap-4">
              {/* Subscribe Button */}
              <div className="bg-white text-black px-4 rounded-2xl flex justify-center items-center h-9 font-semibold cursor-pointer text-sm">
                Subscribe
              </div>

              {/* Like and Dislike Buttons */}
              <div className="flex gap-2.5 bg-gray-600 justify-center items-center p-2 rounded-2xl cursor-pointer text-sm h-9">
                <div className="flex gap-2.5 items-center">
                  <ThumbUpAltOutlinedIcon className="w-4 h-4" />
                  <div className="font-semibold">{data?.like}</div>
                </div>
                <div className="h-5 w-0 border"></div>
                <div className="flex gap-2.5 items-center">
                  <ThumbDownAltOutlinedIcon className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Video Description */}
          <div className="flex flex-col p-2 bg-gray-600 w-full rounded-xl font-semibold text-sm gap-1.5 mt-2.5 box-border">
            <div>{data?.createdAt.slice(0, 10)}</div>
            <div>{data?.description}</div>
          </div>

          {/* Comment Section */}
          <div className="flex flex-col mt-5">
            <div className="text-xl font-semibold">
              {comments.length} comments
            </div>
          </div>

          {/* Add Comment Section */}
          <div className="flex mt-2.5 gap-2.5">
            <img
              src={
                currentUser?.profilePic ||
                "https://cdn-icons-png.flaticon.com/512/147/147144.png"
              }
              alt="User profile"
              className="w-9 h-9 rounded-full"
            />

            {/* Comment Input */}
            <div className="flex flex-col w-full">
              <input
                type="text"
                placeholder="Add a comment"
                className="w-full bg-black text-white h-9 text-sm border-b border-gray-300 focus:outline-0 placeholder:text-sm"
                value={comment}
                maxLength={250}
                onChange={(e) => setComment(e.target.value)}
              />
              <div className="flex justify-end gap-4 mt-2.5">
                <div
                  className="py-2 px-4 rounded-3xl border cursor-pointer hover:bg-white hover:text-black"
                  onClick={handleClearInput}
                >
                  Cancel
                </div>
                <div
                  className="py-2 px-4 rounded-3xl border cursor-pointer hover:bg-white hover:text-black"
                  onClick={handleComment}
                >
                  Comment
                </div>
              </div>
            </div>
          </div>

          {/* Render Comments */}
          <div className="flex gap-4 flex-col mt-4">
            {comments.map((item, index) => (
              <div key={index} className="flex gap-3 items-start">
                <img
                  src={item?.user?.profilePic}
                  alt="UserProfile"
                  className="w-9 h-9 rounded-full"
                />
                <div>
                  <div>{item?.user?.channelName}</div>
                  <div>{item?.message}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Suggested Videos Section */}

      <div className="w-full max-w-[406px] py-2.5 px-4 flex flex-col gap-4 mt-8 lg:mt-0">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex gap-4 cursor-pointer">
            <div className="w-32 sm:w-52 h-20 sm:h-32">
              <img
                src="https://media.licdn.com/dms/image/v2/D5612AQEC2GNEaVOqHQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1709846879463?e=2147483647&v=beta&t=3oEOdpoAqT2j-2fuf4KzvbuNtxTkQVdaoy3wwqnMdrM"
                alt="Suggestion Thumbnail"
                className="w-full h-full rounded-sm"
              />
            </div>

            <div className="flex flex-col gap-0.5">
              <div className="font-semibold text-sm mb-1.5">
                Learn MERN stack in 10 hours | Full video
              </div>
              <div className="text-xs text-gray-400">Hello World</div>
              <div className="text-xs text-gray-400">100M views . 1 day ago</div>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
}
