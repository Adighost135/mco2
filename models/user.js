const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }, 
    userphoto: {
        type: String,
        required: true
    },
    isOwner: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;