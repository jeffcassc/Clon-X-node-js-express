import express from 'express'
import { protect } from '../middleware/authmiddleware.js'
import { createTweet, getTweets, getTweetById, getUserTweets } from '../controllers/tweetController.js'


const router = express.Router()

router.post('/',protect, createTweet)
router.get('/',getTweets)
router.get('/:id',getTweetById)
router.get('/user/:userId', getUserTweets)



export default router