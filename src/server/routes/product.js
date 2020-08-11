const router = require('express').Router();
const multer = require('multer');
const lodash = require('lodash');
const fs = require('fs');
const validation = require('./validations/product');
const validate = require('./validations/validate');
const product = require('../models/product');
const db = require('../db');
const uploadMethods = require('../uploadMethods');
const upload  = multer({ storage: multer.memoryStorage() });

const pageLimit = 5;

router.get('/product/:id',
  (request, response, next) => {
    const { id } = request.params;
    const product = db.products[id];
    if (product) {
      return response.json(product);
    } else {
      return response.status(404).json({
        errors: {
          message: 'Product not found',
        },
      })
    }
  }
);

router.get('/product',
  (request, response, next) => {
    const page = request.query.page || 1;
    const products = product.paginate(db.products, pageLimit, page);
    return response.json({
      products,
      total: Math.ceil(products.length / pageLimit),
    });
  }
);

router.patch('/product',
  upload.any(),
  (request, response, next) => {
    const { id, title, description, price, images } = request.body;
    const product = db.products[id];
    const deleteImages = product.images.filter(x => !images.includes(x));
    deleteImages.map(file => {
      if (file[0] === '/') {
        file = file.slice(1);
      }
      try {
        fs.unlinkSync(file);
      } catch (error) {
        return response.status(200).send();
      } finally {
        db.products[id] = {
          ...db.products[id],
          title,
          description,
          price,
          images: product.images.filter(image => image !== `/${file}`),
        };
      }
    });
    return response.status(200).send();
  }
);

router.post('/product',
  upload.array('images'),
  validation.publish(),
  validate,
  (request, response, next) => {
    const { title, description, price } = request.body;
    if (request.files.length > 0) {
      const valid = uploadMethods.validateFiles(request.files);
      if (valid) {
        try {
          const results = uploadMethods.saveFiles(request.files);
          db.products.push({
            title,
            description,
            price,
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
          message: 'Images not founde'
        }
      })
    }
  }
);

router.delete('/product',
  (request, response, next) => {
    const id = request.query.id;
    const product = db.products[id];
    if (product) {
      db.products.splice(id, 1);
      return response.status(204).send();
    } else {
      return response.status(404).json({
        errors: {
          message: 'Product not found',
        },
      });
    }
  }
);

module.exports = router;