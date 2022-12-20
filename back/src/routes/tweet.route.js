import { Router } from 'express';
import passport from 'passport';
import { createTweet, likeTweet, retweet, removeTweet, seeTweet, seeTweets, addBookmarks } from '../controllers/tweet.controller.js';
passport;

const router = Router();
const authenticate = passport.authenticate('jwt', { session: false });

router.get('/', seeTweets);
router.get('/:id', seeTweet);
router.post('/create', authenticate, createTweet);
router.post('/:id/like', authenticate, likeTweet);
router.post('/:id/retweet', authenticate, retweet);
router.delete('/:id/delete', authenticate, removeTweet);
router.post('/:id/bookmark', authenticate, addBookmarks);

export default router;
