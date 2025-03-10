import express from 'express';
import { uploadVideo, getAllVideo, getVideoById, getAllVideoByUserID } from '../controllers/Video.js';
import {auth} from '../middleware/authentication.js';

const router = express.Router();

// Route to upload a video (protected route)
router.post('/video', auth, uploadVideo);

// Route to get all videos
router.get('/allVideo', getAllVideo);

// Route to get a video by its ID
router.get('/getVideoById/:id', getVideoById);

// Route to get all videos by a specific user ID
router.get('/:userId/channel', getAllVideoByUserID);


export default router;
