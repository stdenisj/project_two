let express = require('express');

let balloonRouter = express.Router();

const Balloon = require('../models/balloon');
const User = require('../models/user')

balloonRouter.get('/new', (req, res) => {
    res.render('balloons/newBalloon');
});

balloonRouter.get('/:id', (req, res) => {
    Balloon.findById(req.params.id).then( (item) => {
        const canBuy = item.qty > 0;
        res.render('homepage/showOne', { item, canBuy });
    }).catch( (e) => {
        console.log(e);
    });
});

balloonRouter.get('/:id/edit', (req, res) => {
    Balloon.findById(req.params.id).then( (balloon) => {
        res.render('balloons/editBalloon', { balloon});
    }).catch( (e) => {
        console.log(e);
    });
});

balloonRouter.get('/', (req, res) => {
     Balloon.find().then( (items) => {
      res.render('homepage/index', { items });
   }).catch( (e) => {
        console.log(e);
     });
});

balloonRouter.post('/', (req, res) => {
    Balloon.create(req.body).then( () => {
        res.redirect('/balloons');
    });
});

balloonRouter.put('/:id', (req, res) => {
    Balloon.findByIdAndUpdate(req.params.id, req.body).then( (balloon) => {
        res.redirect('/balloons/' + balloon.id);
    });
});

balloonRouter.delete('/:id', (req, res) => {
    Balloon.findByIdAndRemove(req.params.id).then( () => {
        res.redirect('/balloons');
    });
});

balloonRouter.put('/:id/buy', (req, res) => {
    let balloon = null;
    let user = null;
    Balloon.findById(req.params.id).then(foundBalloon => {
        balloon = foundBalloon;
        balloon.qty -= 1;
        return balloon.save();
    
    }).then(balloon => {
        return User.findOne();
    }).then(foundUser => {
        user = foundUser;
        return Balloon.populate(user.shoppingCart, { path: 'balloon' });
    
    }).then(() => {
        // Figure out if the donut exists in the shopping cart:
        let newCartItemPrice = null;
        let newCartItem = null;
        // For each cart item:
        for (let cartItem of user.shoppingCart) {
            // If the cart item's donut's ID matches the ID from
            // our request:
            if((cartItem.cake == undefined) && (cartItem.hat == undefined)){
            let balloonId = cartItem.balloon.id;
            if (balloonId === balloon.id) {
                // Remember this item and update it below.
                newCartItem = cartItem;
            }
        }
        }
        // If donut exists in the shopping cart:
        if (newCartItem !== null) {
            // Increase the cart item's quantity by 1
            newCartItem.balQty += 1;
            newCartItem.balPrice += newCartItem.balloon.price;
            newCartItemPrice += newCartItem.balloon.price
            user.cartTotal += newCartItemPrice;

        } else {
            // Otherwise: create a new cart item with quantity 1
            user.cartTotal += balloon.price;
            user.shoppingCart.push({
                balloon: balloon.id,
                balQty: 1,
                balPrice: balloon.price
            });
        }
        return user.save();
    
    }).then(() => {
        res.redirect('/balloons/' + balloon.id);
    }).catch(e => {
        console.log(e);
    });
});







module.exports = balloonRouter;