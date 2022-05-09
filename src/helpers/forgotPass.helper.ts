import jwt from 'jsonwebtoken';

export const createToken_fp = (userEmail:string):string => {
    const token = jwt.sign({userEmail},process.env.FORGOT_PASSWORD!,{expiresIn:'365d'});
    return token;
}

export const createData_fp = (userEmail:string, token:string) : typeof data => {
    const data = {
        from : 'noreply@gmail.com',
        to : userEmail,
        subject : 'Reset Password',
        html : `<a href = "${process.env.CLIENT_URL}/v1/customer/confirm_reset/${token}">Please click Here to Reset Your Password</a>`
    }
    return data;
}