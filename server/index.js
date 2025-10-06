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


app.use(
  cors({
    origin: process.env.ORIGIN, 
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

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

const connectDB = async () => {
  try {
    await mongoose.connect(databaseURL);
    console.log("DB connected");
  } catch (err) {
    console.error("DB connection error:", err.message);
    process.exit(1);
  }
};

connectDB()
const server = app.listen(port, ()=>{
    console.log(`server running... at port ${port}`)
})

setupShocket(server)




