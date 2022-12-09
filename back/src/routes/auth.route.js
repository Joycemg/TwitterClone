import { Router } from 'express';
import passport from 'passport';
import { signIn, logIn, SeeMyUser } from '../controllers/auth.controller.js';
passport;

const router = Router();
const authenticate = passport.authenticate('jwt', { session: false });

router.post('/register', signIn);
router.post('/login', logIn);
router.get('/user', authenticate, SeeMyUser);

export default router;
