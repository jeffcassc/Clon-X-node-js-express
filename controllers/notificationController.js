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

const getNotifications = ()=>{}
const markAsRead = ()=>{}
const getUnreadCount = ()=>{}


export { getNotifications, markAsRead, getUnreadCount, createNotification };