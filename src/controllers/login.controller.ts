import { RequestHandler, Request, Response } from "express";
import sequelize from "sequelize";
import models from "../config/model.config";
import jwt, { JwtPayload } from "jsonwebtoken";
import messageConstant from "../constants/message.constant"
import bcrypt from "bcrypt"
import {createData, createToken, mg} from "../helpers/mail.helper"
import { createToken_fp, createData_fp } from "../helpers/forgotPass.helper";

const Login:RequestHandler = async(req,res)=>{
    try{
        const User1 = await models.User.findOne({where:{Email:req.body.Email}});
        if(User1 && User1.Status===1) // User must be in active state 
        {
            const isSame = await bcrypt.compare(req.body.Password,User1.Password!);
            if(isSame || (User1.RoleID===3 && req.body.Password===User1.Password!))
            {
                const userEmail = req.body.Email;
                const token = jwt.sign({userEmail},process.env.SECRET_KEY!,{expiresIn:'10h'});
                User1.Token = token;
                const updUser = await models.User.
                update({Token:User1.Token,LastLoginAt:new Date()},{where:{Email:userEmail}});
                   
                return res.status(200)
                    .setHeader("token", token)
                    .json({ message: "login successfully" });
            }
            else
            {
                return res.status(401)
                .json({ message: "Invalid Username or Password" });
            }
        }
        return res.status(400).json({ message: "No User Found with this Email ID" });
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
    Login
}