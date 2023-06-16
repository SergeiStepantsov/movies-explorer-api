require('dotenv').config();

const { JWT_CODE } = require('./const');

const { NODE_ENV, JWT_SECRET } = process.env;

const pickKey = function () {
  return NODE_ENV === 'production' ? JWT_SECRET : JWT_CODE;
};

module.exports = {
  pickKey,
};
