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
    required: true,
  },
  content:{
    type: String,
    required: function(){
        return this.messageType === 'text'
    }
  },
  fileUrl:{
    type: String,
    required : function(){
        return this.messageType === 'file'
    }
  },
  timeStamp :{
    type: Date,
    default: Date.now
  }
});

export const messageModel = mongoose.model('messages', messageSchema)
