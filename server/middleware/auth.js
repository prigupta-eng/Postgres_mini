import jwt from "jsonwebtoken";
import { config } from "dotenv";
config()


const secret = process.env.JWT_SECRET;

export const isAuth = async(req, res, next) =>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({error : "Not authenticated, please login"})
    }
    try{
        const decoded = jwt.verify(token, secret)
        req.user = decoded
        next()
    }catch(err){
        console.log(`error ====> ${err}`)
        return res.status(401).json({error : `Invalid token`})
    }
}

export const isAdmin = async(req, res, next) =>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({error : "Acess denied, please login"})
    }
    try{
        const decoded = jwt.verify(token, secret)

        if(decoded.role === 'admin'){
            req.user = decoded
            next()
        }else{
            return res.status(403).json({error : "Acess denied"})
        }
    }catch(err){
        console.log(`error ====> ${err}`)
        return res.status(500).json({error : `Internal server error`})
    }
}