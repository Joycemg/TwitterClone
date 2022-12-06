import { Router } from 'express';
import passport from 'passport';
import { signIn, logIn, SeeMyUser } from '../controllers/auth.controller.js';
passport;

const router = Router();

router.post('/register', signIn);
router.post('/login', logIn);
router.get('/user', passport.authenticate('jwt', { session: false }), SeeMyUser);

export default router;
