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

        return res.send({
          status: true,
          message: "Login Successful"
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