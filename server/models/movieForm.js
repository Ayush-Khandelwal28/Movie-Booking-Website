const mongoose = require("mongoose");
const Schema = mongoose.Schema;
console.log("Hello from movieFrom schema");
const movieFormSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    release:{
        type:String,
        required:true
    },
    rating:{
        type:String,
        required:true
    },
    director:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        required:true
    },
    leadActor:{
        type:String,
        required:true
    },
    leadActress:{
        type:String,
        required:true
    },
    plot:{
        type:String,
    },
    poster:{
        type:String,
        required:true
    }
}); 
module.exports = mongoose.model("movieForm", movieFormSchema);

// // movieName,
//                     duration,
//                     rating,
//                     director,
//                     genre,
//                     leadActor,
//                     leadActress,
//                     description,