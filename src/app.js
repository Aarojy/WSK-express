import express from 'express';
import errorHandler from './api/middlewares/error_handler.js';
import apiRouter from './api/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
app.use('/api/v1', apiRouter);

// Error handler middleware
app.use(errorHandler);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});
