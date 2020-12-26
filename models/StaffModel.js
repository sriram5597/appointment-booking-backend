const { Schema, model } = require('mongoose');

const StaffSchema = Schema({
    name: {
        type: String,
    },
    shopId: {
        type: Schema.Types.ObjectId,
        ref: 'shops',
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    available: {
        type: Boolean,
        default: false,
    },
});

module.exports = model('staffs', StaffSchema);
