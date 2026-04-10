import express from 'express'
import { getUserProfile, updateProfile, followUser, unFollowUser, searchUsers } from '../controllers/userController.js'
import { protect } from '../middleware/authmiddleware.js'

const router = express.Router()

router.post('/:username', getUserProfile)
router.put('/profile',protect, updateProfile)
router.post('/:id/follow',protect, followUser)
router.delete('/:id/follow',protect, unFollowUser)
router.get('/search', searchUsers)



export default router
