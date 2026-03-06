import express from "express"
import dotenv from "dotenv"

const app = express()
dotenv.config()

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

