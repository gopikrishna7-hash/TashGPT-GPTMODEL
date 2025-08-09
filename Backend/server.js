import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

const app=express();
const PORT =8080;

app.use(express.json());
app.use(cors());

app.use("/api",chatRoutes);

app.listen(PORT,()=>{
  console.log(`server is running on PORT ${PORT}`);
  connectDB();
});

const connectDB=async()=>{
  try{
    await mongoose.connect(process.env.MONOGODB_URL);
    console.log("Connected with DB")
  }catch(err){
    console.log("Failed to connect",err);
  }
}

app.post("/test",async(req,res)=>{
  try{
            const User=new User({
                email:"ram23@gmail.com",
                password:""
            })
            const response= await User.save();
            res.send(response);
        }catch(err){
            console.log(err);
        }
});
