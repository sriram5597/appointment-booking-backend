const { model, Schema } = require('mongoose');

const Service = require('./ServiceSchema');

const BookingSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    shopId: {
        type: Schema.Types.ObjectId,
        ref: 'shops',
        required: true,
    },
    bookingDate: {
        type: Date,
        required: true,
    },
    bookingTime: {
        type: String,
        required: true,
    },
    staffPreference: {
        type: Schema.Types.ObjectId,
        ref: 'staffs',
    },
    services: [Service],
    billAmt: Number,
});

module.exports = model('bookings', BookingSchema);
