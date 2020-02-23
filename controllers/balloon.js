const express = require('express');

const Balloon = require('../models/balloon');

const balloonRouter = express.Router();

balloonRouter.get('/', (req, res) => {
    Balloon.find().then( (balloons) => {
      res.render('balloons/balloons', { balloons });
    });
});

balloonRouter.get('/new', (req, res) => {
    // res.render('');                          Create new balloon form
});

balloonRouter.get('/:id', (req, res) => {
    Balloon.findById(req.params.id).then( (balloon) => {
        //res.render('', { balloon });           Create Show page
    });
});

balloonRouter.post('/', (req, res) => {
    Balloon.create(req.body).then( () => {
        res.redirect('/balloons');
    });
});


module.exports = balloonRouter;