const encryption = require('../utilities/encryption')
const User = require('mongoose').model('User')
const notificationController = require('./notification-controller')
const jwt = require('jsonwebtoken');

module.exports = {
    registerGet: (req, res) => {
        res.render('users/register')
    },
    registerPost: (req, res, next) => {
        let reqUser = req.body;
        let errors = [];

        if (reqUser.password !== reqUser.repeatPassword) {
            errors.push("Passwords must match!");
        }
        if (!reqUser.username || !reqUser.password) {
            errors.push("Username and password are required!");
        }
        if(reqUser.studentClass < 0 || reqUser.studentClass > 12){
            errors.push("The class should be between 1 and 12!");
        }
        if(reqUser.numberInClass < 0 || reqUser.numberInClass > 26){
            errors.push("The number in class should be between 1 and 26!");
        }
        if(!reqUser.firstName || !reqUser.lastName){
            errors.push("First name and last name are required!");
        }

        if (errors.length > 0) {
            res.status(422).json({
                message: 'Validation failed, entered data is incorrect',
                errors: errors
            });
            return;
        }

        let salt = encryption.generateSalt()
        let hashedPassword = encryption.generateHashedPassword(salt, reqUser.password)

        User.create({
            username: reqUser.username,
            salt: salt,
            hashedPass: hashedPassword,
            firstName: reqUser.firstName,
            lastName: reqUser.lastName,
            class: reqUser.studentClass,
            numberInClass: reqUser.numberInClass
        }).then(user => {
            let userId = user._id;
            let username = user.username;
            req.logIn(user, (err, resultUser) => {
                if (err) {
                    if (!err.statusCode) {
                        err.statusCode = 500;
                    }
                    next(err);
                }
            })

            res.status(201)
                .json({message: 'User created!', userId: userId, username: username});

        }).catch(error => {
            errors.push("This username is already taken!");
            res.status(422).json({
                message: 'This username is already taken!',
                errors
            });
        })
    },

    loginGet: (req, res) => {
        res.render('users/login')
    },

    loginPost: (req, res) => {
        let reqUser = req.body
        let errors = [];
        User.findOne({username: reqUser.username}).then(user => {
            if (!user) {
                errors.push('A user with this username could not be found');
            }

            if (user && !user.authenticate(reqUser.password)) {
                errors.push('Username or password are not correct!')
            }

            if (errors.length > 0) {
                res.status(401).json({
                    message: 'Username or password are not correct!',
                    errors: errors
                });
                return;
            }

            req.logIn(user, (err, resultUser) => {
                if (err) {
                    if (!error.statusCode) {
                        error.statusCode = 500;
                    }
                    next(error);
                }
            });

            const token = jwt.sign({
                    username: user.username,
                    userId: user._id.toString()
                },
                'somesupersecret',
                {expiresIn: '1h'});

            res.status(200).json(
                {
                    message: 'User successfully logged in!',
                    token,
                    userId: user._id.toString(),
                    username: user.username,
                    isAdmin: user.roles.indexOf('Admin') !== -1
                });
        })

        //notificationController.addUserNotification(reqUser)
    },
    logout: (req, res) => {
        req.logout()
        res.status(200).json({
            message: 'User successfully logged out!'
        })
    }
}
