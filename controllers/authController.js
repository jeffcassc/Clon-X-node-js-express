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

const login = async (req,res)=>{
    try {
        const {email, password} = req.body

        if (!email || !password){
            return res.status(400).json({
                message: 'todo los campos son requeridos'
            })
        }

        const user = await User.findOne({email}).select('+password')

        if (!user) {
            return res.status(401).json({
                message:'credenciales invalidas'
            })
        }

        const isMatch = await user.matchPassword(password)

        if (!isMatch) {
            return res.status(401).json({
                message:'credenciales invalidas'
            })
        }
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            displayName: user.displayName,
            avatar: user.avatar,
            bio: user.bio,
            followers: user.followers.length,
            following: user.following.length,
            token: generateToken(user._id)
        })


    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({message: 'Error en el servidor'});
    }
}

export { register, login }