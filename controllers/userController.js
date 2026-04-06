import User from "../models/User.js";

const getUserProfile = async (req,res)=>{
    try {
        const user = await User.findOne({ username: req.params.username })
            .populate('followers', 'username displayName avatar')
            .populate('following', 'username displayName avatar')
        if(!user){
            return res.status(400).json({
                message: 'usuario no encontrado'
            })
        }

        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            displayName: user.displayName,
            avatar: user.avatar,
            bio: user.bio,
            coverImage: user.coverImage,
            followers: user.followers,
            following: user.following,
            createdAt: user.createdAt
        })

    } catch (error) {
        console.error('Error obteniendo perfil:', error)
        res.status(500).json({ message: 'Error en el servidor' })
    }
}

export {getUserProfile}