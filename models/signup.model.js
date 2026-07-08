const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const signupSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
});


const saltRounds = 10;
signupSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
  try {
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = hashedPassword;
  } catch (err) {
    throw err;
  }
});

signupSchema.methods.validatePassword = function (password, callback) {
    bcrypt.compare(password, this.password,(err,same)=>{
        if(!err){
            callback(err,same);
    }else {
      next()
    }
});
};

const signupModel = mongoose.model('signup', signupSchema);

module.exports = signupModel;