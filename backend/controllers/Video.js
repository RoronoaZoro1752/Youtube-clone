import video from "../models/Video.js";  // Importing the Video model

// Upload Video Controller - Handles video upload to the database
export const uploadVideo = async (req, res) => {
  try {
    // Extract video details from the request body
    const { title, description, videoLink, videoType, thumbnail } = req.body;

    // Create a new video instance using the Video model
    const videoUpload = new video({
      user: req.user._id,  // Attach the user ID from the request token
      title,
      description,
      videoLink,
      videoType,
      thumbnail,
    });

    // Save the video to the database
    await videoUpload.save();

    // Return success response with the uploaded video data
    res.status(201).json({ success: "true", videoUpload });
  } catch (err) {
    // Handle any server error
    res.status(500).json({ error: "Server error" });
  }
};

// Get All Videos Controller - Fetches all videos from the database
export const getAllVideo = async (req, res) => {
  try {
    // Fetch all videos and populate user details (excluding password)
    const videos = await video
      .find()
      .populate("user", "channelName profilePic userName createdAt");

    // Return success response with the list of videos
    res.status(200).json({ success: "true", videos: videos });
  } catch (err) {
    // Handle any server error
    res.status(500).json({ error: "Server error" });
  }
};

// Get Video by ID Controller - Fetches a single video by its ID
export const getVideoById = async (req, res) => {
  try {
    // Extract the video ID from URL params
    let { id } = req.params;

    // Find the video by ID and populate user details
    const foundVideo = await video
      .findById(id)
      .populate("user", "channelName profilePic userName createdAt");

    // If no video is found, return a 404 error response
    if (!foundVideo) {
      return res.status(404).json({ error: "Video not found" });
    }

    // Return success response with the found video
    res.status(200).json({ success: "true", video: foundVideo });
  } catch (err) {
    // Handle any server error
    res.status(500).json({ error: "Server error" });
  }
};

// Get All Videos By User ID Controller - Fetches videos uploaded by a particular user
export const getAllVideoByUserID = async (req, res) => {
  try {
    // Extract the user ID from URL params
    let { userId } = req.params;

    // Find videos associated with the provided user ID and populate user details
    const videos = await video
      .find({ user: userId })
      .populate("user", "channelName profilePic userName createdAt about");

    // If no videos are found, return an empty array without error
    if (videos.length === 0) {
      return res.status(200).json({ success: "true", video: [] });
    }

    // Return success response with the videos
    res.status(200).json({ success: "true", video: videos });
  } catch (err) {
    // Handle any server error
    res.status(500).json({ error: "Server error" });
  }
};