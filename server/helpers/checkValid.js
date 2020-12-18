import { check } from 'express-validator';

export const validRegister = [
    check('name', 'Name is required').notEmpty()
        .isLength({
            min: 6,
            max: 32
        }).withMessage('Name must been between 6 and 32 characters'),
    check('email').isEmail().withMessage('Must be a valid email address'),
    check('password', 'Password is required').notEmpty(),
    check('password').isLength({
        min: 6,
        max: 128
    }).withMessage('Password must be at least 6 characters')
];

export const validLogin = [
    check('email').isEmail().withMessage('Must be a valid email address'),
    check('password').isLength({
        min: 6,
        max: 128
    }).withMessage('Password must be at least 6 characters')
];

export const forgotPassword = [
    check('email').isEmail().notEmpty().withMessage('Must be a valid email address')
];

export const resetPassword = [
    check('newPassword').notEmpty().isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];