const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    verified: {
        type: Boolean,
        default: false,
    },
    password: String,
    passwordReset: {
        type: Boolean,
        default: false,
    },
    address: String,
    city: String,
    role: {
        type: String,
        default: 'USER',
    },
});

module.exports = model('users', userSchema);
