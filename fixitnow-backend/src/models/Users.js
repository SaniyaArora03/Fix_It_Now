import mongoose from "mongoose";

const userschema=new mongoose.Schema({
    name:String,
    email:{ type: String, unique: true },
    password:String,
    role:{
       type:String,
       enum:["CUSTOMER","TECHNICIAN"] ,
       required:true
    }
}) ;
export default  mongoose.model("User",userschema);     