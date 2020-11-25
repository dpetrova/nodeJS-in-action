const env = process.env.NODE_ENV || 'development';

//error-handling middleware uses four arguments
function errorHandler(err, req, res, next) {
  res.statusCode = 500;
  //errorHandler middleware component behaves differently, depending on value of NODE_ENV
  switch (env) {
    case 'development':
      console.error('Error caught by errorHandler:');
      console.error(err);
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(err));
      break;
    default:
      res.end('Server error');
  }
}

module.exports = errorHandler;
