import jwt from "jsonwebtoken";

export const createData = (userEmail:string, token:string) : typeof data => {
    const data = {
        from : 'noreply@gmail.com',
        to : userEmail,
        subject : 'Account activation link',
        html : `<a href = "v1/customer/activate/${token}">Please click Here to Activate Your Account</a>`
    }
    return data;
}

export const createToken = (userEmail:string):string => {
    const token = jwt.sign({userEmail},process.env.JWT_ACC_ACTIVATE!,{expiresIn:'2h'});
    return token;
}