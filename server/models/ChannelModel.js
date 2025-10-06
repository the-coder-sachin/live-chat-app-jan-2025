import mongoose from 'mongoose';

const channelSchema = new mongoose.Schema({
    name: {type: String, required:true},
    members: [{type:mongoose.Schema.Types.ObjectId, ref:'users', required:true}],
    message: [{type:mongoose.Schema.Types.ObjectId, ref:'messages', required:false}],
    admin: {type:mongoose.Schema.Types.ObjectId, ref:'users', required:true},
    createdAt: {type:Date, default:Date.now()},
    updatedAt: {type:Date, default:Date.now()},
})

channelSchema.pre('save', function(next){
    this.updatedAt = Date.now();
    next()
});

channelSchema.pre('findOneAndUpdate', function(next){
    this.set({updatedAt : Date.now()})
    next()
});

export const channelModel = mongoose.model.channels || mongoose.model('channels', channelSchema)
