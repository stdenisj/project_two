const express = require('express');

const Balloon = require('../models/balloon');

const balloonRouter = express.Router();

balloonRouter.get('/', (req, res) => {
    Balloon.find({}).then( (balloons) => {
      res.render('balloons/balloons', { balloons });
    });
});

balloonRouter.get('/new', (req, res) => {
    res.render('balloons/newBalloon');
});

balloonRouter.get('/:id', (req, res) => {
    Balloon.findById(req.params.id).then( (balloon) => {
        res.render('balloons/balloon', { balloon });
    });
});

balloonRouter.post('/', (req, res) => {
    Balloon.create(req.body).then( () => {
        res.redirect('/balloons/');
    });
});


module.exports = balloonRouter;