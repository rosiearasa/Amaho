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

//helper function create token and send as response
const tokenUserResponse = (req, res,user)=>{

const token = jwt.sign({_id: user._id}, config.JWT_SECRET, {
 expiresIn:"1h",
});
const refreshToken = jwt.sign({_id: user._id}, config.JWT_SECRET, {
 expiresIn:"7d",
});

 user.password = undefined;
 user.resetCode = undefined;
return res.json({
 token,
 refreshToken,
 user,
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
        config.REPLY_TO, "Activate your account"), 
        (err, data)=>{
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
   const {email, password} = jwt.verify(req.body.token, config.JWT_SECRET);
   const existingUser = await User.findOne({ email: email }); 
     
        
   if(existingUser){
    return res.json({error: "Email is taken"});
   }
   
  
   const hashedPassword = await  hashPassword(password);


   //create user
   const user = await new User({
    username: nanoid(6),
    email,
    password: hashedPassword,
    }).save();

  tokenUserResponse(req, res,user);

} catch (err){
    console.log(err);
    return res.json({error: "something went wrong. Try again"})
}
};


export const login= async( req, res) =>{
    try{
        const {email, password} = req.body;
        /**
         * find user by email
         */
        const user = await User.findOne({email});

        //match password
        const match = await comparePassword(password, user.password);

        if (!match){
            return res.json({error:"Wrong password"})
        }
        tokenUserResponse(req, res,user);
    }
    catch (err){
        console.log(err);
        return res.json({error:" Something went wrong. Try again"})
    }
}

export const forgotPassword = async (req, res) =>{
    try {
        const {email} = req.body;
        const user = await User.findOne({email});
        if (!user){
            return res.json({error: "Could not find the user with that email"});
        }
        else{
            //reset code token 
            //save in db for access to make a request for account access by resent code
            //token must be decoded and check expiration
             const resetCode = nanoid();
             user.resetCode = resetCode
             user.save();
             const token = jwt.sign({resetCode}, config.JWT_SECRET, {
                expiresIn: "1h",}
            );

            config.AWSSES.sendEmail(emailTemplate(email, 
                `<p>
                Please click the link below to access your account.
                <a href="${config.CLIENT_URL}/auth/access-account/${token}">Access my account</a>
            </p>`,
             config.REPLY_TO, " Access your Account"),
            (err, data)=>{
                if(err){
                    return res.json({ok:false});
                }
                else{
                    console.log(data)
                    return res.json({ok:true});
                }
    
            });
        }
    }catch (err){
        console.log(err);
        return res.json({error:" Something went wrong. Try again"})
    }
}



export const accessAccount = async(req, res) =>{
    try {
        const {resetCode} = jwt.verify(req.body.resetCode, config.JWT_SECRET);
        const user = await User.findOneAndUpdate({resetCode},{resetCode:''});
        tokenUserResponse(req, res,user);
    }
    catch(err){
        console.log(err);
        return res.json({error:"Something went wrong. Try again"});
    }
}


export const refreshToken = async(req, res) =>{
    try{
        const {_id} = jwt.verify(req.headers.refresh_token,config.JWT_SECRET);
        const user = await User.findById(_id);

        tokenUserResponse(req, res,user);

    }

    catch(err){
        console.log(err);
        return res.status(403).json({error:"Refresh token failed"});
    }
}


export const currentUser = async(req, res) =>{
    try{
        const user = await User.findById(req.user._id);
        user.password = undefined;
        user.resetCode = undefined;
        res.json(user);
       
    }

    catch(err){
        console.log(err);
        return res.status(403).json({error:"Anauthorized"});
    }
}



export const publicProfile = async(req, res) =>{
    try{
        const user = await User.findOne({username: req.params.username});
        user.password = undefined;
        user.resetCode = undefined;
        res.json(user);

    }

    catch(err){
        console.log(err);
        return res.json({error:"User not Found"});
    }
}

export const updatePassword = async(req, res) =>{
    try{
        const {password} = req.body;
        if(!password){
            return res.json({error:"Password is Required"});

        }
        if(password && password?.length < 6){
            return res.json({error:"Password should be 6 characters long"});
        }

        const user = await User.findOneAndUpdate(req.user._id,{
            password : await hashPassword(password),
        });
        res.json({ok: true});

    }

    catch(err){
        console.log(err);
        return res.json({error:"User not Found"});
    }
}

export const updateProfile = async(req, res) =>{
    try{
       

        const user = await User.findByIdAndUpdate(req.user._id, req.body,{
            new: true,
        });
        user.password = undefined;
        user.resetCode = undefined;
        res.json(user);

    }

    catch(err){
        console.log(err);
        if(err.codeName ==="DuplicateKey"){
            return res.json({error: "Username or email is already is taken"});
        }
        else{
            return res.json({error:"could not update user"});
        }
       
    }
}



