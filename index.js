import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"

const app = express()
dotenv.config()

connectDB()

app.use(express.json())

const PORT = process.env.PORT

app.get('/', (req,res)=>{
    res.json({
        message:'servidor funcionando'
    })
})

app.listen(PORT, ()=>{
    console.log(`escuchando desde el puerto ${PORT}`)
})

