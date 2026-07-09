const signupModel = require('../models/signup.model');
const jwt = require('jsonwebtoken');
const env = require('dotenv')

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
      let secret = process.env.SECRET;
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
        const userData = user.toObject(); 
        delete userData.password;         
        
        return res.send({
          status: true,
          message: "Login Successful",
          data: user
        });
        let token = jwt.sign({payload},secret,{expiresIn: '24h'})
        console.log(token)
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