let express = require('express');

let balloonRouter = express.Router();

const Balloon = require('../models/balloon');

balloonRouter.get('/new', (req, res) => {
    res.render('balloons/newBalloon');
});

balloonRouter.get('/:id', (req, res) => {
    Balloon.findById(req.params.id).then( (balloon) => {
        res.render('balloons/balloon', { balloon });
    }).catch( (e) => {
        console.log(e);
    });
});

balloonRouter.get('/:id/edit', (req, res) => {
    Balloon.findById(req.params.id).then( (balloon) => {
        res.render('balloons/editBalloon', { balloon});
    }).catch( (e) => {
        console.log(e);
    });
});

balloonRouter.get('/', (req, res) => {
     Balloon.find().then( (items) => {
      res.render('homepage/index', { items });
   }).catch( (e) => {
        console.log(e);
     });
});

balloonRouter.post('/', (req, res) => {
    Balloon.create(req.body).then( () => {
        res.redirect('/balloons');
    });
});

balloonRouter.put('/:id', (req, res) => {
    Balloon.findByIdAndUpdate(req.params.id, req.body).then( (balloon) => {
        res.redirect('/balloons/' + balloon.id);
    });
});

balloonRouter.delete('/:id', (req, res) => {
    Balloon.findByIdAndRemove(req.params.id).then( () => {
        res.redirect('/balloons');
    });
});

module.exports = balloonRouter;