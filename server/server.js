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
// app.use()
// app.get("/api",(req,res)=>{
//     res.json({"users":["userOne","userTwo","userThree"]});
// });
// app.get("/",(req,res)=>{
    
// })
app.post("/signup",async (req,res)=>{
    const {email,firstname,lastname,password,confirmpassword}=req.body;
    console.log(req.body);
    console.log(email);
    const data=new signUP({
        email:email,
        firstName:firstname,
        lastName:lastname,
        password:password,
    })
    try{
        const check=await signUP.findOne({email:email});
        if(check){
            res.json("exist");
        }
        else 
        {
            res.json("not exist");
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
    try{
        const check=await signUP.findOne({email:email});
        if(check){
            res.json("exist");
        }
        else 
        {
            res.json("not exist");
        }
    }
    catch(err)
    {
        console.log('not exist');
    }
})
app.listen(80,()=>{
    console.log('Listening on port 80');
})