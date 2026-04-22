import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from './routes/userRoutes.js'
import tweetRoutes from './routes/tweetRoutes.js'
import bookmarkRoutes from './routes/bookmarkRoutes.js'
import notificationRoutes from './routes/notificationRoutes.js'

dotenv.config()
const app = express()


connectDB()

app.use(express.json())



const PORT = process.env.PORT

app.get('/', (req,res)=>{
    res.json({
        message:'Backend Clon Twitter/X: servidor funcionando',
        endpoints: {
            auth: '/api/auth',
            users: '/api/users',
            tweets: '/api/tweets',
            bookmarks: '/api/bookmarks',
            notifications: '/api/notifications'
        }
    })
})


app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/tweets', tweetRoutes)
app.use('/api/bookmark', bookmarkRoutes)
app.use('/api/notifications', notificationRoutes)

app.listen(PORT, () => {
    console.log(`
    Servidor corriendo en puerto ${PORT}
    URL: http://localhost:${PORT}
    Modo: ${process.env.NODE_ENV || 'development'}
  `)
})

