const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
//User Database Schema {firstName, lastName,userName, password, email, profilePic};

//Passport-Local Mongoose will add a username,
//hash and salt field to store the username, 
//the hashed password and the salt value.

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        uniqu: true,
        required: true,
    },
    profilePic: {
        type: String,
        default: '/images/profilePic.jpg',
    }
});

//Plugin Schema to passport-local-mongoose
userSchema.plugin(passportLocalMongoose);

//Model: User
//Schema: userSchema
const User = mongoose.model("User", userSchema);

module.exports = User;