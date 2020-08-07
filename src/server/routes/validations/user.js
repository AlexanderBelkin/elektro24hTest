const { body } = require('express-validator');
const config = require('../../../config');

module.exports = {
  'login': () => ([
    body('username')
      .trim()
      .exists().withMessage('Username field is required')
      .isLength({ min: config.validation.user.username.min, max: config.validation.user.username.max })
        .withMessage(`Min length: ${config.validation.user.username.min}. Max length: ${config.validation.user.username.max}`),
    body('password')
      .trim()
      .exists().withMessage('Password field if required')
      .isLength({ min: config.validation.user.password.min, max: config.validation.user.password.max })
      .withMessage(`Min length: ${config.validation.user.password.min}. Max length: ${config.validation.user.password.max}`),
  ]),
}