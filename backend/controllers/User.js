import user from "../models/User.js";  // Importing the User model
import bcrypt from "bcryptjs";  // Importing bcryptjs for password hashing
import jwt from "jsonwebtoken";  // Importing jsonwebtoken for token generation

// Cookie configuration options
const cookieOptions = {
  httpOnly: true,   // Makes the cookie inaccessible to JavaScript on the client-side
  secure: false,    // Set it to true in production with HTTPS
  sameSite: "Lax",  // Prevents CSRF attacks by restricting cross-site usage
};

// 1. SIGN UP API - Handles user registration
export const signUp = async (req, res) => {
  try {
    // Destructure data from request body
    const { channelName, userName, about, profilePic, password } = req.body;

    // Check if the user already exists in the database based on the username
    const isExist = await user.findOne({ userName });
    if (isExist) {
      // If the username already exists, return a 400 error response
      res.status(400).json({ error: "Username already exists!!" });
    } else {
      // Hash the user's password using bcrypt with a salt round of 10
      let hashedpassword = await bcrypt.hash(password, 10);

      // Create a new user instance with the hashed password and other details
      const User = new user({
        channelName,
        userName,
        about,
        profilePic,
        password: hashedpassword,
      });

      // Save the new user to the database
      await User.save();

      // Send a success response with user data
      res.status(201).json({
        message: "User registered successfully!!",
        success: "yes",
        data: User,
      });
    }
  } catch (error) {
    // Handle any server error
    res.status(500).json({ message: "Server error" });
  }
};

// 2. SIGN IN API - Handles user login
export const signIn = async (req, res) => {
  try {
    // Destructure username and password from request body
    const { userName, password } = req.body;

    // Check if the user exists in the database
    const isExist = await user.findOne({ userName });

    // Compare the provided password with the hashed password in the database
    if (isExist && (await bcrypt.compare(password, isExist.password))) {
      // Generate a JWT token using the user ID as the payload
      const token = jwt.sign({ userId: isExist._id }, "secretKey");

      // Set the token in the HTTP-only cookie
      res.cookie("token", token, cookieOptions);

      // Send a success response with user data and token
      res.json({
        message: "Logged in successfully",
        success: "yes",
        token,
        user: {
          _id: isExist._id,
          userName: isExist.userName,
          profilePic: isExist.profilePic
        }
      });
    } else {
      // If credentials are invalid, return a 400 error response
      res.status(400).json({ error: "Invalid credentials!!" });
    }
  } catch (error) {
    // Handle any server error
    res.status(500).json({ message: "Server error" });
  }
};

// 3. LOGOUT API - Handles user logout
export const logout = async (req, res) => {
  // Clear the token cookie from the browser
  res.clearCookie("token", cookieOptions)
    .json({ message: "Logged out successfully" });
};

// 4. GET USER DETAILS API - Fetch user details using token
export const getuserdetails = async (req, res) => {
  try {
    // Extract the token from the request cookies
    const token = req.cookies.token;

    // If token is not provided, return unauthorized response
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Verify the token using the same secret key used during sign-in
    const verified = jwt.verify(token, "secretKey");

    // Find the user in the database using the token's userId
    const User = await user.findById(verified.userId).select('-password');

    // If user is not found, return a 404 response
    if (!User) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send a success response with user details
    res.status(200).json({ user: User });
  } catch (error) {
    // Handle any server error
    res.status(500).json({ message: 'Server Error' });
  }
};
