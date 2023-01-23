const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const UserModel = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    password: { type: String, required: true }
});

// Apply the uniqueValidator plugin to the user model
UserModel.plugin(uniqueValidator);

UserModel.pre("save", async function (next) {
    const user = this;

    if (user.isModified("password") || user.isNew) {
        const hash = await bcrypt.hash(this.password, 10);

        this.password = hash;
    } else {
        return next();
    }
});

const User = mongoose.model("Users", UserModel);

module.exports = User;
