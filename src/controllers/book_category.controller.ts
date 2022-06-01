import { RequestHandler, Request, Response } from "express";
import models from "../config/model.config";
import jwt, { JwtPayload } from "jsonwebtoken";
import messageConstant from "../constants/message.constant"

const createBookCategory: RequestHandler = async(req,res)=>{
    try{
        req.body.createdUserID=req.body.UserID;
        const User1 = await models.bookCategory.create(req.body);
        if(User1)
        {
            return res.status(200).json({message:messageConstant.categoryCreated,
            category:User1});
        }
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({ error:error,});
    }
}
const updateBookCategory: RequestHandler = async(req,res)=>{
    try{
        const upID = req.params.id;
        const find_User = await models.bookCategory.findOne({where:{id:upID}});
        if(!find_User)
        {
            return res.status(404).json({message:messageConstant.nocategoryFoundwithid});
        }
        req.body.updateUserID=req.body.UserID;
        const User1 = await models.bookCategory.update(
            {
                name:req.body.name,
                description:req.body.description,
                updateUserID:req.body.updateUserID
            },
            {where:{id:upID}}
        );
        if(User1)
        {
            return res.status(200).json({message:messageConstant.categoryUpdated});
        }
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({ error:error,});
    }
}

const deleteBookCategory:RequestHandler = async(req,res)=>{
    const delID=req.params.id;
    
    try{
        const User1 = await models.bookCategory.findOne({where:{id:delID}});
        if(!User1)
        {
            return res.status(404).json({message:messageConstant.nocategoryFoundwithid});
        }
        req.body.updateUserID=req.body.UserID;
        const delUser = await models.bookCategory.
        update({
            deletedAt:new Date(),
            UpdateUserID:req.body.updateUserID
        },
        {where:{id:delID}});
        return res.status(200).json({message:messageConstant.categoryDeleted});
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({ error:error,});
    }
}

const getAllBookCategory: RequestHandler = async(req,res)=>{
    try{
        const AllUser = await models.bookCategory.findAll();
        return res.status(200).json(AllUser);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({ error:error,});
    }
}

export default {
    createBookCategory,
    updateBookCategory,
    deleteBookCategory,
    getAllBookCategory
}