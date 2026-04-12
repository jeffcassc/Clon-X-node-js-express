import express from 'express'
import { protect } from '../middleware/authmiddleware.js'
import { createTweet, getTweets } from '../controllers/tweetController.js'


const router = express.Router()

router.post('/',protect, createTweet)
router.get('/',getTweets)



export default router