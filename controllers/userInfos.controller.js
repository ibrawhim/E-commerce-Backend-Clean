const signupModel = require('../models/signup.model');
const signinModel = require('../models/signin.model');

const signupController = (req, res) => {
    console.log(req.body);
};

const signinController = (req, res) => {
    console.log(req.body);
};

module.exports = {
    signupController,
    signinController,
};