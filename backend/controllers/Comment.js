import Comment from '../models/Comment.js';

// 1. ADD COMMENT API
export const addComment = async(req, res) => {
    try {
        // Extract video ID and message from the request body
        let {video, message} = req.body;

        // Prevent empty comments from being added
        if(!message.trim()){
            return res.status(400).json({ error: "Write your comment" });
        }

        // Create a new comment instance using the Comment model
        const comment = new Comment({
            user: req.user._id,   // Set the user ID from the request token
            video,                // Set the video ID from the request body
            message               // Set the comment message from the request body
        });

        // Save the new comment to the database
        await comment.save();

        // Fetch the newly created comment along with the user's details
        const newComment = await Comment.findById(comment._id)
            .populate('user', 'channelName profilePic userName createdAt');

        // Send a success response along with the newly created comment
        res.status(201).json({ message: "success", comment: newComment });

    } catch (err) {
        // Handle any server-side errors
        res.status(500).json({ error: "Server error" })
    }
}

// 2. GET ALL COMMENTS BY VIDEO ID API
export const getCommentByVideoId = async(req, res) => {
    try {
        // Extract videoId from the URL parameters
        let {videoId} = req.params;

        // Find all comments associated with the videoId and populate the user details
        const comments = await Comment.find({ video: videoId })
            .populate('user', 'channelName profilePic userName createdAt');

        // Send a success response along with all the comments
        res.status(201).json({ message: "success", comments });

    } catch (err) {
        // Handle any server-side errors
        res.status(500).json({ error: "Server error" })
    }
}
