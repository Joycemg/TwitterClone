import express, { json } from 'express';
import passport from 'passport';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import db from './config/db.config.js';
import './utils/auth/index.js';

import authRouter from './routes/auth.route.js';
import tweetRouter from './routes/tweet.route.js';

const app = express();
const port = process.env.PORT || 4000;

app.use(json());
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(authRouter);
app.use(tweetRouter);

app.get('/', (_, res) => {
  res.send('<h1 align="center">Welcome Twitter Clone API</h1>');
});

app.use('*', (_, res) => {
  res.status(404).send('<h1 align="center">OPS! the endpoint does not exist :(</h1>');
});

mongoose
  .connect(db.MONGODB_URL, { useNewUrlParser: true })
  .then(() => {
    console.info('connected to mongodb');
    return app.listen(port);
  })
  .then(() => console.info('server running at', port))
  .catch((err) => console.error(err.message));
