import jwt from "jsonwebtoken";
import mailgun from "mailgun-js"; 

require("dotenv").config();
const DOMAIN: string = process.env.MAILGUN_DOMAIN!;
export const mg = mailgun({
  apiKey: process.env.MAILGUN_APIKEY!,
  domain: DOMAIN,
});

export const createData = (userEmail:string, token:string) : typeof data => {
    const data = {
        from : 'noreply@gmail.com',
        to : userEmail,
        subject : 'Account activation link',
        html : `<a href = "${process.env.CLIENT_URL}/v1/customer/activate/${token}">Please click Here to Activate Your Account</a>`
    }
    return data;
}

export const createToken = (userEmail:string):string => {
    const token = jwt.sign({userEmail},process.env.JWT_ACC_ACTIVATE!,{expiresIn:'365d'});
    return token;
}