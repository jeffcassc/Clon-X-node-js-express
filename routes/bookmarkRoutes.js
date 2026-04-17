import { toggleBookmark } from "../controllers/bookmarkController.js";
import express from 'express'
import { protect } from "../middleware/authmiddleware.js";

const router = express.Router()

router.post('/:tweetId',protect, toggleBookmark )


export default router