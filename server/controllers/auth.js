import * as config from "../config.js";
import jwt from 'jsonwebtoken'
import {emailTemplate} from '../helpers/email.js'

export const welcome = (req, res) => {
    res.json({
        data: 'hello from nodejs api from yaay',
    });

};

export const preRegister = async(req, res)=>{
    //create jwt with email and password then email as clickable link
    //only when user clicks on the email link registration completes

    try{
        const {email,password} = req.body;

        let token = jwt.sign({email, password}, config.JWT_SECRET, {
            expiresIn: "1h",
        });




       config.AWSSES.sendEmail(emailTemplate(email,
        `<p>Please click the link below to activate your account.<p>

        <a href= "${config.CLIENT_URL}/auth/account-activate/${token}">Activate my account</a>`, 
        config.REPLY_TO, "Activate your account"), (err, data)=>{
            if(err){
                return res.json({ok:false});
            }
            else{
                console.log(data)
                return res.json({ok:true});
            }

        });
       
    } catch(err){
        console.log(err);
        return res.json({error:"Something went wrong. Try AGAIN."});

    }
};

export const register = async(req, res)=>{
try{
    console.log(req.body);

} catch (err){
    console.log(err);
    return res.json({error: "something went wrong. Try again"})
}
};