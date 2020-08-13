const helper = require('./helper');
const db = require('../db');

const pageLimit = 6;

const postNameMap = {
  'products': 'Product',
  'articles': 'Article',
};

const getById = (request, response, postType) => {
  const { id } = request.params;
  const post = db[postType][id];
  if (post) {
    return response.json(post);
  } else {
    return response.status(404).json({
      errors: {
        message: `${postNameMap[postType]} not found`,
      },
    })
  }
};

const getAll = (request, response, postType) => {
  const page = request.query.page || 1;
  const posts = helper.paginate(db[postType], pageLimit, page);
  return response.json({
    posts,
    total: Math.ceil(db[postType].length / pageLimit),
  });
};

const patchPost = (request, response, postType) => {
  const { id, images } = request.body;
  const post = db[postType][id];
  const deleteImages = post.images.filter(x => !images.includes(x));
  if (deleteImages.length > 0) {
    deleteImages.map(file => {
      helper.deletePostImage(file);
      db[postType][id] = {
        ...request.body,
        images: post.images.filter(image => image !== file),
      };
    });
  } else {
    const postImages = db[postType][id].images;
    db[postType][id] = {
      ...request.body,
      images: postImages,
    };
  }
  return response.status(200).send();
};

const createPost = (request, response, postType) => {
  if (request.files.length > 0) {
    const valid = helper.validateFiles(request.files);
    if (valid) {
      try {
        const results = helper.saveFiles(request.files);
        db[postType].push({
          ...request.body,
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
        message: 'Images not founded',
      },
    });
  }
};

const deletePost = (request, response, postType) => {
  const id = request.query.id;
  const post = db[postType][id];
  if (post) {
    post.images.map(file => {
      helper.deletePostImage(file);
    });
    db[postType].splice(id, 1);
    return response.status(204).send();
  } else {
    return response.status(404).json({
      errors: {
        message: 'Post not found',
      },
    });
  }
};

module.exports = {
  getById,
  getAll,
  patchPost,
  createPost,
  deletePost,
};