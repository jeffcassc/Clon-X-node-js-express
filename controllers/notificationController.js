import Notification from "../models/Notification.js";


const createNotification = async (recipientId, senderId, type, tweetId = null)=>{
    if(recipientId.toString() === senderId.toString()) return
    try {
        await Notification.create({
            recipient: recipientId,
            sender: senderId,
            type,
            tweet: tweetId
        })
    } catch (error) {
        console.error('Error creando notificacion:', error)
    }
}

const getNotifications = async (req,res)=>{
    try {
        const notifications = await Notification.find({ recipient: req.user._id })
            .populate('sender','username displayName avatar')
            .populate('tweet', 'content')
            .sort({ createdAt: -1 })
            .limit(50)

        res.json(notifications)

    } catch (error) {
        console.error('Error obteniedo notificaciones:', error)
        res.status(500).json({ message: 'Error en el servidor' })
    }
}
const markAsRead = async (req,res)=>{
    
}
const getUnreadCount = ()=>{}


export { getNotifications, markAsRead, getUnreadCount, createNotification };