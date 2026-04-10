import express from 'express'
import { getUserProfile, updateProfile, followUser, unFollowUser, searchUsers, getSuggestedUsers } from '../controllers/userController.js'
import { protect } from '../middleware/authmiddleware.js'

const router = express.Router()

router.post('/:username', getUserProfile)
router.put('/profile',protect, updateProfile)
router.post('/:id/follow',protect, followUser)
router.delete('/:id/follow',protect, unFollowUser)
//-- /api/users/search?q=query - Buscar usuarios
router.get('/search', searchUsers)
router.get('/suggested', protect, getSuggestedUsers)


export default router
