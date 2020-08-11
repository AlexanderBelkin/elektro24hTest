const router = require('express').Router();
const multer = require('multer');
const validation = require('./validations/article');
const validate = require('./validations/validate');
const article = require('../models/article');
const db = require('../db');
const uploadMethods = require('../uploadMethods');
const upload  = multer({ storage: multer.memoryStorage() });

const pageLimit = 5;

router.get('/article/:id',
  (request, response, next) => {
    const { id } = request.params;
    const article = db.articles[id];
    if (article) {
      return response.json(article);
    } else {
      return response.status(404).json({
        errors: {
          message: 'Article not found',
        },
      })
    }
  }
);

router.get('/article',
  (request, response, next) => {
    const page = request.query.page || 1;
    const articles = article.paginate(db.articles, pageLimit, page);
    return response.json({
      articles,
      total: Math.ceil(articles.length / pageLimit),
    });
  }
);

router.patch('/article',
  upload.any(),
  (request, response, next) => {
    const { id, title, description, images } = request.body;
    const article = db.articles[id];
    const deleteImages = article.images.filter(x => !images.includes(x));
    deleteImages.map(file => {
      if (file[0] === '/') {
        file = file.slice(1);
      }
      try {
        fs.unlinkSync(file);
      } catch (error) {
        return response.status(200).send();
      } finally {
        db.articles[id] = {
          ...db.articles[id],
          title,
          description,
          images: article.images.filter(image => image !== `/${file}`),
        };
      }
    });
    return response.status(200).send();
  }
);

router.post('/article',
  upload.array('images'),
  validation.publish(),
  validate,
  (request, response, next) => {
    const { title, description } = request.body;
    if (request.files.length > 0) {
      const valid = uploadMethods.validateFiles(request.files);
      if (valid) {
        try {
          const results = uploadMethods.saveFiles(request.files);
          db.products.push({
            title,
            description,
            images: results,
          });
          return response.status(201).send();
        } catch (error) {
          return response.status(500).json(error);
        }
      } else {
        return response.status(422).json({
          errors: {
            message: 'Incorrect image type',
          },
        });
      }
    } else {
      return response.status(400).json({
        errors: {
          message: 'Images not found'
        }
      })
    }
  }
);

router.delete('/article',
  (request, response, next) => {
    const id = request.query.id;
    const article = db.articles[id];
    if (article) {
      db.articles.splice(id, 1);
      return response.status(204).send();
    } else {
      return response.status(404).json({
        errors: {
          message: 'Article not found',
        },
      });
    }
  }
);

module.exports = router;