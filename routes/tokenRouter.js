import express from 'express';
import jwt from 'jsonwebtoken';
import path from 'path';

const tokenRouter = express.Router();

tokenRouter.get('/login', (req, res) => {
  res.sendFile(path.resolve('public', 'tokenLogin.html'));
});

tokenRouter.post('/connect', (req, res) => {
  const {login, password} = req.body;
  if (login === 'john' && password === 'doe') {
    const token = jwt.sign({login, admin: true}, process.env.JWT_SECRET);
    res.set('token', token);
    return res.sendFile(path.resolve('public', 'checkToken.html'));
  }
  res.redirect('/token/login');
});

tokenRouter.post('/checkJWT', (req, res) => {
  jwt.verify(req.body.token, process.env.JWT_SECRET, (err, data) => {
    if (err) return res.redirect('/token/login');
    if (data.admin) {
      return res.sendFile(path.resolve('public', 'tokenAdmin.html'));
    }
    res.redirect('/token/login');
  });
});

export default tokenRouter;
