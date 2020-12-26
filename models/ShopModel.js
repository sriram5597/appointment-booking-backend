const { model, Schema } = require('mongoose');

// schema
const Service = require('./ServiceSchema');
const Branch = require('./BranchSchema');

const shopSchema = Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },

    city: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'locations',
    },
    shopOwnerId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users',
    },
    ratings: {
        type: Schema.Types.Number,
        default: 0,
    },
    openTime: {
        type: String,
        required: true,
    },
    closeTime: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    services: [Service],
    branches: [Branch],
});

module.exports = model('shops', shopSchema);
