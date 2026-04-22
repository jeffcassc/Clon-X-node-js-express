import express from 'express'
import { getNotifications, markAsRead, getUnreadCount } from '../controllers/notificationController.js'
import { protect } from '../middleware/authmiddleware.js'


const router = express.Router()

router.get('/', protect, getNotifications)
router.put/('/read', protect, markAsRead)
router.get('/unread-count', protect, getUnreadCount)

export default router