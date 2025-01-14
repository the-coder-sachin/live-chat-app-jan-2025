import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import { authRouter } from './routes/Authroutes.js'
import path from 'path'

dotenv.config()

const app = express()
const port = process.env.PORT || 4000
const databaseURL = process.env.DATABASE_URL


app.use(cors({
    origin:[process.env.ORIGIN],
    methods:["GET","POST","PUT","PATCH","DELETE"],
    credentials: true,
}));

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Serve static files from the 'uploads/profiles' folder
app.use('/profiles', express.static(path.join(path.resolve(), 'uploads', 'profiles')));

// api endpoints
app.use('/api/auth', authRouter)

app.get('/', (req,res)=>{
    res.send('hello sachin') 
})

const server = app.listen(port, ()=>{
    console.log(`server running... at port ${port}`)
})

mongoose.connect(databaseURL).then(()=>console.log('db connected')).catch((err)=>console.log(err.message))