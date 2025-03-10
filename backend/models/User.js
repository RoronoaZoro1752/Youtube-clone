import mongoose from "mongoose";  // Importing mongoose for MongoDB interaction

// Creating a schema for User
const userSchema = new mongoose.Schema({
    // Channel name of the user (can be different from username)
    channelName: {
        type: String,                // Data type is String
        required: true,              // Channel name is mandatory
    },
    // Unique username for the user (used for login)
    userName: {
        type: String,                // Data type is String
        required: true,              // Username is mandatory
        unique: true,                // Ensures username is unique
    },
    // User's hashed password
    password: {
        type: String,                // Data type is String
        required: true               // Password is mandatory
    },
    // Description about the user
    about: {
        type: String,                // Data type is String
        required: true               // About section is mandatory
    },
    // URL of the user's profile picture
    profilePic: {
        type: String,                // Data type is String (URL)
        required: true               // Profile picture is mandatory
    }
}, {timestamps:true})  // Automatically adds createdAt and updatedAt timestamps

// Creating the User model using the schema
const user = mongoose.model('user', userSchema);

// Exporting the User model for use in other files
export default user;
