import mongoose from "mongoose";  // Importing mongoose library for MongoDB connection
import dotenv from 'dotenv';

dotenv.config();

// Connecting to the MongoDB database using the provided connection string
mongoose.connect(process.env.MONGODB)

// If the connection is successful, log a success message
.then(() => console.log("DB connected successfully"))

// If there is any error during connection, catch it and log the error
.catch((err) => console.log(err));
