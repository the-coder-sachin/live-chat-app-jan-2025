import mongoose from "mongoose";
import { channelModel } from "../models/ChannelModel.js";
import userModel from "../models/UserModel.js";

export const createChannel = async (req, res) => {
  try {
    const id = req.userId;
    const {name, members} = req.body;
    const admin = await userModel.findById(id);
    if(!admin){
        return res.status(400).send('admin user not found')
    }

    const validMembers = await userModel.find({_id: {$in : members}});

    if(validMembers.length !== members.length){
        return res.status(400).send('some channel members are not valid users')
    }

    const newChannel = new channelModel ({
        name,
        members,
        admin: id
    })

    await newChannel.save();
    return res.status(200).json({channel:newChannel});

  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserChannel = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);

    const channels = await channelModel.find({
        $or : [ {admin: userId}, {members: userId}]
    }).sort({updatedAt : -1})

    return res.status(200).json({channels});

  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
