import mongoose from "mongoose";  // Importing mongoose for MongoDB interaction

// Creating a schema for Video
const videoSchema = new mongoose.Schema({
    // Reference to the user who uploaded the video
    user: {
        type: mongoose.Schema.Types.ObjectId,   // Refers to the User model's ID
        ref: 'user',                            // Establishes a relationship with the User model
        required: true                          // User ID is mandatory
    },
    // Title of the video
    title: {
        type: String,                           // Data type is String
        required: true                          // Title is mandatory
    },
    // Description of the video content
    description: {
        type: String                            // Data type is String (optional)
    },
    // Video link (URL) where the video is hosted
    videoLink: {
        type: String,                           // Data type is String
        required: true                          // Video link is mandatory
    },
    // Thumbnail image link for the video
    thumbnail: {
        type: String,                           // Data type is String (URL)
        required: true                          // Thumbnail link is mandatory
    },
    // Category or type of the video (like Music, Podcast, etc.)
    videoType: {
        type: String,                           // Data type is String
        default: "All"                          // Default category is "All"
    },
    // Count of likes the video has received
    like: {
        type: Number,                           // Data type is Number
        default: 0                              // Default like count is 0
    },
    // Count of dislikes the video has received
    dislike: {
        type: Number,                           // Data type is Number
        default: 0                              // Default dislike count is 0
    }
}, {timestamps: true})  // Automatically adds createdAt and updatedAt timestamps

// Creating the Video model using the schema
const video = mongoose.model('video', videoSchema);

// Exporting the Video model for use in other files
export default video;
