import { Router } from 'express';
import passport from 'passport';
import { createTweet } from '../controllers/tweet.controller.js';
passport;

const router = Router();
const authenticate = passport.authenticate('jwt', { session: false });

router.get('/create', authenticate, createTweet);

export default router;
