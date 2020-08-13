const router = require('express').Router();
const multer = require('multer');
const validation = require('./validations/article');
const validate = require('./validations/validate');
const upload  = multer({ storage: multer.memoryStorage() });
const post = require('../controllers/post');

router.get('/article/:id',
  (request, response) =>
  post.getById(request, response, 'articles')
);

router.get('/article',
  (request, response) =>
    post.getAll(request, response, 'articles')
);

router.patch('/article',
  upload.any(),
  (request, response, next) =>
    post.patchPost(request, response, 'articles')
);

router.post('/article',
  upload.array('images'),
  validation.publish(),
  validate,
  (request, response, next) =>
    post.createPost(request, response, 'articles')
);

router.delete('/article',
  (request, response, next) =>
    post.deletePost(request, response, 'articles')
);

module.exports = router;