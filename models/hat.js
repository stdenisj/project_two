const mongoose = require('../db/connection');
const Schema = mongoose.Schema;

const Hat = new Schema ({
    category: {
        type: String,
        required: true,
        default: 'hat',
    },
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
    },
    img: {
        type: String,
        default: "http://placehold.it/300x250&text=Hats",
    }
});


module.exports = mongoose.model('Hat', Hat)