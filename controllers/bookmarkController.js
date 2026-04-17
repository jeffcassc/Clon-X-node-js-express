import Bookmark from "../models/BookMark.js";
import Tweet from "../models/Tweet.js"

const toggleBookmark = async (req,res)=>{
    try {
        const {tweetId} = req.params
        const userId = req.user._id

        const tweet = await Tweet.findById(tweetId)
        if(!tweet){
            return res.status(404).json({
                message: 'Tweet no encontrado'
            })
        }

        const existingBookmark = await Bookmark.findOne({
            user: userId,
            tweet: tweetId
        })

        if(existingBookmark){

            await Bookmark.findByIdAndDelete(existingBookmark._id)
            res.json({bookmarked: false, message: 'Bookmark eliminado'})
        }else{
            await Bookmark.create({user: userId,tweet: tweetId})
            res.json({bookmarked: true, message: 'Tweet guardado'})
        }
    } catch (error) {
        console.error('Error en Bookmark:', error)
        res.status(500).json({ message: 'Error en el servidor' })
    }
}
const getBookmarks = async ()=>{}
const checkBookmark = async ()=>{}


export { toggleBookmark, getBookmarks, checkBookmark }