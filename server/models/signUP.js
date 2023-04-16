const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
});
signUpSchema.methods.generateAuthToken = async function () {
    try {
        console.log(this._id);
        const token = jwt.sign({ _id: this._id.toString() }, "thequickbrownfoxjumpsoverthelazydog");
        this.tokens=this.tokens.concat({token:token})
        await this.save();
        return token;
        // this.tokens = this.tokens.concat({ token: token });
    } 
    catch (err) {
        res.send("the error part" + err);
        console.log("the error part" + err);
    }
}

signUpSchema.pre("save", async function (next) {
    if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});
module.exports = mongoose.model("signUP", signUpSchema);
