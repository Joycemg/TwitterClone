import { Router } from 'express';
import passport from 'passport';
import { createTweet, likeTweet, retweet } from '../controllers/tweet.controller.js';
passport;

const router = Router();
const authenticate = passport.authenticate('jwt', { session: false });

router.post('/create', authenticate, createTweet);
router.post('/:id/like', authenticate, likeTweet);
router.post('/:id/retweet', authenticate, retweet);

export default router;
