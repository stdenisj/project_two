const express = require('express');
const userRouter = express.Router();

const Balloon = require('../models/balloon')
const Cake = require('../models/cake')
const Hat = require('../models/hat');
const User = require('../models/user');

userRouter.get('/new', (req, res) => {
    res.render('users/newUser')
})

userRouter.get('/', (req, res) => {
    let user = null;
    User.findOne().then(foundUser => {
        user = foundUser;
        return Balloon.populate(user.shoppingCart, { path: 'balloon' });
    }).then( () => {
        return Cake.populate(user.shoppingCart, { path: 'cake' });
    }).then( () => {
        return Hat.populate(user.shoppingCart, { path: 'hat' });
    }).then( () => {
        res.render('users/showUser', { user });
    }).catch( e => {
        res.redirect('user/new')
    })
});


userRouter.post('/', (req, res) => {
    User.create(req.body).then( () => {
        res.redirect('/user')
    })
})

module.exports = userRouter;