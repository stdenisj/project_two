const express = require('express');

const Balloon = require('../models/balloon');

const balloonRouter = express.Router();

balloonRouter.get('/', (req, res) => {
    Balloon.find().then( (balloons) => {
      res.render('balloons/balloons', { balloons });
    }).catch( (e) => {
        console.log(e);
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
        res.redirect('/balloons');
    });
});

balloonRouter.get('/:id/edit', (req, res) => {
    Balloon.findById(req.params.id).then( (balloon) => {
        res.render('balloons/editBalloon', { balloon});
    });
});

balloonRouter.put('/:id', (req, res) => {
    Balloon.findByIdAndUpdate(req.params.id, req.body).then( (balloon) => {
        res.redirect('/' + balloon.id);
    });
});


module.exports = balloonRouter;