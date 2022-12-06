import User from '../../../schemas/user.schema.js';
import { Strategy, ExtractJwt } from 'passport-jwt';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const jwtStrategy = new Strategy(options, async (payload, done) => {
  const { id } = payload;
  try {
    const auth = await User.findById(id);
    if (!auth) done(null, false);
    return done(null, auth);
  } catch (err) {
    return done(err, false);
  }
});

export default jwtStrategy;
