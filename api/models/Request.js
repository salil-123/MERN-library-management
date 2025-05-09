import mongoose from 'mongoose';


const RequestSchema =new mongoose.Schema({
    userId:{
        type:String,
        required:true,
        unique:true
    },
    bookId:{
        type:String,
        required:true,
        unique:true
    }
},{timestamps:true}
);

export default mongoose.model("Request",RequestSchema)