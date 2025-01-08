import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'

dotenv.config()

const app = express()
const port = process.env.PORT || 4000
const databaseURL = process.env.DATABASE_URL


app.use(cors({
    origin:[process.env.ORIGIN],
    methods:["GET","POST","PUT","PATCH","DELETE"],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

app.get('/', (req,res)=>{
    res.send('hello sachin') 
})

const server = app.listen(port, ()=>{
    console.log(`server running... at port ${port}`)
})

mongoose.connect(databaseURL).then(()=>console.log('db connected')).catch((err)=>console.log(err.message))