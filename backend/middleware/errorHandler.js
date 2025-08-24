const {loggerEvents} = require('./logger');

const errorHandler = (err, req, res, next) => {
  loggerEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log');
  console.error(err.stack);
  const status = res.statusCode ? res.statusCode : 500;
  res.status(status);
  res.json({message: err.message, isError: true});
}

module.exports = errorHandler;
