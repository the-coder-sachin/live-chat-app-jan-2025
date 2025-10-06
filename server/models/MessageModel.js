import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: false,
  },
  messageType: {
    type: String,
    enum: ['text', 'file'],
    
  },
  content:{
    type: String,
  
  },
  fileUrl:{
    type: String,
    
  },
  timeStamp :{
    type: Date,
    default: Date.now
  }
});

export const messageModel = mongoose.model.messages ||  mongoose.model('messages', messageSchema)
