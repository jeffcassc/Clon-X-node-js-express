import express from 'express'
import { getUserProfile, updateProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authmiddleware.js'

const router = express.Router()

router.post('/:username', getUserProfile)
router.put('/profile',protect, updateProfile)



export default router
