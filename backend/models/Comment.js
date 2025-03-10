import mongoose from "mongoose";  // Importing mongoose for MongoDB interaction

// Creating a schema for comments
const commentSchema = new mongoose.Schema({
    // Reference to the user who posted the comment
    user: {
        type: mongoose.Schema.Types.ObjectId,   // Refers to the User model's ID
        ref: 'user',                            // Establishes a relationship with the User model
        required: true,                         // User ID is mandatory
    },
    // Reference to the video on which the comment is posted
    video: {
        type: mongoose.Schema.Types.ObjectId,   // Refers to the Video model's ID
        ref: 'video',                           // Establishes a relationship with the Video model
        required: true                          // Video ID is mandatory
    },
    // The comment text/message
    message: {
        type: String,                           // Defines message type as a string
        required: true                          // Message text is mandatory
    }
}, {timestamps: true})  // Adds createdAt and updatedAt timestamps automatically

// Creating the Comment model using the schema
const comment = mongoose.model('comment', commentSchema);

// Exporting the Comment model for use in other files
export default comment;
