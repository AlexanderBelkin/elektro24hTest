const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/', require('./article'));
router.use('/', require('./product'));

module.exports = router;