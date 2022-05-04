import { RequestHandler, Request, Response } from "express";
import sequelize from "sequelize";
import models from "../config/model.config";
import messageConstant from '../constants/message.constant'
import bcrypt from "bcrypt"

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
                console.log("hi");
                //const userData = await models.User.findAll();
                //console.log(userData)
                const alreadyExist = await models.User.findOne({where:{Email:req.body.Email}});
                if(alreadyExist)
                {
                    return res.status(303).json({ message: messageConstant.emailAlreadyRegistered });
                }else{
                    console.log("hy");
                    req.body.Password = await bcrypt.hash(req.body.Password,salt);
                    console.log(req.body);
                    const newCust= await models.User.create(req.body);
                    if(newCust)
                    {
                        res.json(newCust);
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

