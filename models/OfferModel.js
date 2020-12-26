const { Schema, model } = require('mongoose');

const OfferSchema = Schema({
    offer: Number,
    promoCode: {
        type: String,
        unique: true,
        required: true,
    },
    shopId: {
        type: Schema.Types.ObjectId,
        ref: 'shops',
    },
    expireDate: Date,
    services: {
        type: Schema.Types.Array,
    },
});

module.exports = model('offers', OfferSchema);
