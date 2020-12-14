import User from '../models/auth-model.js';
import expressJwt from 'express-jwt';

export const readUserTask = (req, res) => {
    const userId = req.params.id;
    User.findById(userId).exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: err
            })
        }
        user.hashedPassword = undefined;
        user.salt = undefined;
        res.json(user);
    })
}

export const listUser = (req, res) => {
    User.find().exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: err
            })
        }
        user.hashedPassword = undefined;
        user.salt = undefined;
        res.json(user);
    })
}

export const updateUserTask = (req, res) => {
    const newUser = req.body;
    User.findByIdAndUpdate(newUser._id, newUser, {new: true}).exec((err, data) => {
        if(err || !data) {
            res.json(err);
        } else {
            res.json(data);
        }
    })
}

export const viewUser = (req, res) => {
    const {id} = req.params;
    User.findById(id).exec((err, data) => {
        if(err || !data) {
            res.json(err)
        } else {
            res.json(data);
        }
    }) 
}

export const setAdmin = (req, res) => {
    const {id} = req.params;
    User.findById(id).exec((err, data) => {
        if(err || !data) {
            res.json(err)
        } else {
            const dataUpdated = {...data._doc, role: 'admin'};
            User.findByIdAndUpdate(id, dataUpdated, {new: true}).exec((err2, data2) => {
                if(err2 || !data2) {
                    res.json(err2);
                } else {
                    res.json(dataUpdated);
                }
            })
        }
    })
}

export const requireSignIn = expressJwt({
    secret: process.env.JWT_SECRET, algorithms: ['HS256']
})

export const adminMiddleware = (req, res, next) => {
    User.findById({
        _id: req.user._id
    }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
            error: 'User not found'
            });
        }

        if (user.role !== 'admin') {
            return res.status(400).json({
            error: 'Admin resource. Access denied.'
            });
        }

        req.profile = user;
        next();
    });
}