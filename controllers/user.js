const express = require('express');
const userRouter = express.Router();

const Balloon = require('../models/balloon')
const Cake = require('../models/cake')
const Hat = require('../models/hat');
const User = require('../models/user');

userRouter.get('/new', (req, res) => {
    res.render('users/newUser')
})

userRouter.get('/:id/edit', (req, res) => {
    User.findById(req.params.id).then( (user) => {
        res.render('users/login', { user });
    }).catch( (e) => {
        console.log(e);
    });
});


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


userRouter.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body).then( (user) => {
        res.redirect('/user/' + user.id);
    });
});


userRouter.delete('/', (req, res) => {
    User.findOneAndDelete().then( () => {
        res.redirect('/')
    })
})

module.exports = userRouter;