import express from 'express';
import { addComment, getCommentByVideoId } from '../controllers/Comment.js';
import {auth} from '../middleware/authentication.js';

const router = express.Router();

// Route to add a comment (protected route)
router.post('/comment', auth, addComment);

// Route to get all comments by video ID
router.get('/comment/:videoId', getCommentByVideoId);

export default router;

