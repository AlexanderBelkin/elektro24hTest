const router = require('express').Router();
const multer = require('multer');
const validation = require('./validations/product');
const validate = require('./validations/validate');
const upload  = multer({ storage: multer.memoryStorage() });
const post = require('../controllers/post');

router.get('/product/:id',
  (request, response) =>
    post.getById(request, response, 'products')
);

router.get('/product',
  (request, response) =>
    post.getAll(request, response, 'products')
);

router.patch('/product',
  upload.any(),
  (request, response) =>
    post.patchPost(request, response, 'products')
);

router.post('/product',
  upload.array('images'),
  validation.publish(),
  validate,
  (request, response) =>
    post.createPost(request, response, 'products')
);

router.delete('/product',
  (request, response, next) =>
    post.deletePost(request, response, 'products')
);

module.exports = router;