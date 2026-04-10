import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
    content:{},
    author:{},
    likes:{},
    comments:{},
    image:{}
},{
    timestamps: true
})