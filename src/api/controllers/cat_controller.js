import {addCat, findCatById, listCats} from '../models/cat_model.js';

const getCats = (req, res) => {
  const cats = listCats();
  res.status(200).json(cats);
};

const getCatById = (req, res) => {
  const {id} = req.params;
  const cat = findCatById(parseInt(id));
  if (!cat) {
    return res.status(404).json({error: 'Cat not found'});
  }
  res.status(200).json(cat);
};

const postCat = (req, res) => {
  const result = addCat(req.body);
  if (result) {
    res.status(201).json(result);
  } else {
    res.status(400).json({error: 'Invalid cat data'});
  }
};

const putCat = (req, res) => {
  res.sendStatus(200);
};

const deleteCat = (req, res) => {
  res.sendStatus(200);
};

export {getCats, getCatById, postCat, putCat, deleteCat};
