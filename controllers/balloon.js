const express = require('express');

const Balloon = require('../models/balloon');

const balloonRouter = express.Router();

balloonRouter.get('/', (req, res) => {
    Balloon.find().then( (balloons) => {
//      res.render('', { balloons });             Create Index route
    });
});

balloonRouter.get('/:id', (req, res) => {
    Balloon.findById(req.params.id).then( (balloon) => {
        //res.render('', { balloon });           Create Show page
    });
});