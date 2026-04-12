import express from 'express'
import { protect } from '../middleware/authmiddleware.js'
import { createTweet, getTweets, getTweetById } from '../controllers/tweetController.js'


const router = express.Router()

router.post('/',protect, createTweet)
router.get('/',getTweets)
router.get('/:id',getTweetById)



export default router