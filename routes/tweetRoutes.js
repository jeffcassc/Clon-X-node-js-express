import express from 'express'
import { protect } from '../middleware/authmiddleware.js'
import { createTweet, getTweets, getTweetById, getUserTweets, deleteTweet, toggleLike } from '../controllers/tweetController.js'


const router = express.Router()

router.post('/',protect, createTweet)
router.get('/',getTweets)
router.get('/:id',getTweetById)
router.get('/user/:userId', getUserTweets)
router.delete('/:id',protect, deleteTweet)
router.post('/:id/like',protect, toggleLike)



export default router