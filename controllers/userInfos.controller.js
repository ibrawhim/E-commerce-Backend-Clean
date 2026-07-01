const signupModel = require('../models/signup.model');
const signinModel = require('../models/signin.model');

const signupController = (req, res) => {
    let form = new signupModel(req.body);
    form.save((err, data) => {
        if (err) {
            console.log(err);
            res.status(400).json({ message: 'Something went wrong' });
        } else {
            res.status(201).json({ message: 'Signup successful', data });
        }
    });
};

const signinController = (req, res) => {
    console.log(req.body);
};

module.exports = {
    signupController,
    signinController,
};