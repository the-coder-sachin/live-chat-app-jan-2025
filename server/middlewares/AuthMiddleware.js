import jwt from 'jsonwebtoken'

export const verifyToken = (req,res,next)=>{
    const token = req.cookies.jwt;
    if(!token){
        return res.status(400).send('login session expired please login again')
    }
    jwt.verify(token, process.env.JWT_TOKEN, async(error, payload)=>{
        if(error){
            return res.status(401).send("something broken please try logging again")
        }
        req.userId = payload.userId;
        next()
    })
    
}