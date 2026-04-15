import express from 'express'
import { protect } from '../middleware/authmiddleware.js'
import { createTweet, getTweets, getTweetById, getUserTweets, deleteTweet, toggleLike, addComment,deleteComment, getFeed } from '../controllers/tweetController.js'


const router = express.Router()


router.get('/',getTweets)
router.get('/feed', protect, getFeed)
router.get('/user/:userId', getUserTweets)
router.get('/:id',getTweetById)
router.post('/',protect, createTweet)
router.delete('/:id',protect, deleteTweet)
router.post('/:id/like',protect, toggleLike)
router.post('/:id/comment',protect, addComment)
router.delete('/:id/comment/:commentId',protect, deleteComment)




export default router