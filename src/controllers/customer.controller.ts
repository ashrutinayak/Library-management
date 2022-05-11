import { RequestHandler, Request, Response } from "express";
import models from "../config/model.config";
import jwt, { JwtPayload } from "jsonwebtoken";
import messageConstant from "../constants/message.constant"
import bcrypt from "bcrypt"
import {createData, createToken,transporter} from "../helpers/mail.helper"
import { createToken_fp, createData_fp } from "../helpers/forgotPass.helper";
import { nextTick } from "process";
import { userInfo } from "os";
require("dotenv").config();

const salt: number = 10;
const createCustomer:RequestHandler = async(req,res)=>{
         req.body.ProfileImage = req.file?.originalname;
         req.body.RoleID=1;
         req.body.Status=0;
         req.body.Code="Cus0001";
        const confirm = req.body.Password === req.body.Confirm_Password;
        if(!confirm)
        {
            return res.json({message:messageConstant.passwordNotMatch})
        }
        else
        {
            try{
                const alreadyExist = await models.User.findOne({where:{Email:req.body.Email}});
                if(alreadyExist)
                {
                    return res.status(303).json({ message: messageConstant.emailAlreadyRegistered });
                }
                else
                {
                    req.body.Password = await bcrypt.hash(req.body.Password,salt);
                    const newCust= await models.User.create(req.body);
                    if(newCust)
                    {
                        const token = createToken(newCust.Email);
                        const data = createData(newCust.Email, token);
                        transporter.sendMail(data, function (error, body) {
                        if (error)
                        {
                            return res.status(400).json({error: error.message,});
                        }  
                        });
                        return res.status(200).json({message:messageConstant.emailtoActivateAccount});
                        
                    }
                }

                
            }
            catch(error){
                    console.log(error);
                    res.status(500).json({
                        error:error,
                    });
            }
        }
}

const activateAccount:RequestHandler = async(req,res)=>{
        const {token} = req.params;
        try{
            const decodedtoken:any = jwt.verify(token,process.env.JWT_ACC_ACTIVATE!);
            const {userEmail} = decodedtoken;
            const user =  await models.User.findOne({where:{Email:userEmail}});
            user.Status=1;
            const updUser = await models.User.
            update({Status:user.Status},{where:{Email:userEmail}});
            if(updUser)
            {
                return res.status(200)
                      .json({message: messageConstant.accountActivated});
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

const updateCustomer: RequestHandler = async(req,res)=>{
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

const forgotPassword: RequestHandler = async(req,res)=>{
    const uEmail = req.body.Email;
    try{
        const User1 = await models.User.findOne({where:{Email:req.body.Email}});
        if(!User1)
        {
            return res.status(400)
              .json({ message: messageConstant.noUserFound });
        }
       const token = createToken_fp(uEmail);
       const updUser = await models.User.update({Token:token},{where:{Email:uEmail}});
       const data = createData_fp(uEmail,token);
       transporter.sendMail(data, function (error, body) {
        if (error) return res.json({error: error.message,});
      });
      return res.status(200).json({message:messageConstant.resetLinksend});
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({
            error:error,
        });
    }
    
}

const resetPassword:RequestHandler = async(req,res)=>
{
    try{
        const User1 = await models.User.findOne({where:{Email:req.body.Email}});
        if(User1.Token!==req.body.token)
        {
            res.status(400).json({message:messageConstant.unauthorizedUser});
        }
        else
        {
            req.body.newPassword = await bcrypt.hash(req.body.newPassword,salt);
            const updUser = await models.User.update({
                Password:req.body.newPassword,
                UpdateUserID:User1.id,
            },{where:{Email:req.body.Email}});
            if(updUser)
            {
                res.status(200).json({message:messageConstant.passReset});
            }
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
    createCustomer,
    activateAccount,
    forgotPassword,
    resetPassword,
    updateCustomer
}

