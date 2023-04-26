const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const checkoutSchema = new Schema({
    userId:{
        type:String,
    },
    movieId:{
        type:String,
    },
    date:{
        type: String,
    },
    time:{
        type:String,
    },
    amount:{
        type:Number,
    },
    seats:{
        type:Array,
    }
})

module.exports = mongoose.model("checkoutSchema", checkoutSchema);