const jwt = require('jsonwebtoken');
const hash = require('keccak');

const getPasswordHash = password => hash('keccak256').update(password).digest().toString('hex');

const createUser = (data) => {
  const password = getPasswordHash(data.password);
  delete data.password_confirmation;
  return {
    ...data,
    password,
  }
};

const generateToken = id => {
  return jwt.sign({
    userId: id,
  }, process.env.APP_SECRET, {
    expiresIn: '1h',
  });
};

const isPasswordMatch = (user, password) => {
  return getPasswordHash(password) === user.password;
};

module.exports = {
  createUser,
  generateToken,
  isPasswordMatch,
};
