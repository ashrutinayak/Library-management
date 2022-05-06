import { RequestHandler,Request,Response } from "express";
import jwt from 'jsonwebtoken';
import messageConstant from "../constants/message.constant";
import models from "../config/model.config";
import { nextTick } from "process";

const login_Authenticate:RequestHandler = async(req,res,next)=>{
    const token = req.headers.authorization || req.header('x-auth');
    try{
        const decodedtoken:any = jwt.verify(token,process.env.SECRET_KEY!);
        if(!decodedtoken)
        {
            return res.status(400).json({message:messageConstant.invalidToken})
        }
        const {userEmail} = decodedtoken;
        const User1 = await models.User.findOne({where:{Email:userEmail}});
        if(User1 && User1.RoleID===3)
        {
            next();
        }
        else
        {
            return res.status(401).json({message:messageConstant.unauthorizedUser})
        }
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({error:error,});
    }
}

export default login_Authenticate