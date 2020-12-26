const Mongoose = require('mongoose');

const AdminSchema = Mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
});

module.exports = Mongoose.model('admin', AdminSchema);
