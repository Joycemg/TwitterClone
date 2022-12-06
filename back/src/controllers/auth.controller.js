import service from '../services/auth.service.js';
import passport from 'passport';

export const signIn = async (_, res) => {
  const { body } = _;

  const newUser = {
    username: body.username,
    name: body.name,
    email: body.email,
    password: body.password,
  };
  try {
    const user = await service.postAuth(newUser);
    return res.status(201).json({ message: 'Register', user });
  } catch (error) {
    const { message } = error;
    return res.status(404).json({ message });
  }
};

export const logIn = async (_, res, next) => {
  passport.authenticate('local', { session: false }, async (err, user, info) => {
    try {
      if (err || !user) {
        return res.status(400).json({ msg: err.message });
      }
      console.log(_.user);

      _.login(user, { session: false }, async (err) => {
        if (err) return res.status(500).json(err);
        // if (err) return next(err);

        const body = {
          id: user._id,
          login: user.username,
        };

        const token = await service.getAuth(body);

        return res.status(200).json({
          success: true,
          message: 'Logged in successfully!',
          login: token,
        });
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  })(_, res, next);
};

export const SeeMyUser = async (_, res, next) => {
  const user = {
    ..._.user._doc,
  };
  delete user.password;

  try {
    if (!user) throw new Error('No found user');
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
