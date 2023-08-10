import express from 'express';
import session from 'express-session';
import path from 'path';

const sessionRouter = express.Router();

sessionRouter.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {},
  })
);

sessionRouter.get('/setname', (req, res) => {
  req.session.user = 'Jane Doe';
  res.send('done');
});

sessionRouter.get('/getname', (req, res) => {
  res.send(req.session.user || 'no name available');
});

sessionRouter.get('/login', (req, res) => {
  res.sendFile(path.resolve('public', 'sessionLogin.html'));
});

sessionRouter.post('/connect', (req, res) => {
  if (req.body.login === 'john' && req.body.password === 'doe') {
    req.session.isConnected = true;
    return res.redirect('/session/admin');
  }
  res.redirect('/session/login');
});

sessionRouter.get('/admin', (req, res) => {
  if (req.session.isConnected) {
    return res.sendFile(path.resolve('public', 'sessionAdmin.html'));
  }
  res.redirect('/session/login');
});

sessionRouter.get('/logout', (req, res) => {
  req.session.destroy();
  res.send('You are logged out');
});

export default sessionRouter;
