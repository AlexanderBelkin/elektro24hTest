const user = require('./validation_config/user');

const config = {
  baseUrl: 'http://localhost',
  port: 3001,

  validation: {
    user,
  }
}

module.exports = config;