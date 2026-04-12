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
const getUserTweets = async ()=>{}
const deleteTweet = async ()=>{}
const toggleLike = async ()=>{}
const addComment = async ()=>{}
const deleteComment = async ()=>{}
const getFeed = async ()=>{}

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