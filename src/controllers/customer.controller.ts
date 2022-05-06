import { RequestHandler, Request, Response } from "express";
import sequelize from "sequelize";
import models from "../config/model.config";
import jwt, { JwtPayload } from "jsonwebtoken";
import mailgun from "mailgun-js"; 
import messageConstant from "../constants/message.constant"
import bcrypt from "bcrypt"
import {createData, createToken} from "../helpers/mail.helper"

require("dotenv").config();

const DOMAIN: string = process.env.MAILGUN_DOMAIN!;
const mg = mailgun({
  apiKey: process.env.MAILGUN_APIKEY!,
  domain: DOMAIN,
});


const salt: number = 10;
const createCustomer:RequestHandler = async(req,res)=>{
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
                }else{
                    req.body.Password = await bcrypt.hash(req.body.Password,salt);
                    const newCust= await models.User.create(req.body);
                    if(newCust)
                    {
                        const token = createToken(newCust.Email);
                        const data = createData(newCust.Email, token);
                        mg.messages().send(data, function (error, body) {
                            if (error) return res.json({error: error.message});
                        });
                        return res.status(200).json({message:"Check Email to Activate Account"});
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
        if(!token) return res.status(401).send('No token Found');
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
                      .json({message: "You Account is acctivated successfully"});
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
    createCustomer,
    activateAccount,
    Login
}

