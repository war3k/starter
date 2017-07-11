const config = require('./../config.json');
const express = require('express');
const router = express.Router();
const userService = require('./../services/user.service');

// routes
router.post('/users/authenticate', authenticate);
router.post('/users/register', register);
router.get('/users', getAll);
router.get('/users/:id', getById);
router.get('/users/current', getCurrent);
router.put('/users/:id', update);
router.delete('/users/:id', _delete);

module.exports = router;

function authenticate(req, res) {
    userService.authenticate(req.body.username, req.body.password)
        .then(function(user) {
            res.send(user);
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
}

function register(req, res) {
    userService.create(req.body)
        .then(function() {
            res.sendStatus(200);
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
}

function getAll(req, res) {
    userService.getAll()
        .then(function(users) {
            res.send(users);
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
}

function getById(req, res) {
    userService.getById(req.params.id)
        .then(function(user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
}

function getCurrent(req, res) {
    userService.getById(req.user.sub)
        .then(function(user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
    userService.update(req.params.id, req.body)
        .then(function() {
            res.sendStatus(200);
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    userService.delete(req.params.id)
        .then(function() {
            res.sendStatus(200);
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
}