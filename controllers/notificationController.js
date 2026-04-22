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
    try {
        await Notification.updateMany(
            { recipient: req.user._id, read: false },
            { read: true }
        )
        res.json({ message: 'Notificaciones marcadas como leídas' })
    } catch (error) {
        console.error('Error marcando notificaciones:', error)
        res.status(500).json({ message: 'Error en el servidor' })
    }
}
const getUnreadCount = async (req,res)=>{
    try {
        const count = await Notification.countDocuments(
            { recipient: req.user._id, read: false },
            { read: true }
        )

        res.json({count})
    } catch (error) {
        console.error('Error contando notificaciones:', error)
        res.status(500).json({ message: 'Error en el servidor' })
    }
}


export { getNotifications, markAsRead, getUnreadCount, createNotification };