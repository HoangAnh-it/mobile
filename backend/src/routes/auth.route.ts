import express from 'express';
import * as authController  from '../controllers/auth.controller';

const router = express.Router();

router.route('/login')
    .post(authController.login);

router.route('/signup')
    .post(authController.register);

router.route("/token/:token")
    .get(authController.parseToken)

export default router;
