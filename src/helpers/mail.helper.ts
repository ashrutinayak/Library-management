import jwt from "jsonwebtoken";
import SMTPTransport from "nodemailer";
const ejs = require("ejs");

require("dotenv").config();
interface MailtrapTransporter {
    host:string
}

export const transporter = SMTPTransport.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    auth: {
        user: "harshptank2212@gmail.com",
        pass: "rhuejqwjjnksgjoz",
    },
} as MailtrapTransporter);



export const createData = (userEmail:string, token:string , Subject:string, Content:string)  => {
    
    const data = {
        from : '"Harsh" testmail@tatva.com',
        to : userEmail,
        subject : Subject,
        html : Content
    }
    return data
    
}

export const createToken = (userEmail:string, JwtKey:string):string => {
    const token = jwt.sign({userEmail},JwtKey,{expiresIn:'365d'});
    return token;
}
