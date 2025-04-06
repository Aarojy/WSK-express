const cats = [
  {
    cat_id: 9592,
    cat_name: 'Frank',
    weight: 11,
    owner: 3609,
    filename: 'f3dbafakjsdfhg4',
    birthdate: '2021-10-12',
  },
  {
    cat_id: 9590,
    cat_name: 'Mittens',
    weight: 8,
    owner: 3602,
    filename: 'f3dasdfkjsdfhgasdf',
    birthdate: '2021-10-12',
  },
  {
    cat_id: 9593,
    cat_name: 'Whiskers',
    weight: 10,
    owner: 3610,
    filename: 'f3dbafakjsdfhg5',
    birthdate: '2020-05-20',
  },
];

const listCats = () => {
  return cats;
};

const findCatById = (id) => {
  const cat = cats.find((cat) => cat.cat_id === id);
  if (!cat) {
    return null;
  }
  return cat;
};

const addCat = (cat) => {
  const {cat_name, weight, owner, filename, birthdate} = cat;
  const newId = cats.length > 0 ? cats[cats.length - 1].cat_id + 1 : 1;

  cats.push({
    cat_id: newId,
    cat_name,
    weight,
    owner,
    filename,
    birthdate,
  });

  return {cats_id: newId};
};

export {listCats, findCatById, addCat};
