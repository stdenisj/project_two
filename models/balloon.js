const mongoose = require('mongoose');
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
    qty: Number,
    img: {
        type: String,
        required: true,
        default: '',
    }
});

module.exports = mongoose.model('Balloon', Balloon);