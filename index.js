import express from 'express';
const PORT = 5050;
const app = express();
import sessionRouter from './routes/sessionRouter.js';
import tokenRouter from './routes/tokenRouter.js';
import './db/client.js';

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Exercise 1 and 2
app.use('/session', sessionRouter);

// Exercise 3
app.use('/token', tokenRouter);

// Exercise 4 and 5 TODO!

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
