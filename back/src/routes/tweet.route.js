import { Router } from 'express';
import passport from 'passport';
import { createTweet, likeTweet } from '../controllers/tweet.controller.js';
passport;

const router = Router();
const authenticate = passport.authenticate('jwt', { session: false });

router.post('/create', authenticate, createTweet);
router.post('/:id/like', authenticate, likeTweet);

export default router;
