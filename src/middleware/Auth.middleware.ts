import { RequestHandler,Request,Response } from "express";
import jwt from 'jsonwebtoken';
import messageConstant from "../constants/message.constant";
import models from "../config/model.config";
import { nextTick } from "process";

const Validate_Admin:RequestHandler = async(req,res,next)=>{
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
            req.body.updater_ID=User1.id;
            req.body.UserID = User1.id;
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

const Validate_Customer:RequestHandler = async(req,res,next)=>{
    const token = req.headers.authorization || req.header('x-auth');
    try{
        const decodedtoken:any = jwt.verify(token,process.env.SECRET_KEY!);
        if(!decodedtoken)
        {
            return res.status(400).json({message:messageConstant.invalidToken})
        }
        const {userEmail} = decodedtoken;
        const User1 = await models.User.findOne({where:{Email:userEmail}});
        if(User1 && User1.RoleID===1)
        {
            req.body.updater_ID=User1.id;
            req.body.UserID = User1.id;
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

const Validate_Librarian:RequestHandler = async(req,res,next)=>{
    const token = req.headers.authorization || req.header('x-auth');
    try{
        const decodedtoken:any = jwt.verify(token,process.env.SECRET_KEY!);
        if(!decodedtoken)
        {
            return res.status(400).json({message:messageConstant.invalidToken})
        }
        const {userEmail} = decodedtoken;
        const User1 = await models.User.findOne({where:{Email:userEmail}});
        if(User1 && User1.RoleID===2)
        {
            req.body.UserID = User1.id;
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

const Validate_Admin_or_Librarian:RequestHandler = async(req,res,next)=>{
    const token = req.headers.authorization || req.header('x-auth');
    try{
        const decodedtoken:any = jwt.verify(token,process.env.SECRET_KEY!);
        if(!decodedtoken)
        {
            return res.status(400).json({message:messageConstant.invalidToken})
        }
        const {userEmail} = decodedtoken;
        const User1 = await models.User.findOne({where:{Email:userEmail}});
        if(User1 && (User1.RoleID===3 || User1.RoleID===2))
        {
            req.body.UserID=User1.id;
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


export default {
    Validate_Admin,
    Validate_Customer,
    Validate_Librarian,
    Validate_Admin_or_Librarian
}