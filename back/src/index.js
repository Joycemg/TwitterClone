import express, { json } from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 4000;

app.use(json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (_, res) => {
  res.send('<h1 align="center">Welcome Twitter Clone API</h1>');
});

app.use('*', (_, res) => {
  res.status(404).send('<h1 align="center">OPS! the endpoint does not exist :(</h1>');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
