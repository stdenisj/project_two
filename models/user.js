const mongoose = require('../db/connection');
const Schema = mongoose.Schema;

const CartItem = new Schema ({
    balloon: {
            type: Schema.Types.ObjectId,
            ref: 'Balloon',
        },
    balQty: Number,
    balPrice: Number,
    balloonImg: String,
    
    cake: {
        type: Schema.Types.ObjectId,
        ref: 'Cake',
    },
    cakeQty: Number,
    cakePrice: Number,
    cakeImg: String,
    
    hat: {
        type: Schema.Types.ObjectId,
        ref: 'Hat',
    },
    hatQty: Number,
    hatPrice: Number,
    hatImg: String,
});

const User = new Schema ({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: Boolean,
    cartTotal: {
        type: Number,
        default: 0,
    },
    shoppingCart: [CartItem],
}, {
    // https://medium.com/@stefanledin/how-to-solve-the-unknown-modifier-pushall-error-in-mongoose-d631489f85c0
    usePushEach: true,
});

module.exports = mongoose.model('User', User);