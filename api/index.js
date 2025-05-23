import  express  from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import booksRoute from "./routes/books.js";
import requestRoute from "./routes/requests.js";
import returnRoute from "./routes/returns.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/users.js";
import cors from "cors";

const app = express()
dotenv.config()

const connect = async ()=> {
try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB.")
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", ()=>{
    console.log("mongo disconnected!")
})

//middlewares
app.use(cors());
app.use(cookieParser());

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users",userRoute);
app.use("/api/books", booksRoute);
app.use("/api/requests", requestRoute);
app.use("/api/returns", returnRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
});

app.listen(8800,()=>{
    connect()
    console.log("Connected to backend.")
})