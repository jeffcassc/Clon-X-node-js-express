import Tweet from "../models/Tweet.js";

const createTweet = async (req,res)=>{
    try {
        const { content, image }= req.body
        if(!content || content.trim() === ''){
            return res.status(400).json({
                message: 'El contenido es requerido'
            })
        }
        const tweet = await Tweet.create({
            content,
            author: req.user._id,
            image: image || ''
        })

        await tweet.populate('author', 'username displayName avatar')
        res.status(201).json(tweet)
    } catch (error) {
        console.error('Error creando tweet:', error)
        res.status(500).json({ message: 'Error en el servidor' })
    }
}
const getTweets = async (req,res)=>{
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 20
        const skip = (page - 1) * limit

        const tweets = await Tweet.find()
            .populate('author', 'username displayName avatar')
            .populate('comments.user', 'username displayName avatar')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)

        const total = await Tweet.countDocuments()

        res.json({
            tweets,
            page,
            pages: Math.ceil(total/limit),
            total
        })
            
        
    } catch (error) {
        console.error('Error obteniedo tweets:', error)
        res.status(500).json({ message: 'Error en el servidor' })
    }
}
const getTweetById = async (req,res)=>{
    try {
        const tweet = await Tweet.findById(req.params.id)
            .populate('author', 'username displayName avatar')
            .populate('comments.user', 'username displayName avatar')
            .populate('likes', 'username displayName avatar')

        if(!tweet){
            return res.status(400).json({
                message: 'tweet no encontrado'
            })
        }

        res.json(tweet)
    } catch (error) {
        console.error('Error obteniedo tweet:', error)
        res.status(500).json({ message: 'Error en el servidor' })
    }
}
const getUserTweets = async (req, res)=>{
    try {
        const tweets = await Tweet.find({author: req.params.userId})
            .populate('author','username displayName avatar' )
            .populate('comments.user','username displayName avatar' )
            .sort({ createdAt: -1 })
    
        res.json(tweets)

    } catch (error) {
        console.error('Error obteniedo tweets:', error)
        res.status(500).json({ message: 'Error en el servidor' })
    }
}
const deleteTweet = async (req,res)=>{
    try {
        const tweet = await Tweet.findById(req.params.id)
        if(!tweet){
            return res.status(404).json({
                message: 'Tweet no encontrado'
            })
        }

        if(tweet.author.toString() !== req.user._id.toString()){
            return res.status(401).json({
                message: 'No autorizado'
            })
        }

        await Tweet.findByIdAndDelete(req.params.id)

        res.json({
            message: 'Tweet eliminado'
        })

    } catch (error) {
        console.error('Error eliminando tweet:', error)
        res.status(500).json({ message: 'Error en el servidor' })
    }
}
const toggleLike = async (req,res)=>{
    try {
        const tweet = await Tweet.findById(req.params.id)
        if(!tweet){
            return res.status(404).json({
                message: 'Tweet no encontrado'
            })
        }
        const likeIndex = await tweet.likes.findIndex(
            id => id.toString() === req.user._id.toString()
        )

        if(likeIndex > -1){
            tweet.likes.splice(likeIndex, 1)
        }else{
            tweet.likes.push(req.user._id)
        }

        await tweet.save()
        res.json({
            likes: tweet.likes.length,
            isLiked: likeIndex === -1
        })
    } catch (error) {
        console.error('Error en like:', error)
        res.status(500).json({ message: 'Error en el servidor' })
    }
}
const addComment = async (req,res)=>{
    try {
        const { content }= req.body 
        if(!content || content.trim() === ''){
            return res.status(400).json({
                message: 'El contenido es requerido'
            })
        }

        const tweet = await Tweet.findById(req.params.id)
        if(!tweet){
            return res.status(404).json({
                message: 'Tweet no encontrado'
            })
        }

        const comment = {
            user: req.user._id,
            content
        }

        tweet.comments.push(comment)
        await tweet.save()

        await tweet.populate('comments.user', 'username displayName avatar')
        res.status(201).json(tweet.comments)

    } catch (error) {
        console.error('Error añadiendo comentario:', error)
        res.status(500).json({ message: 'Error en el servidor' })
    }
}
const deleteComment = async (req,res)=>{
    try {
        const tweet = await Tweet.findById(req.params.id)
        if(!tweet){
            return res.status(404).json({
                message: 'Tweet no encontrado'
            })
        }

        const comment = tweet.comments.id(req.params.commentId)
        if(!comment){
            return res.status(404).json({
                message: 'Comentario no encontrado'
            })
        }
        if(comment.user.toString() !== req.user._id.toString()){
            return res.status(401).json({
                message: 'No autorizado'
            })
        }
        tweet.comments.pull(req.params.commentId)
        await tweet.save()

        res.json({message: 'comentario eliminado'})
    } catch (error) {
        console.error('Error eliminando comentario:', error)
        res.status(500).json({ message: 'Error en el servidor' })
    }
}
const getFeed = async (req,res)=>{
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 20
        const skip = (page - 1) * limit

        const tweets = await Tweet.find({
            $or: [
                {author: req.user._id},
                {author: {$in: req.user.following}}
            ]
        })
            .populate('author', 'username displayName avatar')
            .populate('comments.user', 'username displayName avatar')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)


        res.json({
            tweets
        })
            
        
    } catch (error) {
        console.error('Error obteniedo feed:', error)
        res.status(500).json({ message: 'Error en el servidor' })
    }
}

export {
    createTweet,
    getTweets,
    getTweetById,
    getUserTweets,
    deleteTweet,
    toggleLike,
    addComment,
    deleteComment,
    getFeed
};