const express=require('express');
const app=express(); 
const mongoose=require('mongoose');
const path=require('path'); 
const cors=require('cors');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
require("./models/db");
const signUP=require("./models/signUP");
const bcrypt=require("bcryptjs");
const securePassword=async (password)=>{
    const passwordHash=await bcrypt.hash(password,10);
    console.log(passwordHash);

    const passwordMatch=await bcrypt.compare(password,passwordHash);
    console.log(passwordMatch);
}
app.post("/signup",async (req,res)=>{
    const {email,firstname,lastname,password,confirmpassword}=req.body;
    console.log("New sign up request by:",email);
    const data=new signUP({
        email:email,
        firstName:firstname,
        lastName:lastname,
        password:password
    })
    try{
        const check=await signUP.findOne({email:email});
        if(check){
            res.json("exist");
        }
        else 
        {
            res.json("notexist");
            data.save();
        }
    }
    catch(err)
    {
        console.log('we got a error');
    }
})
app.post("/login",async (req,res)=>{
    const {email,password}=req.body;
    console.log('Login request by:',email);
    try{
        const check=await signUP.findOne({email:email});
        if(check){
            const passwordMatch=await bcrypt.compare(password,check.password);
            if(passwordMatch)
            res.json("exist");
            else
            res.json("wrong password");
        }
        else 
        {
            res.json("notexist");
        }
    }
    catch(err)
    {
        console.log('not exist');
    }
})
// const jwt=require("jsonwebtoken");
// const createToken=async()=>{
//     const token = await jwt.sign({_id:"643a99a3484378291904363c"},"ihatedoingthebackendofthisshittyprojectallalone");
//     console.log(token);
//     const userVer=await jwt.verify(token,"ihatedoingthebackendofthisshittyprojectallalone");
//     console.log(userVer);
// };
// createToken();
app.listen(80,()=>{
    console.log('Listening on port 80');
})