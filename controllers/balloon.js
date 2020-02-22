const express = require('express');

const Balloon = require('../models/balloon');

const balloonRouter = express.Router();

balloonRouter.get('/', (req, res) => {
    Balloon.find().then( (balloons) => {
        res.render('', { balloons });
    });
});