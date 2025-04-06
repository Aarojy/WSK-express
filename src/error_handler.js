const errorHandler = (err, req, res) => {
  console.error('Error:', err.message || err);

  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({error: message});
};

export default errorHandler;
