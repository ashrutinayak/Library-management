import { RequestHandler, Request, Response } from "express";
import sequelize from "sequelize";
import models from "../config/model.config";
import jwt from "jsonwebtoken";
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
        //console.log(req.body);
         req.body.RoleID=1;
         req.body.Status=0;
         req.body.Code="Cus0001";
         console.log(req.body);
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
            }
            //console.log(alreadyExist);
            
        }
}
export default {
    createCustomer
}

