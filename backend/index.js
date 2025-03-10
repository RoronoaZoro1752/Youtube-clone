import express from 'express';
import './connection/connection.js';
import AuthRoutes from "./routes/User.js";
import videoRoutes from "./routes/Video.js";
import cookieParser from 'cookie-parser';
import CommentRoutes from './routes/Comment.js';
import cors from 'cors';

const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Enable CORS to allow requests from frontend
app.use(cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true                // Allow credentials (cookies, tokens, etc.)
}));

// Middleware to parse cookies
app.use(cookieParser());

// Routes for user authentication
app.use('/auth', AuthRoutes);

// Routes for video-related operations
app.use('/api', videoRoutes);

// Routes for comment-related operations
app.use('/commentApi', CommentRoutes);

// Proxy route to handle video uploads to Cloudinary
app.post('/proxy/video-upload', async (req, res) => {
    try {
        // Extract form data from request body
        const formData = req.body;

        // Forward the form data to Cloudinary for video upload
        const response = await axios.post(
            'https://api.cloudinary.com/v1_1/dzyst0u7j/video/upload',
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" }
            }
        );

        // Send Cloudinary response back to the client
        res.status(200).json(response.data);
    } catch (error) {
        // Handle any errors during the video upload
        res.status(500).json({ error: "Failed to upload video" });
    }
});

// Start the server on port 4000
app.listen(4000);
