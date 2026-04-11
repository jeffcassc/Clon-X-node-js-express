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
const getTweets = async ()=>{}
const getTweetById = async ()=>{}
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