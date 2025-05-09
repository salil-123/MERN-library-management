import mongoose from 'mongoose';


const ReturnSchema =new mongoose.Schema({
    userId:{
        type:String,
        required:true,
        unique:true
    },
    appDate:{
        type:Date
    },
    bookId:{
        type:String,
        required:true,
        unique:true
    }
},{timestamps:true}
);

export default mongoose.model("Return",ReturnSchema)