const mongoose = require("mongoose");
const Schema = mongoose.Schema;
console.log("Seat Selection Schema is working fine !");
const seatSelectionSchema = new Schema({
    id:{
        type:String,
    },
    date:{
        type: String,
    },
    time:{
        type:String,
    },
    seats:{
        type:Array,
    }
})

module.exports = mongoose.model("seatSelection", seatSelectionSchema);