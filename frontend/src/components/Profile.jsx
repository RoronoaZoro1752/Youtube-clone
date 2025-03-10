/* eslint-disable react/prop-types */
import SideNavbar from "./SideNavbar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Profile({ sideNavbar }) {
  const [data, setData] = useState([]); // State to store the videos uploaded by the user
  const [user, setUser] = useState(null);  // State to store the user information like profile picture, channel name, etc.
  const { id } = useParams(); // Extracting the user ID from the URL parameter

  // Function to fetch profile data including videos and user info
  const fetchProfileData = async () => {
    await axios
      .get(`http://localhost:4000/api/${id}/channel`)
      .then((res) => {
        setData(res.data.video);
        setUser(res.data.video[0]?.user);
      })
      .catch((err) => console.log(err));
  };

  // Fetching profile data on component mount
  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <div className="flex w-full px-3.5 pt-2.5 box-border bg-black text-white min-h-screen">
      {/* Side Navigation Bar */}
      <SideNavbar sideNavbar={sideNavbar} />

      {/* Main Content */}
      <div
        className={`flex flex-col flex-1 ${
          sideNavbar ? "ml-72" : "ml-48"
        } mt-14 transition-all duration-300 ease-in-out`}
      >
        {/* Profile Section */}
        <div className="w-full flex pb-5">
          {/* Profile Image */}
          <div className="w-24 h-24 flex-shrink-0">
            <img
              src={user?.profilePic}
              alt="UserProfile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          {/* User Details */}
          <div className="flex flex-col gap-2 px-2.5 flex-1">
            <div className="text-3xl font-semibold">{user?.channelName}</div>
            <div className="text-sm text-gray-400">
              {user?.userName} · {data.length} videos
            </div>
            <div className="text-sm text-gray-400">{user?.about}</div>
          </div>
        </div>

        {/* Videos Section */}
        <div className="w-full">
          {/* Section Header */}
          <div className="text-xl pb-2.5 text-gray-300 font-semibold  border-b border-gray-500">
            Videos
          </div>

          {/* Video Grid */}
          <div className="flex flex-wrap gap-5 mt-5">
            {data.map((item, index) => {
              return (
                <Link to={`/watch/${item._id}`} key={index}>
                  <div className="w-52 cursor-pointer">
                    {/* Thumbnail */}
                    <div className="w-full h-36 overflow-hidden rounded-lg">
                      <img
                        src={item?.thumbnail}
                        alt="Video Thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Video Info */}
                    <div className="flex flex-col w-full mt-2">
                      <div className="text-sm font-semibold text-white">
                        {item?.title}
                      </div>
                      <div className="text-gray-400 text-xs">
                        Created at {item?.createdAt.slice(0, 10)}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
