let express = require('express');
let cakeRouter = express.Router();

const Cake = require('../models/cake');
const User = require('../models/user');



cakeRouter.get('/new', (req, res) => {
    res.render('cakes/newCake');
});

cakeRouter.get('/:id', (req, res) => {
    let user = null;
    User.findOne().then( (foundUser) => {
        user = foundUser;
    Cake.findById(req.params.id).then( (item) => {
        const canBuy = item.qty > 0;
        res.render('homepage/showOne', { item, canBuy, user });
    });
});
});

cakeRouter.get('/:id/edit', (req, res) => {
    Cake.findById(req.params.id).then( (cake) => {
        res.render('cakes/editCake', { cake });
    })
})

cakeRouter.get('/', (req, res) => {
    Cake.find().then( (items) => {
        res.render('homepage/index', { items });
    });
});

cakeRouter.post('/', (req, res) => {
    Cake.create(req.body).then( () => {
        res.redirect('/cakes');
    });
});

cakeRouter.put('/:id', (req, res) => {
    Cake.findByIdAndUpdate(req.params.id, req.body).then( (cake) => {
        res.redirect('/cakes/' + cake.id);
    });
});

cakeRouter.delete('/:id', (req, res) => {
    Cake.findByIdAndRemove(req.params.id).then( () => {
        res.redirect('/cakes');
    });
});


cakeRouter.put('/:id/buy', (req, res) => {
    let cake = null;
    let user = null;
    Cake.findById(req.params.id).then(foundCake => {
        cake = foundCake;
        cake.qty -= 1;
        return cake.save();
    
    }).then(cake => {
        return User.findOne();
    }).then(foundUser => {
        user = foundUser;
        return Cake.populate(user.shoppingCart, { path: 'cake' });
    
    }).then(() => {
        // Figure out if the donut exists in the shopping cart:

        let newCartItemPrice = null;
        let newCartItem = null;
        // For each cart item:
        for (let cartItem of user.shoppingCart) {
            // If the cart item's donut's ID matches the ID from
            // our request:
            if((cartItem.hat == undefined) && (cartItem.balloon == undefined)) {
            let cakeId = cartItem.cake.id;
            if (cakeId === cake.id) {
                // Remember this item and update it below.
                newCartItem = cartItem;
            }
        }
        }
        // If donut exists in the shopping cart:
        if (newCartItem !== null) {
            // Increase the cart item's quantity by 1
            newCartItem.cakeQty += 1;
            newCartItem.cakePrice += newCartItem.cake.price;
            newCartItemPrice += newCartItem.cake.price
            user.cartTotal += newCartItemPrice;

        } else {
            // Otherwise: create a new cart item with quantity 1
            user.cartTotal += cake.price;
            user.shoppingCart.push({
                cake: cake.id,
                cakeQty: 1,
                cakePrice: cake.price
            });
            
        }

        return user.save();
    
    }).then(() => {
        res.redirect('/cakes/' + cake.id);
    }).catch(e => {
        console.log(e);
    });
});

module.exports = cakeRouter;