import express from 'express';
import {
  getCats,
  getCatById,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat_controller.js';

const catRouter = express.Router();

catRouter.route('/:id').get(getCatById).put(putCat).delete(deleteCat);

catRouter.route('/').get(getCats).post(postCat);

export default catRouter;
