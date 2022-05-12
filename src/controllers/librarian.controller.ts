import { RequestHandler, Request, Response } from "express";
import models from "../config/model.config";
import messageConstant from "../constants/message.constant"

const updateLibrarian:RequestHandler = async(req,res)=>{
    try{
        req.body.ProfileImage = req.file?.originalname;
        const updUser = await models.User.
        update({
            FirstName:req.body.FirstName,
            LastName:req.body.LastName,
            ProfileImage:req.body.ProfileImage,
            UpdateUserID:req.body.updater_ID
        },{where:{id:req.body.UserID}});
        if(updUser)
        {
            return res.status(200).json({message:messageConstant.userUpdated});
        }
    }
    catch(error)
    {
        console.log(error);
            res.status(500).json({
                error:error,
            });
    }
}


export default {
    updateLibrarian,
}