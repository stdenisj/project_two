const mongoose = require('../db/connection');
const Schema = mongoose.Schema;


const Balloon = new Schema({
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    qty: {
        type: Number,
        required: true,
    },
    img: {
        type: String,
        default: 'http://placehold.it/300x250&text=Ad',
    }
});

module.exports = mongoose.model('Balloon', Balloon);