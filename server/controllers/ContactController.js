import mongoose from "mongoose";
import userModel from "../models/UserModel.js";
import { messageModel } from "../models/MessageModel.js";

export const searchContact = async (req, res)=>{
    const id = req.userId
    try {
        const {query} = req.body;
        
        if(query === undefined || query === null){
            return res.status(400).send('no query found!')
        }    
        const filteredQuery = query.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
        )  
        const regex = new RegExp(filteredQuery , 'i')  ;

        const users = await userModel.find({
            $and: [{_id : {$ne: id}},
                {$or: [{firstname: regex}, {lastname: regex}, {email: regex}]}
            ]
        })
        return res.status(200).json({users})
    } catch (error) {
        return res.status(500).send('internal server error')
    }
}

export const getContactsForDMList = async (req, res)=>{
    try {
        let {userId} = req;
        userId = new mongoose.Types.ObjectId(userId);
        const contact = await messageModel.aggregate([
            {
                $match:{
                    $or:[
                        {sender: userId},
                        {recipient: userId}
                    ]
                }
            },
            {
                $sort: {Timestamp: -1}
            },
            {
                $group:{
                    _id:{
                        $cond:{
                            if:{
                                $eq:['$sender', userId]
                            },
                            then: '$recipient',
                            else: '$sender'
                        }
                    },
                    lastMessageTime:{$first : '$timeStamp'} 
                }
            },{
                $lookup:{
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'contactInfo'
                }
            },{
                $unwind: '$contactInfo'
            },{
                $project:{
                    _id: 1,
                    lastMessageTime: 1,
                    email: '$contactInfo.email',
                    firstname: '$contactInfo.firstname',
                    lastname: '$contactInfo.lastname',
                    color: '$contactInfo.color',
                    image: '$contactInfo.image',
                }
            },{
                $sort:{lastMessageTime: -1}
            }
        ])

        return res.status(200).json({contact})
        
    } catch (error) {
        console.log({error});
        return res.status(500).send('internal server error')
    }
}


export const getAllContact = async (req, res) => {
  const id = req.userId;
  try {
   const users = await userModel.find({_id : { $ne: id}, }, 'firstname lastname _id email');

   const contacts = users.map(user=>({
    label: user.firstname? `${user.firstname} ${user.lastname}`: `${user.email}`,
    value: user._id
   }))
    return res.status(200).json({ contacts });
  } catch (error) {
    return res.status(500).send("internal server error");
  }
};
