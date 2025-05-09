import mongoose from 'mongoose';


const UserSchema =new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    img:{
        type:String,
        default:"https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
    },
    bookId:{
        type:String,
        unique:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{timestamps:true}
);

export default mongoose.model("User",UserSchema)