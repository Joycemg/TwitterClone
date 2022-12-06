import User from '../../../schemas/user.schema.js';
import { Strategy } from 'passport-local';

const options = {
  usernameField: 'login',
  passwordField: 'password',
  session: false,
};

const localStrategy = new Strategy(options, async (login, password, done) => {
  const search = login.split('').includes('@') ? { email: login } : { username: login };
  try {
    const auth = await User.findOne(search);

    if (!auth) done(null, false);
    const isMatch = await auth.isPasswordValid(password);

    if (!isMatch) done(null, false);

    done(null, auth);
  } catch (err) {
    done(err, false);
  }
});

export default localStrategy;
