import Return from "../models/Return.js";
import Book from "../models/Book.js";
import User from "../models/User.js";

export const createReturn=async(req,res,next)=>{
    const newReturn= new Return(req.body);
    try{
        const savedReturn= await newReturn.save()
        res.status(200).json(savedReturn);
    }catch(err){
        next(err);
    }
}
export const viewReturns = async (req, res, next) => {
    try {
        const currentDate = new Date();
        const returns = await Return.find();
        const modifiedReturns = returns.map(returnItem => {
            let fine = 0; 
            if (returnItem.appDate.getTime() + 7 * 24 * 60 * 60 * 1000 < currentDate.getTime()) {
                fine = parseInt((currentDate.getTime() - returnItem.appDate.getTime() - 7 * 24 * 60 * 60 * 1000) / (24 * 60 * 60 * 1000)*10);
            }
            return {
                ...returnItem.toObject(),
                fine: fine 
            };
        });
        res.status(200).json(modifiedReturns);
    } catch (err) {
        next(err);
    }
}
export const serveReturn=async(req,res,next)=>{
    const currentDate = new Date();
    try{
        const servedReturn1=await Return.findById(req.params.id);
        if(servedReturn1.appDate.getTime() + 7 * 24 * 60 * 60 * 1000 < currentDate.getTime()){
            
                await Book.findByIdAndUpdate(servedReturn1.bookId, {$set: { userId: "", appDate: null }});
                
                await User.findByIdAndUpdate(servedReturn1.userId, {$set: {bookId:""}});
                
                await Return.findByIdAndDelete(req.params.id);
                res.status(200).json("Book has been returned late");
            
                
        }else{
            await Return.findByIdAndDelete(req.params.id);
            await Book.findByIdAndUpdate(servedReturn1.bookId, {$set: { userId: "", appDate: null }});
            await User.findByIdAndUpdate(servedReturn1.userId, {$set: {bookId:""}});
            res.status(200).json("Book has been returned early");
        }
        
    }catch(err){
        next(err);
    }
}

export const findReturn = async (req,res,next)=>{
    try{
        const Return1= await Return.findOne({bookId:req.params.bookId});
        res.status(200).json(Return1);
    }catch(err){
        next(err);
    }
}