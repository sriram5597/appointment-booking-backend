const { Schema } = require('mongoose');

module.exports = Schema({
    address: String,
    city: {
        type: Schema.Types.ObjectId,
        ref: 'locations',
    },
});
