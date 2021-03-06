﻿const config = require('./../config.json');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Q = require('q');
const mongo = require('mongoskin');
const db = mongo.db(config.connectionString, { native_parser: true });
db.bind('users');

const service = {};

service.authenticate = authenticate;
service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;

function authenticate(username, password) {
    const deferred = Q.defer();

    db.users.findOne({ username: username }, function(err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user && bcrypt.compareSync(password, user.hashedPassword)) {
            // authentication successful
            deferred.resolve({
                _id: user._id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: jwt.sign({ sub: user._id }, config.secret),
                isAdmin: user.isAdmin ? user.isAdmin : false
            });
        } else if (!user) {
            // cannot find user
            deferred.reject('Nie ma takiego użytkownika!');
        } else {
            //authentication failed
            deffered.reject('Login lub hasło jest niepoprawne!')
        }
    });

    return deferred.promise;
}

function getAll() {
    const deferred = Q.defer();

    db.users.find().toArray(function(err, users) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // // return users (without hashed passwords)
        // users = _.map(users, function(user) {
        //     return _.omit(user, 'hash');
        // });

        deferred.resolve(users);
    });

    return deferred.promise;
}

function getById(_id) {
    const deferred = Q.defer();

    db.users.findById(_id, function(err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user) {
            // return user (without hashed password)
            // deferred.resolve(_.omit(user, 'hash'));
            deferred.resolve(user);
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function create(userParam) {
    const deferred = Q.defer();

    // validation
    db.users.findOne({ username: userParam.username },
        function(err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (user) {
                // username already exists
                deferred.reject('Login "' + userParam.username + '" już istnieje!');
            } else {
                createUser();
            }
        });

    function createUser() {
        // set user object to userParam without the cleartext password
        var user = _.omit(userParam, 'password');

        // add hashed password to user object
        user.hashedPassword = bcrypt.hashSync(userParam.password, 10);

        db.users.insert(
            user,
            function(err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function update(_id, userParam) {
    const deferred = Q.defer();

    // validation
    db.users.findById(_id, function(err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user.username !== userParam.username) {
            // username has changed so check if the new username is already taken
            db.users.findOne({ username: userParam.username },
                function(err, user) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (user) {
                        // username already exists
                        deferred.reject('Login "' + req.body.username + '" już istnieje!')
                    } else {
                        updateUser();
                    }
                });
        } else {
            updateUser();
        }
    });

    function updateUser() {
        const set = {
            firstName: userParam.firstName,
            lastName: userParam.lastName,
            username: userParam.username,
        };

        if (userParam.password) {
            set.hashedPassword = bcrypt.hashSync(userParam.password, 10);
        }
        db.users.update({ _id: mongo.helper.toObjectID(_id) }, { $set: set },
            function(err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function _delete(_id) {
    const deferred = Q.defer();

    db.users.remove({ _id: mongo.helper.toObjectID(_id) },
        function(err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}