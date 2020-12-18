import express from 'express';

import { registerTask, activationTask, loginTask, resetPasswordTask, resetPasswordRequest, facebookLoginTask } from '../controllers/auth-controller.js'
import { validLogin, forgotPassword, resetPassword, validRegister } from '../helpers/checkValid.js'

const router = express.Router();

router.post('/register', validRegister, registerTask);
router.post('/activation', activationTask);
router.post('/login', validLogin, loginTask);
router.post('/login', validLogin, loginTask);

router.put('/forgotpassword', forgotPassword, resetPasswordRequest);
router.put('/resetpassword', resetPassword, resetPasswordTask);

router.post('/facebook-login', facebookLoginTask)

export default router;