const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const signinSchema = new Schema({
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
});
const signinModel = mongoose.model('signin', signinSchema);

module.exports = signinModel;