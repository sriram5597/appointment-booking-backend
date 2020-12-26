const { model, Schema } = require('mongoose');

const LocationSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
});

module.exports = model('locations', LocationSchema);
