/* eslint-disable react/prop-types */
import HomeIcon from '@mui/icons-material/Home';
import VideocamIcon from '@mui/icons-material/Videocam';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HistoryIcon from '@mui/icons-material/History';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

export default function SideNavbar({ sideNavbar }) {
    return (
        <>{/**SideNavbar which appears on the left part of the page */}
            {sideNavbar ? (
                <div className='flex flex-col flex-1/6 box-border h-full overflow-y-auto scrollbar-hide fixed top-12 left-0 w-52 p-3 bg-black text-white transition-all duration-300 ease-in-out'>
                    <div className='flex flex-col pb-2 border-b border-[rgb(85,85,85)]'>
                        <div className='flex gap-4 items-center rounded-xl cursor-pointer hover:bg-[rgb(35,35,35)] p-2'>
                            <HomeIcon style={{ fontSize: '20px' }} />
                            <div className='text-sm'>Home</div>
                        </div>

                        <div className='flex gap-4 items-center rounded-xl cursor-pointer hover:bg-[rgb(35,35,35)] p-2'>
                            <VideocamIcon style={{ fontSize: '20px' }} />
                            <div className='text-sm'>Shorts</div>
                        </div>

                        <div className='flex gap-4 items-center rounded-xl cursor-pointer hover:bg-[rgb(35,35,35)] p-2'>
                            <SubscriptionsIcon style={{ fontSize: '20px' }} />
                            <div className='text-sm'>Subscriptions</div>
                        </div>
                    </div>

                    <div className='flex flex-col pb-2 border-b border-[rgb(85,85,85)]'>
                        <div className='flex gap-4 items-center rounded-xl cursor-pointer hover:bg-[rgb(35,35,35)] p-2'>
                            <div className='text-sm'>You</div>
                            <ChevronRightIcon style={{ fontSize: '20px' }} />
                        </div>
                        <div className='flex gap-4 items-center rounded-xl cursor-pointer hover:bg-[rgb(35,35,35)] p-2'>
                            <HistoryIcon style={{ fontSize: '20px' }} />
                            <div className='text-sm'>History</div>
                        </div>
                        <div className='flex gap-4 items-center rounded-xl cursor-pointer hover:bg-[rgb(35,35,35)] p-2'>
                            <PlaylistPlayIcon style={{ fontSize: '20px' }} />
                            <div className='text-sm'>Playlists</div>
                        </div>
                        <div className='flex gap-4 items-center rounded-xl cursor-pointer hover:bg-[rgb(35,35,35)] p-2'>
                            <SlideshowIcon style={{ fontSize: '20px' }} />
                            <div className='text-sm'>Your videos</div>
                        </div>
                        <div className='flex gap-4 items-center rounded-xl cursor-pointer hover:bg-[rgb(35,35,35)] p-2'>
                            <SchoolOutlinedIcon style={{ fontSize: '20px' }} />
                            <div className='text-sm'>Your courses</div>
                        </div>
                        <div className='flex gap-4 items-center rounded-xl cursor-pointer hover:bg-[rgb(35,35,35)] p-2'>
                            <AccessTimeIcon style={{ fontSize: '20px' }} />
                            <div className='text-sm'>Watch Later</div>
                        </div>
                        <div className='flex gap-4 items-center rounded-xl cursor-pointer hover:bg-[rgb(35,35,35)] p-2'>
                            <ThumbUpOffAltIcon style={{ fontSize: '20px' }} />
                            <div className='text-sm'>Liked videos</div>
                        </div>
                    </div>

                    <div className='flex flex-col pb-2 border-b border-[rgb(85,85,85)]'>
                        <div className='flex gap-4 items-center rounded-xl cursor-pointer hover:bg-[rgb(35,35,35)] p-2'>
                            <div className='text-sm font-semibold'>Subscriptions</div>
                        </div>

                        <div className='flex gap-4 items-center rounded-xl cursor-pointer hover:bg-[rgb(35,35,35)] p-2'>
                            <img src="data:image/png;base64,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" alt="free code camp"
                                className='w-5 h-5 rounded-full object-contain'
                            />
                            <div className='text-sm'>FreeCodeCamp</div>
                        </div>
                        <div className='flex gap-4 items-center rounded-xl cursor-pointer hover:bg-[rgb(35,35,35)] p-2'>
                            <img src="data:image/jpeg;base64,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" alt="Internshala"
                                className='w-5 h-5 rounded-full object-contain'
                            />
                            <div className='text-sm'>Internshala</div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='flex flex-col flex-1/6 box-border h-full overflow-y-auto scrollbar-hide fixed top-12 left-0 w-24 p-3 bg-black text-white transition-all duration-300 ease-in-out'>
                    <div className='flex flex-col'>
                        <div className='flex items-center flex-col rounded-xl cursor-pointer hover:bg-[rgb(35,35,35)] p-2'>
                            <HomeIcon style={{ fontSize: '20px' }} />
                            <div className='text-xs'>Home</div>
                        </div>

                        <div className='flex flex-col items-center rounded-xl cursor-pointer hover:bg-[rgb(35,35,35)] p-2'>
                            <VideocamIcon style={{ fontSize: '20px' }} />
                            <div className='text-xs'>Shorts</div>
                        </div>

                        <div className='flex flex-col items-center rounded-xl cursor-pointer hover:bg-[rgb(35,35,35)] p-2'>
                            <SubscriptionsIcon style={{ fontSize: '20px' }} />
                            <div className='text-xs'>Subscriptions</div>
                        </div>

                        <div className='flex flex-col items-center rounded-xl cursor-pointer hover:bg-[rgb(35,35,35)] p-2'>
                            <AccountCircleOutlinedIcon style={{ fontSize: '20px' }} />
                            <div className='text-xs'>You</div>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    );
}



