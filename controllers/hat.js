const express = require('express');

const hatRouter = express.Router();

const Hat = require('../models/hat');

hatRouter.get('/new', (req, res) => {
    res.render('hats/newHat');
});


hatRouter.get('/:id', (req, res) => {
    Hat.findById(req.params.id).then( (hat) => {
        res.resnder('hats/hat', { hat });
    });
});


hatRouter.get('/:id/edit', (req, res) => {
    Hat.findById(req.params.id).then( (hat) => {
        res.render('hats/editHat', { hat });
    });
});

hatRouter.get('/', (req, res) => {
    Hat.find().then( (hats) => {
        res.render('hats/hats', { hats });
    });
});

hatRouter.post('/', (req, res) => {
    Hat.create(req.body).then( () => {
        res.redirect('/hats');
    });
});

hatRouter.put('/:id', (req, res) => {
    Hat.findByIdAndUpdate(req.params.id, req.body).then( (hat) => {
        res.redirect('/hats/' + hat.id);
    });
});

hatRouter.delete('/:id', (req, res) => {
    Hat.findByIdAndRemove(req.params.body).then( () => {
        res.redirect('/hats');
    });
});


module.exports = hatRouter;