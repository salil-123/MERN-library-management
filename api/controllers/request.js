import Request from "../models/Request.js";
import Book from "../models/Book.js"
import { createError } from "../utils/error.js";
import User from "../models/User.js";

import Return from "../models/Return.js";


export const createRequest=async(req,res,next)=>{
    const newRequest=new Request(req.body);
    try{
        const savedRequest = await newRequest.save()
        res.status(200).json(savedRequest);
    }catch(err){
        next(err);
    }
}
export const viewRequests=async(req,res,next)=>{
    try{
        const Requests= await Request.find();
        res.status(200).json(Requests);
    }catch(err){
        next(err);
    }
}
export const acceptRequest=async(req,res,next)=>{
    const currentDate = new Date();
    const acceptRequest1=await Request.findById(req.params.id);
    try {
        const updatedBook= await Book.findByIdAndUpdate(acceptRequest1.bookId, {$set: {userId:acceptRequest1.userId, appDate:currentDate} },{new:true});
        const updatedUser= await User.findByIdAndUpdate(acceptRequest1.userId, {$set: {bookId:acceptRequest1.bookId} },{new:true});
        if(updatedBook&&updatedUser){
            const newReturn= new Return({
                userId: acceptRequest1.userId,
                appDate: currentDate,
                bookId: acceptRequest1.bookId
              });
            const savedReturn=await newReturn.save();
            await Request.findByIdAndDelete(req.params.id);
            res.status(200).json(savedReturn);
        } else{
            next(createError(404,"Request not found"));
        }
      } catch (err) {
        next(err);
      }
}
export const deleteRequest=async(req,res,next)=>{  
    try{
        await Request.findByIdAndDelete(req.params.id);
        res.status(200).json("Request has been deleted.");
    }catch(err){
    next(err);
    }
}