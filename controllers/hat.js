
//= =====================
//  REQUIRED
//= =====================
// These are the required items stored as variables.

const express = require('express');
const hatRouter = express.Router();
const Hat = require('../models/hat');
const User = require('../models/user')

// GET REQUESTS //

//= =====================
//  NEW FORM
//= =====================
// This route renders the form to add a new balloon to the database.

hatRouter.get('/new', (req, res) => {
    res.render('hats/newHat');
});

//= =====================
//  SHOW SINGLE ITEM
//= =====================
// This route checks to see if there is a user stored in the database.
// if there there is it stores the user as a variable. Then it finds
// the item based on the id provided in the url. Next it checks to
// see it the item qty is greater than 0. If it is then it assigns
// a variable called canBuy. Lastly the page showOne view is rendered
// and the item, user and canBuy variables are passed into the page.

hatRouter.get('/:id', (req, res) => {
    let user = null;
    User.findOne().then( (foundUser) => {
        user = foundUser;
        return Hat.findById(req.params.id).then( (item) => {
        const canBuy = item.qty > 0;
        res.render('homepage/showOne', { item, canBuy, user });
    });
});
});

//= =====================
//  EDIT SINGLE ITEM
//= =====================
// This page checks the database to find a balloon based on the id.
// then it renders the editBalloon view and passes the found balloon
// into the page.

hatRouter.get('/:id/edit', (req, res) => {
    Hat.findById(req.params.id).then( (hat) => {
        res.render('hats/editHat', { hat });
    });
});

//= =====================
//  SHOW INDEX
//= =====================
// This page checks the database and gathers entries in the balloon collection.
//  Then it renders the index view and passes the found collection entries into it.

hatRouter.get('/', (req, res) => {
    Hat.find().then( (items) => {
        res.render('homepage/index', { items });
    });
});

// POST REQUESTS //

//= =====================
//  CREATE ITEM
//= =====================
//  This is the POST request, it takes the information form the form rendered in the
//  NEW FORM path and stores it in the associated collection in the database. Then it
//  redirects back to the SHOW INDEX page.

hatRouter.post('/', (req, res) => {
    Hat.create(req.body).then( () => {
        res.redirect('/hats');
    });
});

//= =====================
//  EDIT ITEM
//= =====================
// This is the PUT request for when an item is edited. First it finds the item from the id
// provided in the url. The it updates the item with the form entered in the EDIT SINGLE ITEM
// path. When it is done it will redirect back to the item SHOW SINGLE ITEM page.

hatRouter.put('/:id', (req, res) => {
    Hat.findByIdAndUpdate(req.params.id, req.body).then( (hat) => {
        res.redirect('/hats/' + hat.id);
    });
});

//= =====================
//  DELETE SINGLE ITEM
//= =====================
// This is the DELETE request for one item. First it finds the item in the database
// using the url provided item id. When it finds the item it deletes it and then redirects
// back to the SHOW INDEX page.

hatRouter.delete('/:id', (req, res) => {
    Hat.findByIdAndRemove(req.params.id).then( () => {
        res.redirect('/hats');
    });
});

//= =====================
//  BUY SINGLE ITEM
//= =====================

// This is the PUT request for buying a single Item. First if declares two variables to store
// information. Then it finds the item in the database using the id from the url. When it finds
// the item it stores it in first of the variables(declared earlier). Then it subtracts one from
// the quantity and saves the item object. Next the user is found from the database. This user
// is stored as the second of the variables(declared earlier). Then we populate the user's 
// shoppingCart with the item database.
//
// Next we declare a variable for the item that will be added to the shopping cart and a variable to
// store the price of that item. Then we loop through the user's shopping cart to if if the item is
// already in the cart. Then we check to see if the item is in the one of the other database collections.
// If the item is not from a different database collection, we save the item id and check to see if it matches
// any other items in our cart, if it matches then we save the existing cart item to be updated(as a prior defined
// variable)

// Lastly if the item was already in the cart we update the quantity of items in the cart. Update the total price
// of those items, and update the total price of the shopping cart. If the item was not in the cart then it adds
// the new item to the shopping cart, it accomplishes this adding the information stored for the item into the
// shopping cart schema and pushing the new schema object into the shopping cart array. Then it saves the user.
// Lastly it redirects back to the page with the new updated information

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

//= =====================
//  Export Router
//= =====================
// This exports all the routes to be used in other modules.

module.exports = hatRouter;