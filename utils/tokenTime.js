const jwt = require('jsonwebtoken');

const tokenTime = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

module.exports = tokenTime;
