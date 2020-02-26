const express = require('express');

const hatRouter = express.Router();

const Hat = require('../models/hat');
const User = require('../models/user')

hatRouter.get('/new', (req, res) => {
    res.render('hats/newHat');
});


hatRouter.get('/:id', (req, res) => {
    Hat.findById(req.params.id).then( (item) => {
        const canBuy = item.qty > 0;
        res.render('homepage/showOne', { item, canBuy });
    });
});


hatRouter.get('/:id/edit', (req, res) => {
    Hat.findById(req.params.id).then( (hat) => {
        res.render('hats/editHat', { hat });
    });
});

hatRouter.get('/', (req, res) => {
    Hat.find().then( (items) => {
        res.render('homepage/index', { items });
    });
});

hatRouter.post('/', (req, res) => {
    Hat.create(req.body).then( () => {
        res.redirect('/hats');
    });
});

hatRouter.put('/:id', (req, res) => {
    Hat.findByIdAndUpdate(req.params.id, req.body).then( (hat) => {
        res.redirect('/hats/' + hat.id);
    });
});

hatRouter.delete('/:id', (req, res) => {
    Hat.findByIdAndRemove(req.params.id).then( () => {
        res.redirect('/hats');
    });
});

hatRouter.put('/:id/buy', (req, res) => {
    let hat = null;
    let user = null;
    Hat.findById(req.params.id).then(foundHat => {
        hat = foundHat;
        hat.qty -= 1;
        return hat.save();
    
    }).then(hat => {
        return User.findOne();
    }).then(foundUser => {
        user = foundUser;
        return Hat.populate(user.shoppingCart, { path: 'hat' });
    
    }).then(() => {
        // Figure out if the donut exists in the shopping cart:
        let newCartItemPrice = null;
        let newCartItem = null;
        // For each cart item:
        for (let cartItem of user.shoppingCart) {
            // If the cart item's donut's ID matches the ID from
            // our request:
            if((cartItem.cake == undefined) && (cartItem.balloon == undefined)){
            let hatId = cartItem.hat.id;
            if (hatId === hat.id) {
                // Remember this item and update it below.
                newCartItem = cartItem;
            }
        }
        }
        // If donut exists in the shopping cart:
        if (newCartItem !== null) {
            // Increase the cart item's quantity by 1
            newCartItem.hatQty += 1;
            newCartItem.hatPrice += newCartItem.hat.price;
            newCartItemPrice += newCartItem.hat.price
            user.cartTotal += newCartItemPrice;
        } else {
            // Otherwise: create a new cart item with quantity 1
            user.cartTotal += hat.price;
            user.shoppingCart.push({
                hat: hat.id,
                hatQty: 1,
                hatPrice: hat.price
            });
        }
        return user.save();
    
    }).then(() => {
        res.redirect('/hats/' + hat.id);
    }).catch(e => {
        console.log(e);
    });
});



module.exports = hatRouter;