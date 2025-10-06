import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import { authRouter } from './routes/Authroutes.js'
import path from 'path'
import { contactRouter } from './routes/ContactRoutes.js'
import setupShocket from './socket.js'
import { messageRoutes } from './routes/MessageRoutes.js'
import { channelRoutes } from './routes/ChannelRoutes.js'
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config()

const app = express() 
const port = process.env.PORT || 4000
const databaseURL = process.env.DATABASE_URL


const allowedOrigins = [
  "http://localhost:5173",
  "https://live-chat-app-jan-2025-1.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Serve static files from the 'uploads/profiles' folder
app.use(
  "/profiles",
  express.static(path.join(__dirname, "uploads", "profiles"))
);
app.use(
  "/uploads/files",
  express.static(path.join(__dirname, "uploads", "files"))
);


// api endpoints
app.use('/api/auth', authRouter)
app.use('/api/contact', contactRouter)
app.use('/api/messages', messageRoutes)
app.use('/api/channel' , channelRoutes)

app.get('/', (req,res)=>{
    res.send('hello sachin') 
})

const server = app.listen(port, ()=>{
    console.log(`server running... at port ${port}`)
})

setupShocket(server)

const connectDB = async () => await mongoose.connect(databaseURL).then(()=>console.log('db connected')).catch((err)=>console.log(err.message))

connectDB()

