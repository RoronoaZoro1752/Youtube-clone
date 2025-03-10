/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Main({ sideNavbar }) {
    // Array of categories or video types
    const options = [
        'All', 'Sci-fi', 'Fiction', 'Science', 'Technology', 'Podcasts', 'Data Structures',
        'Intelligence', 'Music', 'Gaming', 'Live', 'Calculus', 'MERN', 'Database'
    ];

    // State to store all videos fetched from API
    const [data, setData] = useState([]);

    // Fetch all videos from backend API when the component mounts
    useEffect(() => {
        axios.get('http://localhost:4000/api/allVideo')
            .then(res => {
                setData(res.data.videos);
            })
            .catch(err => console.log(err));
    }, []);

    

    return (
        <div className={`flex flex-col min-h-full flex-1 ${sideNavbar ? 'ml-[195px]' : 'ml-[80px]'} transition-all duration-300 ease-in-out mt-[56px] bg-black h-screen pr-6`}>
            {/* Options Bar */}
            <div className="flex fixed top-14 z-10 w-full box-border gap-2.5 shrink-0 h-auto overflow-x-scroll bg-black px-2 py-1.5 scrollbar-hide">
                {options.map((item, index) => (
                    <div key={index} className="flex justify-center flex-none h-7 px-4 py-0.5 text-white bg-gray-800 font-semibold text-sm items-center cursor-pointer rounded-sm mb-1">
                        {item}
                    </div>
                ))}
            </div>

            {/* Video Grid or No Videos Message */}
            {data.length > 0 ? (
                <div
                className={`grid box-border gap-x-5 gap-y-8 ${sideNavbar ? 'grid-cols-3' : 'grid-cols-4'} pt-16 w-full transition-all duration-300 ease-in-out`}
                style={{ paddingLeft: sideNavbar ? '90px' : '80px' }}
            >
                {data.map((item, index) => (
                    <Link
                        to={`/watch/${item._id}`}
                        key={index}
                        className="text-white flex flex-col cursor-pointer h-[316px] no-underline"
                    >
                        {/* Thumbnail Section */}
                        <div className="w-full h-[216px] relative">
                            <img
                                src={item.thumbnail}
                                alt="Video Thumbnail"
                                className="w-full h-full rounded-sm object-cover" // Ensure the thumbnail covers the container
                            />
                            <div className="absolute bottom-1 right-1 bg-gray-800 text-white px-1 py-0.5 rounded-sm text-xs">
                                28:05
                            </div>
                        </div>
            
                        {/* User Info Section */}
                        <div className="flex pt-2.5">
                            <div className="flex items-center justify-center w-12 h-12">
                                <img
                                    src={item?.user?.profilePic}
                                    alt="User Profile"
                                    className="w-10 h-10 rounded-full object-cover" // Ensure the profile picture is consistent
                                />
                            </div>
            
                            <div className="w-full p-1 flex flex-col">
                                <div className="font-semibold text-sm line-clamp-2">{item?.title}</div> {/* Limit title to 2 lines */}
                                <div className="mt-1 text-sm text-gray-400">{item?.user?.channelName}</div>
                                <div className="text-xs text-gray-400">{item?.like} likes</div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            ) : (
                // Show this message when there are no videos
                <div className="text-white text-center mt-16 h-screen">
                    No videos available.
                </div>
            )}
        </div>
    );
}