const signupModel = require('../models/signup.model');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config({quiet: true});

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
const { email, password } = req.body;
  signupModel.findOne({email})
  .then(user => {
      if (!user) {
        return res.send({
          status: false,
          message: "Email not found"
        });
      }
      user.validatePassword(password, (err, same) => {
        if (err) {
          return res.status(500).send(err);
        }
        
        if (!same) {
          return res.send({
            status: false,
            message: "Invalid Password"
          });
        }    
        let secret = process.env.SECRET;
        const userData = user.toObject(); 
        delete userData.password;         
        let token = jwt.sign({email},secret,{expiresIn: '24h'})
        console.log(token)
        return res.send({
          status: true,
          message: "Login Successful",
          data: userData,  
          token: token
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

module.exports = {
    signupController,
    signinController,
};