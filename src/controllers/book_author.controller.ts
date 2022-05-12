import { RequestHandler, Request, Response } from "express";
import models from "../config/model.config";
import jwt, { JwtPayload } from "jsonwebtoken";
import messageConstant from "../constants/message.constant"

const createBookAuthor: RequestHandler = async(req,res)=>{
    try{
        req.body.createdUserID=req.body.UserID;
        const User1 = await models.bookAuthor.create(req.body);
        if(User1)
        {
            return res.status(200).json({message:messageConstant.newUserCreated});
        }
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({ error:error,});
    }
}
const updateBookAuthor: RequestHandler = async(req,res)=>{
    try{
        const upID = req.params.id;
        const find_User = await models.bookAuthor.findOne({where:{id:upID}});
        if(!find_User)
        {
            return res.status(404).json({message:messageConstant.noUserFoundWithID});
        }
        req.body.updateUserID=req.body.UserID;
        const User1 = await models.bookAuthor.update(
            {
                name:req.body.name,
                description:req.body.description,
                updateUserID:req.body.updateUserID
            },
            {where:{id:upID}}
        );
        if(User1)
        {
            return res.status(200).json({message:messageConstant.userUpdated});
        }
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({ error:error,});
    }
}

const deleteBookAuthor:RequestHandler = async(req,res)=>{
    const delID=req.params.id;
    
    try{
        const User1 = await models.bookAuthor.findOne({where:{id:delID}});
        if(!User1)
        {
            return res.status(404).json({message:messageConstant.noUserFoundWithID});
        }
        req.body.updateUserID=req.body.UserID;
        const delUser = await models.bookAuthor.
        update({
            deletedAt:new Date(),
            UpdateUserID:req.body.updateUserID
        },
        {where:{id:delID}});
        return res.status(200).json({message:messageConstant.userDeleted});
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({ error:error,});
    }
}

const getAllBookAuthor: RequestHandler = async(req,res)=>{
    try{
        const AllUser = await models.bookAuthor.findAll();
        return res.status(200).json(AllUser);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({ error:error,});
    }
}

export default {
    createBookAuthor,
    updateBookAuthor,
    deleteBookAuthor,
    getAllBookAuthor
}