const { Schema } = require('mongoose');

module.exports = Schema({
    name: String,
    price: Number,
    processTime: String,
});
