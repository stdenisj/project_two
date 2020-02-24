let express = require('express');
let cakeRouter = express.Router();

const Cake = require('../models/cake');


cakeRouter.get('/', (req, res) => {
    Cake.find().then( (cakes) => {
        res.render('balloons/balloons', { cakes });
    });
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







module.exports = cakeRouter;