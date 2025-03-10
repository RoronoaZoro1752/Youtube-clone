import Navbar from "./components/Navbar";
import { useState, lazy, Suspense } from "react";
import { Route, Routes } from 'react-router-dom';
import Loading from "./components/Loading";

// Lazy loading components for better performance
const Home = lazy(() => import('./components/Home'));
const Video = lazy(() => import('./components/Video'));
const Profile = lazy(() => import('./components/Profile'));
const VideoUpload = lazy(() => import('./components/VideoUpload'));
const Signup = lazy(() => import('./components/Signup'));
const ErrorPage = lazy(() => import('./components/ErrorPage'));


function App() {
  const [sideNavbar, setSideNavbar] = useState(true); //State to control the visibility of the sidebar

  // Function to handle the sidebar toggle
  const handleSideNavbar = (value) =>{
    setSideNavbar(value);
  }

  
  return (
    <>
    {/*  Navbar Component */}
    <Navbar handleSideNavbar={handleSideNavbar} sideNavbar={sideNavbar} />
    {/* Suspense added to show a loader until components load */}
    <Suspense fallback = {<Loading />}>
    <Routes>
      <Route path="/" element={<Home sideNavbar={sideNavbar} />}/>
      <Route path="/watch/:id" element={<Video />}/>
      <Route path="/user/:id" element={<Profile sideNavbar={sideNavbar}/>}/>
      <Route path="/:id/upload" element={<VideoUpload />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="*" element={<ErrorPage />} />

    </Routes>
    </Suspense>
    </>
  )
}

export default App
