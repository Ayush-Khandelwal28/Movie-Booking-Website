const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
console.log("Hello");
const signUpSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (v) => {
                return /\S+@\S+\.\S+/.test(v);
            },
            message: (props) => `${props.value} is not a valid email address!`,
        },
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});
signUpSchema.pre("save", async function (next) {
    if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});
module.exports = mongoose.model("signUP", signUpSchema);
