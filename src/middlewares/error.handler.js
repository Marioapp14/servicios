
const {ValidationError} =require('sequelize');


function logErrors(err, req, res, next) {
    console.log('logErrors');
    console.error(err);
    next(err);
  }


function errorHandler(err, req, res, next) {
  if (err) {
    res.status(500).json({
      message: err.message,
      stack: err.stack,
    });
  }
  next(err);
}

function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.message,
      stack: err.stack,
    });
  }
  next(err);
}



module.exports = {logErrors, errorHandler, ormErrorHandler };
