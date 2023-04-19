const express=require('express');
const app=express(); 
const path=require('path'); 
const cors=require('cors');
const jwt=require("jsonwebtoken");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
require("./models/db");
const signUP=require("./models/signUP");
const movieForm=require("./models/movieForm");
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
            const token=await data.generateAuthToken();
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
            const token=await check.generateAuthToken(); 
            console.log("token is:",token);
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
app.post("/movieForm",async (req,res)=>{
    const {movieName,duration,rating,director,genre,leadActor,leadActress,description} = req.body; 
    console.log('Movie being added is:',movieName);
    const data=new movieForm({
        movieName:movieName,
        duration:duration,
        rating:rating,
        director:director,
        genre:genre,
        leadActor:leadActor,
        leadActress:leadActress,
        description:description
    })
    try{
        const check=await movieForm.findOne({movieName:movieName});
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
// const createToken=async()=>{
//     const token = await jwt.sign({_id:"643a99a3484378291904363c"},"thequickbrownfoxjumpsoverthelazydog",{
//         expiresIn:"2 seconds"
//     });
//     console.log(token);
//     const userVer=await jwt.verify(token,"thequickbrownfoxjumpsoverthelazydog");
//     console.log(userVer);
// };
// createToken();
app.listen(80,()=>{
    console.log('Listening on port 80');
})