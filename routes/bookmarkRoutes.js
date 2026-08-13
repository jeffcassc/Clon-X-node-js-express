import { toggleBookmark,getBookmarks, checkBookmark } from "../controllers/bookmarkController.js";
import express from 'express'
import { protect } from "../middleware/authmiddleware.js";

const router = express.Router()

router.get('/', protect, getBookmarks)
router.get('/:tweetId', protect, checkBookmark)  
router.post('/:tweetId',protect, toggleBookmark )



export default router