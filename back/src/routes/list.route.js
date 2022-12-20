import { Router } from 'express';
import passport from 'passport';
import { createList, obtainList } from '../controllers/tweet.controller.js';
passport;

const router = Router();
const authenticate = passport.authenticate('jwt', { session: false });

router.get('/:id', obtainList);
router.post('/create', authenticate, createList);

export default router;
