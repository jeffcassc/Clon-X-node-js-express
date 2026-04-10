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
const updateProfile = async (req,res)=>{
    try {
        const { displayName, bio, avatar, coverImage } = req.body

        const user = await User.findById(req.user._id)
        if(!user){
            return res.status(400).json({
                message: 'Usuario no encontrado'
            })
        }

        if(displayName) user.displayName = displayName
        if(bio !== undefined) user.bio = bio
        if(avatar) user.avatar = avatar
        if(coverImage) user.coverImage = coverImage

        await user.save()

        res.json({
            _id: user._id,
            username: user.username,
            displayName: user.displayName,
            avatar: user.avatar,
            bio: user.bio,
            coverImage: user.coverImage,
        })

    } catch (error) {
        console.error('Error actualizando usuario:', error)
        res.status(500).json({ message: 'Error en el servidor' })
    }
}

const followUser = async (req,res)=>{
    try {
        const userToFollow = await User.findById(req.params.id)
        const currentUser = await User.findById(req.user._id)

        if(!userToFollow){
            return res.status(400).json({
                message: 'Usuario no encontrado'
            })
        }

        if(req.params.id === req.user._id.toString()){
            return res.status(400).json({
                message: 'No puedes seguirte a ti mismo'
            })
        }

        if(currentUser.following.includes(req.params.id)){
            return res.status(400).json({
                message: 'ya sigues a este usuario'
            })
        }

        currentUser.following.push(req.params.id)
        await currentUser.save()

        userToFollow.followers.push(req.user._id)
        await userToFollow.save()

        res.json({
            message: 'Usuario seguido exitosamente',
            following: currentUser.following.length
        })

    } catch (error) {
        console.error('Error siguiendo usuario:', error)
        res.status(500).json({ message: 'Error en el servidor' })
    }
}
const unFollowUser = async (req,res)=>{
    try {
        const userToFollow = await User.findById(req.params.id)
        const currentUser = await User.findById(req.user._id)

        if(!userToFollow){
            return res.status(400).json({
                message: 'Usuario no encontrado'
            })
        }

        if(!currentUser.following.includes(req.params.id)){
            return res.status(400).json({
                message: 'No sigues a este usuario'
            })
        }

        currentUser.following = currentUser.followers.filter(
            id => id.toString() !== req.params.id
        )
        await currentUser.save()

        userToFollow.followers = userToFollow.followers.filter(
            id => id.toString() !== req.user._id.toString()
        )
        await userToFollow.save()

        res.json({
            message: 'Usuario dejado de seguir exitosamente',
            following: currentUser.following.length
        })

    } catch (error) {
        console.error('Error dejado de usuario:', error)
        res.status(500).json({ message: 'Error en el servidor' })
    }
}
const searchUsers = async ()=>{}
const getSuggestedUsers = async ()=>{
}

export {getUserProfile, updateProfile, followUser, unFollowUser }