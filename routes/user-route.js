const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const user = require('../models/user-model');

router.get('/getAllUsers', function (req, res, next) {

    user.find(req.query).then(function (user1) {
        if (user1.length !== 0) {
            res.status(200).json({
                message: 'UserData Fetched Successful',
                data: user1,
                status: 200
            });
        } else {
            res.status(200).json({
                message: 'No Data Found ',
                data: '',
                status: 200
            });
        }
    }).catch(next);

});


router.post('/postUsers', function (req, res, next) {
    user.findOne({ email: req.body.email }).select({ _id: 1 }).lean().then(function (regUser) {
        if (regUser) {
            res.status(409).json({
                message: 'email is already Registered',
                data: '',
                status: 409
            });
        } else {
            if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(req.body.email)) {
                const token = jwt.sign({
                    data: {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email
                    }
                }, 'thisisassignment');
                user.create(req.body).then(function (userReg) {
                    if (userReg) {
                        res.status(200).json({
                            message: 'User Registration Successful',
                            data: userReg,
                            token: token,
                            status: 200
                        });
                    }
                }).catch(next);
            } else {
                res.status(500).json({
                    message: 'Invalid Email',
                    data: '',
                    status: 500
                });
            }
        }
    }).catch(next);

});

module.exports = router;

