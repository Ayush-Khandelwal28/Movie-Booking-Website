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
const seatSelection = require('./models/seatSelectionModel')
const checkoutSchema = require('./models/checkout')
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
            const token=await data.generateAuthToken();
            console.log("token is:",token);
            res.json({"token":token, "id":data._id});
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
            if(passwordMatch){
                res.json({"token":token, "id":check._id});
            }
            else
            res.json("");
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
    const {title,duration,rating,poster,director,genre,leadActor,leadActress,plot,release} = req.body; 
    console.log('Movie being added is:',title);
    const data=new movieForm({
        title:title,
        duration:duration,
        rating:rating,
        poster:poster,
        director:director,
        genre:genre,
        leadActor:leadActor,
        leadActress:leadActress,
        plot:plot,
        release:release
    })
    try{
        const check=await movieForm.findOne({title:title});
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
        console.log(err);
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


app.get("/movies",async (req,res)=>{
    const data=await movieForm.find();
    res.json(data);
});


app.get("/movies/:id",async (req,res)=>{
    const id=req.params.id;
    const data=await movieForm.findById(id);
    res.json(data);
});

app.get("/seats-selection/:id/:date/:time",async (req,res)=>{
    const id = req.params.id;
    const date=req.params.date;
    const time=req.params.time;
    console.log(id);
    console.log(date);
    console.log(time);
    try{
        const data=await seatSelection.findOne({id:id,date:date,time:time});
        console.log(data);
        if(data)
        res.json(data["seats"]);
        else
        res.json([]);
    }
    catch{
        res.json([]);
    }
    // finally{
    //     res.json(data);
    // }
});


app.post("/updateSeat/:seats/:id/:date/:time/:user",async (req,res)=>{
    const seats=req.params.seats.split(",");
    const id=req.params.id;
    const date=req.params.date;
    const time=req.params.time;
    const user=req.params.user;
    var amt  = 0;
    console.log("myID : " + user);
    for(let i=0;i<seats.length;i++){
        if(seats[i].includes("silver"))amt+=200;
        else if(seats[i].includes("gold"))amt+=300;
        else if(seats[i].includes("platinum"))amt+=400;
    }
    try{

        const response = await seatSelection.findOneAndDelete({id:id,date:date,time:time});
        const seat = [...seats];
        if(response){
            console.log(response["seats"]);
            seat.push(...response["seats"])
        }
            const data=new seatSelection({
                id:id,
                date:date,
                time:time,
                seats:seat
            })
            data.save();
        }
    catch(e){
        console.log(e);
    }
    try{
        const response = await checkoutSchema.findOneAndDelete({userId:user});
        const seat = [...seats];
        if(response){
            console.log(response["seats"]);
            seat.push(...response["seats"])
            amt+=response["amount"];
        }
            const data=new checkoutSchema({
                userId:user,
                movieId:id,
                date:date,
                time:time,
                seats:seat,
                amount:amt
            })
            data.save();
    }
    catch(e){
        console.log(e);
    }
});

app.post("/book/:arr/:id/:movie/:date/:time",async (req,res)=>{
    const arr=req.params.arr.split(",");
    const id=req.params.id;
    const movie=req.params.movie;
    const date=req.params.date;
    const time=req.params.time;
    let amt  = 0;
    console.log("myID : " + id);
    for(let i=0;i<arr.length;i++){
        if(arr[i].includes("silver"))amt+=200;
        else if(arr[i].includes("gold"))amt+=300;
        else if(arr[i].includes("platinum"))amt+=400;
    }
    const data=new checkoutSchema({
        id:id,
        date:date,
        time:time,
        seats:arr,
        movie:movie,
        amount: amt
    })
    data.save();
});


// app.get("/checkout/:id",async (req,res)=>{
//     const id=req.params.id;
//     const data=await checkoutSchema.find({userId:id});
//     const movieData = await movieForm.findById(data.movieId);
//     const userData = await signUP.findById(id);
//     res.json({data,movieData,userData});
// })


app.listen(80,()=>{
    console.log('Listening on port 80');
})