const signupModel = require('../models/signup.model');
const signinModel = require('../models/signin.model');

const signupController = (req, res) => {
    let form = new signupModel(req.body);
    form.save()
        .then((data) => {
            res.json({message: 'Signup Successful', data});
        })
        .catch((err) => {
            res.json(err);
        });
};

const signinController = (req, res) => {
    console.log(req.body);
};

module.exports = {
    signupController,
    signinController,
};