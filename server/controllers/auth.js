import * as config from "../config.js";
import jwt from 'jsonwebtoken';
import {emailTemplate} from '../helpers/email.js';
import {hashPassword, comparePassword} from '../helpers/auth.js';
import User from '../models/user.js';
import { nanoid } from "nanoid";
import validator from "email-validator"

export const welcome = (req, res) => {
    res.json({
        data: 'hello from nodejs api from yaay',
    });

};

export const preRegister = async(req, res)=>{
    //create jwt with email and password then email as clickable link
    //only when user clicks on the email link registration completes
    //validate useremail and useremail exists
    //validate required fields



    try{
        const {email, password} = req.body;

        if(!validator.validate(email)){
         return res.json({error:" A valid email is required"});
        }
        if(!password){
         return res.json({error:" Password is Required"});
        }
        if(password && password?.length <6){
         return res.json({error:" Password should be at least 6 characters"});
        }
        const existingUser = await User.findOne({ email: email }); 
     
        
        if(existingUser){
         return res.json({error: "Email is taken"})
        }
        

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
       
    }
     catch(err){
        console.log(err);
        return res.json({error:"Something went wrong. Try AGAIN."});

    }
};

export const register = async(req, res)=>{
try{
   // console.log(req.body);
   const {email, password} = jwt.verify(req.body.token, config.JWT_SECRET)
  
   const hashedPassword = await  hashPassword(password);


   //create user
   const user = await new User({
    username: nanoid(6),
    email,
    password: hashedPassword,
    }).save();

   //create token and send as response
   const token = jwt.sign({_id: user._id}, config.JWT_SECRET, {
    expiresIn:"1h",
   });
   const refreshToken = jwt.sign({_id: user._id}, config.JWT_SECRET, {
    expiresIn:"7d",
   });

    user.password = "undefined";
    user.resetCode = undefined;
  return res.json({
    token,
    refreshToken,
    user,
  });


} catch (err){
    console.log(err);
    return res.json({error: "something went wrong. Try again"})
}
};