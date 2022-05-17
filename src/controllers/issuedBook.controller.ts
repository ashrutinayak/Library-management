import { RequestHandler, Request, Response } from "express";
import models from "../config/model.config";
import jwt, { JwtPayload } from "jsonwebtoken";
import messageConstant from "../constants/message.constant"

const issueBook : RequestHandler = async(req,res)=>{
      try{
            const findBk = await models.Book.findOne({where:{code:req.body.book_code}});
            if(!findBk)
            {
                return res.status(400).json({message:messageConstant.noBookFound});
            }
            const BkId=findBk.id;
            const findCus = await models.User.findOne({where:{Code:req.body.customer_code}});
            if(!findCus)
            {
              return res.status(400).json({message:messageConstant.noUserFound});
            }
            const CusId = findCus.id;
            const alreadyIssued = await models.issuedBook.findOne({where:{bookID:BkId,customerUserID:CusId,status:1}});
            if(alreadyIssued)
            {
                const updentry = await models.issuedBook.update({
                  status:2
                },{where:{id:alreadyIssued.id}});
                const renewentry = await models.issuedBook.create({
                  renewIssuedBookID:alreadyIssued.id,
                  bookID:BkId,
                  customerUserID:CusId,
                  librarianUserID:req.body.UserID,
                  startDateTime:Date.now(),
                  endDateTime:req.body.endDateTime,
                  status:1
                })
                if(renewentry)
                {
                  return res.status(200).json({messsage:messageConstant.bookRenewed})
                }
            }
            else
            {
               const findAllBks = await models.issuedBook.findAll({where:
                {customerUserID:CusId,
                status:1}});

                if(findAllBks.length>=5)
                {
                  return res.status(400).json({message:messageConstant.LimitExceeded});
                }
                else
                {
                  if(findBk.inStock>0)
                  {
                    const occupied_book = await models.issuedBook.findAll({where:{bookID:BkId,status:1}});
                    const avail_bks = findBk.inStock-occupied_book;
                    if(avail_bks>0)
                    {
                      const newentry = await models.issuedBook.create({
                        bookID:BkId,
                        customerUserID:CusId,
                        librarianUserID:req.body.UserID,
                        startDateTime:Date.now(),
                        endDateTime:req.body.endDateTime,
                        status:1
                      })
                      if(newentry)
                      {
                         return res.status(200).json({message:messageConstant.newBookIssued});
                      }
                    }
                    else
                    {
                        return res.status(404).json({message:messageConstant.currentlynotavailable}); 
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

const submitBook : RequestHandler = async(req,res)=>{
  try{
    const findBk = await models.Book.findOne({where:{code:req.body.book_code}});
    if(!findBk)
    {
        return res.status(400).json({message:messageConstant.noBookFound});
    }
    const BkId=findBk.id;
    const findCus = await models.User.findOne({where:{Code:req.body.customer_code}});
    if(!findCus)
    {
        return res.status(400).json({message:messageConstant.noUserFound});
    }
    const CusId = findCus.id;
    const alreadyIssued = await models.issuedBook.findOne({where:{bookID:BkId,customerUserID:CusId,status:1}});
    if(alreadyIssued)
    {
        const Submitted = await models.issuedBook.update({
          status:3,
          submitDateTime:Date.now()
        },{where:{id:alreadyIssued.id}})
        if(Submitted)
        {
          return res.status(200).json({message:messageConstant.bookSubmitted});
        }
        
    }
    else
    {
        return res.status(400).json({message:messageConstant.Notissued})
    }
  }
  catch(error)
  {
      console.log(error);
      res.status(500).json({ error:error,});
  }
  
}

const lostBook : RequestHandler = async(req,res)=>{
  try{
    const findBk = await models.Book.findOne({where:{code:req.body.book_code}});
    if(!findBk)
    {
        return res.status(400).json({message:messageConstant.noBookFound});
    }
    const BkId=findBk.id;
    const findCus = await models.User.findOne({where:{Code:req.body.customer_code}});
    if(!findCus)
    {
        return res.status(400).json({message:messageConstant.noUserFound});
    }
    const CusId = findCus.id;
    const alreadyIssued = await models.issuedBook.findOne({where:{bookID:BkId,customerUserID:CusId,status:1}});
    if(alreadyIssued)
    {
      const Lost = await models.issuedBook.update({
        status:4,
      },{where:{id:alreadyIssued.id}})
      if(Lost)
      {
        const updStatus = await models.Book.update({
          inStock:findBk.inStock-1,
          updatedUserID:req.body.UserID
        },{where:{id:BkId}})

        if(updStatus)
        {
          return res.status(200).json({message:messageConstant.bookLost});
        }
      }
    }
    else
    {
        return res.status(400).json({message:messageConstant.Notissued})
    }
  }
  catch(error)
  {
      console.log(error);
      res.status(500).json({ error:error,});
  }
}

export default {
    issueBook,
    submitBook,
    lostBook
}