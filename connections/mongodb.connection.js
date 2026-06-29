const mongoose = require('mongoose');
const URI = process.env.MONGO_URI;
const signupModel = require('../models/signup.model');
const signinModel = require('../models/signin.model');

mongoose.connect(URI)
    .then(() => {
        console.log('MongoDB Connected');
    })
    .catch((err) => {
        console.log(err);
    });


module.exports = mongoose; 