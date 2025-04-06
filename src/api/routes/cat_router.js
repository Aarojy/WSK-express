import express from 'express';
import multer from 'multer';

import {
  getCats,
  getCatById,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat_controller.js';
import createThumbnail from '../../middlewares.js';

const catRouter = express.Router();

const upload = multer({dest: 'uploads/'});

catRouter.route('/:id').get(getCatById).put(putCat).delete(deleteCat);

catRouter
  .route('/')
  .get(getCats)
  .post(upload.single('file'), createThumbnail, postCat);

export default catRouter;
