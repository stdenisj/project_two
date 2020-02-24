let express = require('express');
let cakeRouter = express.Router();

const Cake = require('../models/cake');



cakeRouter.get('/new', (req, res) => {
    res.render('cakes/newCake');
});

cakeRouter.get('/:id', (req, res) => {
    Cake.findById(req.params.id).then( (cake) => {
        res.render('cakes/cake', { cake });
    });
});

cakeRouter.get('/:id/edit', (req, res) => {
    Cake.findById(req.params.id).then( (cake) => {
        res.render('cakes/editCake', { cake });
    })
})

cakeRouter.get('/', (req, res) => {
    Cake.find().then( (cakes) => {
        res.render('cakes/cakes', { cakes });
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


module.exports = cakeRouter;