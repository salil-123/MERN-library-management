import mongoose from 'mongoose';


const BookSchema =new mongoose.Schema({
    bookName:{
        type:String,
        required:true
    },
    authName:{
        type:String,
        required:true
    },
    appDate:{
        type:Date
    },
    userId:{
        type:String
    },
    tags:{
        type:String,
        required:true
    },
    photo:{
        type:String
    },
    rating:{
        type:Number,
        min:0,
        max:10
    },
    featured:{
        type:Boolean,
        default:false
    },
    top:{
        type:Boolean,
        default:false
    },
    popular:{
        type:Boolean,
        default:false
    }
});

export default mongoose.model("Book",BookSchema)