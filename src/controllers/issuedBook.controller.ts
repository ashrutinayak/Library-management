import { RequestHandler, Request, Response } from "express";
import models from "../config/model.config";
import jwt, { JwtPayload } from "jsonwebtoken";
import messageConstant from "../constants/message.constant"

const issueBook : RequestHandler = async(req,res)=>{
      try{
            const findBk = await models.Book.findOne({where:{code:req.body.code}});
            if(!findBk)
            {
                return res.status(400).json({message:messageConstant.noBookFound});
            }
            const BkId=findBk.id;
            const alreadyIssued = await models.issuedBook.findOne({where:{bookID:BkId,customerUserID:req.body.customerUserID}});
            if(alreadyIssued)
            {
                const endDate = new Date();
                endDate.setDate(endDate.getDate()+10);
                const renewentry = await models.issuedBook.create({
                  renewIssuedBookID:alreadyIssued.id,
                  bookID:BkId,
                  customerUserID:req.body.customerUserID,
                  librarianUserID:req.body.UserID,
                  startDateTime:Date.now(),
                  endDateTime:endDate,
                  status:2
                })
                if(renewentry)
                {
                  return res.status(200).json({messsage:messageConstant.bookRenewed})
                }
            }
            else
            {
               const findAllBks = await models.issuedBook.findAll({where:
                {customerUserID:req.body.customerUserID,
                status:1}});

                if(findAllBks.length>=5)
                {
                  return res.status(400).json({message:messageConstant.LimitExceeded});
                }
                else
                {
                  if(findBk.inStock>0)
                  {
                    const endDate = new Date();
                    endDate.setDate(endDate.getDate()+10);
                    const newentry = await models.issuedBook.create({
                      bookID:BkId,
                      customerUserID:req.body.customerUserID,
                      librarianUserID:req.body.UserID,
                      startDateTime:Date.now(),
                      endDateTime:endDate,
                      status:1
                    })
                    const updBK = await models.Book.update({
                      inStock:findBk.inStock-1,
                      updatedUserID:req.body.UserID
                    },{where:{code:req.body.code}});

                    if(newentry)
                    {
                       return res.status(200).json({message:messageConstant.newBookIssued});
                    }
                  }
                  else
                  {
                    return res.status(404).json({message:messageConstant.outofstock}); 
                  }
                }
            }
      }
      catch(error)
      {
        console.log(error);
        res.status(500).json({ error:error,});
      }
}

export default {
    issueBook
}