import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username:{},
    email:{},
    password:{},
    displayName:{},
    bio:{},
    avatar:{},
    coverImage:{},
    following: [{}],
    followers: [{}]

},{
    timestamps: true
})