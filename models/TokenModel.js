const Mongoose = require('mongoose');

const TokenSchema = Mongoose.Schema({
    userId: {
        type: Mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users',
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Number,
        default: Date.now(),
    },
    expiresIn: {
        type: Number,
        default: 43200,
    },
});

module.exports = Mongoose.model('tokens', TokenSchema);
