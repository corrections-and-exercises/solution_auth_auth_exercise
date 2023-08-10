import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const createUser = async (req, res) => {
  try {
    const {
      body: {email, password},
    } = req;

    const newUser = await User.create({
      email,
      password: await bcrypt.hash(password, 5),
    });

    const token = jwt.sign({newUser, admin: true}, process.env.JWT_SECRET);
    res.set('token', token);
    return res.redirect('/user/checkUserToken');
  } catch (error) {
    console.log(error);
    res.send('Something went wrong');
  }
};
