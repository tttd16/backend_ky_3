const jwt = require('jsonwebtoken');

const tokenTime = (id) => {
  return jwt.sign({ id }, 'masobimat', {
    expiresIn: '7d',
  });
};

module.exports = tokenTime;
