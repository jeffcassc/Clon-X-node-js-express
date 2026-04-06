import express from 'express'
import { getUserProfile } from '../controllers/userController.js'

const router = express.Router()

router.post('/:username', getUserProfile)



export default router
