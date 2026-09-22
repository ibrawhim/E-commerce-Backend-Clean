const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const signupSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            default: null
        },
        googleId: {
            type: String,
            unique: true,
            sparse: true
        },
        authProvider: {
            type: String,
            enum: ["local", "google"],
            default: "local"
        },
        phone: {
            type: String,
            default: ""
        },
        bio: {
            type: String,
            maxlength: 500,
            default: ""
        },
        role: {
            type: String,
            enum: ["Customer", "Seller", "Admin"],
            default: "Customer"
        }
    },
    {
        timestamps: true
    }
);

const saltRounds = 10;

signupSchema.pre("save", async function () {
    if (!this.isModified("password") || !this.password) {
        return;
    }

    try {
        const hashedPassword = await bcrypt.hash(
            this.password,
            saltRounds
        );

        this.password = hashedPassword;
    } catch (err) {
        throw err;
    }
});

signupSchema.methods.validatePassword = function (password, callback) {
    if (!this.password) {
        return callback(null, false);
    }

    bcrypt.compare(
        password,
        this.password,
        (err, same) => {
            if (!err) {
                callback(err, same);
            } else {
                callback(err, false);
            }
        }
    );
};

const signupModel = mongoose.model("signup", signupSchema);

module.exports = signupModel;