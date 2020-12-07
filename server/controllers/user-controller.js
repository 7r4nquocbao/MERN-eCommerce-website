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
                error: "clmm"
            })
        }
        user.hashedPassword = undefined;
        user.salt = undefined;
        res.json(user);
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