import jwt from 'jsonwebtoken';
import User from '../schemas/user.schema.js';

const postAuth = async (data) => {
  const { username, name, email, password } = data;
  const account = await User.findOne({ $or: [{ email }, { username }] });
  if (account) throw new Error('Email/username already in use!');

  const newAccount = new User({
    username,
    name,
    email,
    password,
  });
  return newAccount.save((err) => {
    if (err) throw err;
  });
};

const getAuth = async (data) => {
  const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '2h' });

  const returnObject = {
    ...data,
    token: token,
  };
  delete returnObject.password;

  return token;
};

const service = {
  postAuth,
  getAuth,
};

export default service;
