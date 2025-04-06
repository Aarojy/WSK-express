/* eslint-disable no-unused-vars */
import express from 'express';
import {
  listCats,
  findCatById,
  findCatsByUserId,
  addCat,
} from '../models/cat_model.js';

const catRouter = express.Router();

catRouter.get('/', async (req, res) => {
  try {
    const cats = await listCats();
    res.status(200).json(cats);
  } catch (error) {
    console.error('Error fetching cats:', error);
    res.status(500).json({error: 'Failed to fetch cats'});
  }
});

catRouter.get('/:id', async (req, res) => {
  try {
    const cat = await findCatById(req.params.id);
    if (!cat) {
      return res.status(404).json({error: 'Cat not found'});
    }
    res.status(200).json(cat);
  } catch (error) {
    console.error('Error fetching cat by ID:', error);
    res.status(500).json({error: 'Failed to fetch cat'});
  }
});

catRouter.get('/user/:userId', async (req, res) => {
  try {
    const cats = await findCatsByUserId(req.params.userId);
    if (cats.length === 0) {
      return res.status(404).json({error: 'No cats found for this user'});
    }
    res.status(200).json(cats);
  } catch (error) {
    console.error('Error fetching cats by user ID:', error);
    res.status(500).json({error: 'Failed to fetch cats by user ID'});
  }
});

catRouter.post('/', async (req, res) => {
  try {
    const newCat = await addCat(req.body);
    res.status(201).json(newCat);
  } catch (error) {
    console.error('Error adding cat:', error);
    res.status(500).json({error: 'Failed to add cat'});
  }
});

export default catRouter;
