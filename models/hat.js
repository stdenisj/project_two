const mongoose = require('../db/connection');
const Schema = mongoose.Schema;

const Hat = new Schema ({
    name: {
        type: String,
        required: true,
    },
    color: String,
    description: String,
    size: {
        type: String,
        enum: ['Small', 'Medium', 'Large'],
        default: 'Medium',
    },
    qty: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
});


module.exports = mongoose.model('Hat', Hat)