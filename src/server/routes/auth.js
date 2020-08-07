const router = require('express').Router();
const validation = require('./validations/user');
const validate = require('./validations/validate');
const user = require('../models/user');
const db = require('../db');

router.post('/login',
  validation.login(),
  validate,
  (request, response, next) => {
    const userId = db.users.findIndex(user => user.username === request.body.username);
    if (userId >= 0) {
      const isPasswordMatch = user.isPasswordMatch(db.users[userId], request.body.password);
      if (isPasswordMatch) {
        const token = user.generateToken(userId);
        return response.json({
          token,
        });
      }
    }
    return response.status(401).json({
      errors: {
        message: 'Username or password incorrect',
      }
    })
  }
);

module.exports = router;