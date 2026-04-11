import express from 'express'
import { protect } from '../middleware/authmiddleware.js'
import { createTweet } from '../controllers/tweetController.js'


const router = express.Router()

router.post('/',protect, createTweet)


export default router