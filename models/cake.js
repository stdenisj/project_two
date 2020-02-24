const mongoose = require('../db/connection');
const Schema = mongoose.Schema;

const Cake = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    isVegan: {
        type: String,
        default: 'No',
        enum: ['Yes', 'No']
    },
    img: {
        type: String,
        //TODO default image for cake
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