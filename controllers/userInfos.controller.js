const signupModel = require('../models/signup.model');


const signupController = (req, res) => {
    let form = new signupModel(req.body);
    form.save()
        .then(data => {
            console.log(data);
                res.json({message:"Signup Successful", data});
            })
        .catch(err => {
                res.json(err);
                console.log(err);
            });
};

const signinController = (req, res) => {
    signinModel.findOne({email: req.body.email, password: req.body.password})
        .then(data => {
            if(data) {
                res.json({message: "Signin Successful", data});
            } else {
                res.json({message: "Signin Failed"});
            }
        })
        .catch(err => {
            res.json(err);
            console.log(err);
        });
};

module.exports = {
    signupController,
    signinController,
};