import jwt from 'jsonwebtoken';
import 'dotenv/config';
import sharp from 'sharp';

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }
  console.log(req.file.path);
  next();

  let extension = 'jpg';
  if (req.file.mimetype === 'image/png') {
    extension = 'png';
  }

  await sharp(req.file.path)
    .resize(100, 100)
    .toFile(`${req.file.path}_thumb.${extension}`);

  next();
};

const authenticateToken = (req, res, next) => {
  console.log('authenticateToken', req.headers);
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log('token', token);
  if (token == null) {
    return res.sendStatus(401);
  }
  try {
    res.locals.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
    // eslint-disable-next-line no-unused-vars
  } catch (err) {
    res.status(403).send({message: 'invalid token'});
  }
};

export {authenticateToken};

export default createThumbnail;
