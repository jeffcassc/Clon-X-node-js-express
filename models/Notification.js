import mongoose from "mongoose";


const notificationSchema = new mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['like', 'comment', 'follow', 'retweet'],
        required: true
    },
    tweet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet',},
    read: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})
notificationSchema.index({ recipient: 1,createdAt: -1 })

const Notification = mongoose.model('Notification', notificationSchema)

export default Notification