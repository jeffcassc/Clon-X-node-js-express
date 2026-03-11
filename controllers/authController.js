import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const generateToken = (id)=>{
    return jwt.sign(
        {id},
        process.env.JWT_SECRET,
        {expiresIn: '10d'}
    )
}


const register = async (req,res)=>{
    try {
        const { username, email, password } = req.body

        if (!username || !email || !password){
            return res.status(400).json({
                message: 'todo los campos son requeridos'
            })
        }
        const userExist = await User.findOne({
            $or:[{username}, {email}]
        }) 

        if(userExist){
            return res.status(400).json({
                message: 'el usuario o el email ya esta registrado'
            })
        }

        const user = await User.create({
            username,
            email,
            password,
            displayName: username
        })

        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            displayName: user.displayName,
            avatar: user.avatar,
            bio: user.bio,
            token: generateToken(user._id)
        })
    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({message: 'Error en el servidor'});
    }
}

export { register }