const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const signupSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    lastname: {
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
const signupModel = mongoose.model('signup', signupSchema);

module.exports = signupModel;