import userModel from "../models/UserModel.js";

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