import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const generateToken = (id)=>{
    return jwt.sign(
        {id},
        process.env.JWT_SECRET,
        {expiresIn: '10d'}
    )
}