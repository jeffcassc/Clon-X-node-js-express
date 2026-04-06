import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from './routes/userRoutes.js'

dotenv.config()
const app = express()


connectDB()

app.use(express.json())



const PORT = process.env.PORT

app.get('/', (req,res)=>{
    res.json({
        message:'servidor funcionando'
    })
})


app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)

app.listen(PORT, () => {
    console.log(`
    Servidor corriendo en puerto ${PORT}
    URL: http://localhost:${PORT}
    Modo: ${process.env.NODE_ENV || 'development'}
  `);
});

