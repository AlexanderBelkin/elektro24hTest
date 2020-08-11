const user = require('./validation_config/user');
const product = require('./validation_config/product');
const article = require('./validation_config/article');
const imagePost = require('./validation_config/imagePost');

const config = {
  baseUrl: 'http://localhost',
  port: 3001,

  validation: {
    user,
    product,
    article,
    imagePost,
  }
}

module.exports = config;