import express from 'express';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Welcome to my REST API!');
});

app.get('/api/v1/cat', (req, res) => {
  const cat = {
    cat_id: 123,
    name: 'Markus',
    birthdate: '2020/12/05',
    weight: 13,
    owner: 'Petrus',
    image: 'https://loremflickr.com/320/240/cat',
  };

  res.status(200).json(cat);
});

app.use('/public', express.static('public'));

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
