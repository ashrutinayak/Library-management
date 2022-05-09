import { RequestHandler, Request, Response } from "express";
import sequelize from "sequelize";
import models from "../config/model.config";
import jwt, { JwtPayload } from "jsonwebtoken";
import mailgun from "mailgun-js"; 
import messageConstant from "../constants/message.constant"
import bcrypt from "bcrypt"

const salt: number = 10;
const createLibrarian:RequestHandler = async(req,res)=>{
    const token = req.headers.authorization! || req.header('x-auth')!;
    try{
            const decodedtoken:any = jwt.verify(token,process.env.SECRET_KEY!);
            const {userEmail} = decodedtoken;
            const User1 = await models.User.findOne({where:{Email:userEmail}});
            req.body.RoleID=2;
            req.body.Status=1;
            req.body.Code="LIB0001";
            req.body.Password = await bcrypt.hash(req.body.Password,salt);
            req.body.UpdateUserID=User1.id;
            const newLib= await models.User.create(req.body);
            if(newLib)
            {
                return res.status(200).json({message:messageConstant.newUserCreated});
            }
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({error:error,});
    }
}

const updateLibrarian:RequestHandler = async(req,res)=>{
    console.log("inside librarian controller");
    const upID = parseInt(req.params.ID);
    try{
            const libUser = await models.User.findOne({where:{id:upID}});
            if(libUser.RoleID!=2)
            {
                res.status(400).json({message:messageConstant.notLibrarian})
            } 
            req.body.UpdateUserID=req.body.Admin_ID;
            const updUser = await models.User.
            update({
                FirstName:req.body.FirstName,
                LastName:req.body.LastName,
                ProfileImage:req.body.ProfileImage,
                UpdateUserID:req.body.UpdateUserID,
                Status:req.body.Status
            },{where:{id:upID}})
            res.status(200).json({message:messageConstant.userUpdated});
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({error:error,});
    }
}

const deleteLibrarian:RequestHandler = async(req,res)=>{
    const delID=req.params.ID;
    
    try{
        const libUser = await models.User.findOne({where:{id:delID}});
        if(libUser.RoleID!=2)
        {
            res.status(400).json({message:messageConstant.notLibrarian})
        } 
        const delUser = await models.User.
        update({
            deletedAt:new Date(),
            UpdateUserID:req.body.Admin_ID
        },
        {where:{id:delID}});
        return res.status(200).json({message:messageConstant.userDeleted});
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({error:error.details[0].message,});
    }
}

export default {
    createLibrarian,
    updateLibrarian,
    deleteLibrarian
}