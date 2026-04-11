import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
    content:{
        type: String,
        required: [true, 'El contenido es requerido'],
        maxlength: [280, 'El tweet no puede alcanzar los 280 caracteres']
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments:[{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        content:{
            type: String,
            required: [true, 'El contenido es requerido'],
            maxlength: [280, 'El tweet no puede alcanzar los 280 caracteres']
        },
        createdAt:{
            type: Date,
            default: Date.now
        }
    }],
    image:{
        type: String,
        default: ''
    }
},{
    timestamps: true
})

tweetSchema.index({ createdAt: -1 })

const tweet = mongoose.model('tweet', tweetSchema)

export default tweet