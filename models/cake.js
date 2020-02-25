const mongoose = require('../db/connection');
const Schema = mongoose.Schema;

const Cake = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    isVegan: Boolean,
    img: {
        type: String,
        default: 'http://placehold.it/300x250&text=Ad',
    },
    price: {
        type: Number,
        required: true,
    },
    qty: {
        type: Number,
        required: true,
    },
});


module.exports = mongoose.model('Cake', Cake);