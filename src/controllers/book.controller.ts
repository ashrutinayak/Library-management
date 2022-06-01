import { RequestHandler, Request, Response } from "express";
import models from "../config/model.config";
import messageConstant from "../constants/message.constant"

type displaydata = {
    bookName:string,
    author:string,
    bookCategory:string,
    inStock:number,
    currentlyAvailable:number
}


const createBook: RequestHandler = async(req,res)=>{
    req.body.code=`BK_${Date.now()}_${Math.floor(Math.random()*10000)}`;
    req.body.createdUserID=req.body.UserID;
    try{
        const newBook = await models.Book.create(req.body);
        if(newBook)
        {
            return res.status(200).json({
                message:messageConstant.newBookCreated,
                book:newBook
            });
        }
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({error:error,});
    }
}

const updateBook:RequestHandler = async(req,res)=>{
    const upID = req.params.id;
    try{
        const findBook = await models.Book.findOne({where:{id:upID}});
        if(!findBook)
        {
            return res.status(400).json({message:messageConstant.noBookFound});
        }
        const updBook = await models.Book.update({
            name:req.body.name,
            description:req.body.description,
            inStock:req.body.inStock,
            bookAuthorID:req.body.bookAuthorID,
            bookCategoryID:req.body.bookCategory,
            updatedUserID:req.body.UserID
        },
        {where:{id:upID}});
        if(updBook)
        {
            return res.status(200).json({message:messageConstant.BookUpd});
        }
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({error:error,});
    }
}

const deleteBook:RequestHandler = async(req,res)=>{
    const delID = req.params.id;
    try{
        const findBook = await models.Book.findOne({where:{id:delID}});
        if(!findBook)
        {
            return res.status(400).json({message:messageConstant.noBookFound});
        }
        const delBook = await models.Book.update({
            updatedUserID:req.body.UserID,
            deletedAt:new Date()
        },
        {where:{id:delID}});
        if(delBook)
        {
            return res.status(200).json({message:messageConstant.BookDel});
        }
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({error:error,});
    }
}

const getAllBooks:RequestHandler = async(req,res)=>{
    try{
        const allBks = await models.Book.findAll();
        return res.status(200).json(allBks);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({error:error,});
    }

}

const getAllBooksWithData: RequestHandler = async(req,res)=>{
    try{
        const displayRequest: displaydata[]=[];
        const getAllBks = await models.Book.findAll({
            include:[
                models.bookAuthor,
                models.bookCategory
            ]});
        if(getAllBks)
        {
            for(const x in getAllBks)
            {
                const occupied = await models.issuedBook.findAll({where:{
                    bookID:getAllBks[x].id,
                    status:1
                }})
                displayRequest.push({
                    bookName:getAllBks[x].name,
                    author:getAllBks[x].bookAuthor.name,
                    bookCategory:getAllBks[x].bookCategory.name,
                    inStock:getAllBks[x].inStock,
                    currentlyAvailable:(getAllBks[x].inStock-occupied.length)
                })
            }
            return res.status(200).json({displayRequest});
        }
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({error:error,});
    }
}

export default {
    createBook,
    updateBook,
    deleteBook,
    getAllBooks,
    getAllBooksWithData
}