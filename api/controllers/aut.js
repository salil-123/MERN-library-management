import User from "../models/User.js";
import {createError} from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register= async(req,res,next)=>{
    try{
        const newUser=new User({
            ...req.body,
            password:req.body.password,

        })
        await newUser.save()
        res.status(200).send("User has been created.")
    }catch(err){
        next(err);
    }
}
export const login= async(req,res,next)=>{
    try{
        const user = await User.findOne({userName:req.body.userName});
        if(!user) return next(createError(404,"User not found"));
        const isPasswordCorrect = (req.body.password===user.password)
        if(!isPasswordCorrect) 
            return next(createError(404,"Wrong username or password"))
        
        const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT);

        const{password,isAdmin,...otherDetails}=user._doc;

        res.cookie("access_token",token,{
            httpOnly:true,
        }).status(200).json({details:{...otherDetails},isAdmin});
    }catch(err){
        next(err);
    }
}