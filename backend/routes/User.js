import express from 'express';
import { signUp, signIn, logout, getuserdetails } from '../controllers/User.js';

const router = express.Router();

// Route to handle user registration
router.post("/signUp", signUp);

// Route to handle user login
router.post('/login', signIn);

// Route to handle user logout
router.post('/logout', logout);

// Route to get current logged-in user details
router.get('/currentUser', getuserdetails);

export default router;
