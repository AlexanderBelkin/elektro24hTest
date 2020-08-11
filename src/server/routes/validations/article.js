const { body } = require('express-validator');
const config = require('../../../config');

module.exports = {
  'publish': () => ([
    body('title')
      .trim()
      .exists().withMessage('Title field is required')
      .isLength({ min: config.validation.article.title.min, max: config.validation.article.title.max })
      .withMessage(`Min length: ${config.validation.article.title.min}. Max length: ${config.validation.article.title.max}`),
    body('description')
      .trim()
      .exists().withMessage('Description field if required')
      .isLength({ min: config.validation.article.description.min, max: config.validation.article.description.max })
      .withMessage(`Min length: ${config.validation.article.description.min}. Max length: ${config.validation.article.description.max}`),
  ]),
}