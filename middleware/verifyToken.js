import jwt from 'jsonwebtoken';
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.token;
    const user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    console.log(error);
    res.send('Access denied');
  }
};
