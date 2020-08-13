const fs = require('fs');
const hash = require('keccak');
const config = require('../../config');

const paginate = (array, limit, page) => {
  return array.slice((page - 1) * limit, page * limit);
};

const validateFiles = files => {
  return files.find(file => {
    return config.validation.imagePost.types.includes(file.mimetype);
  });
};

const saveFiles = files => {
  return files.map(file => {
    const hex = file.buffer.toString('base64');
    const base64Data = hex.replace(/^[-\w.]+\/[-\w.],+$/, '');
    const fileName = hash('keccak256')
      .update(new Date().getTime().toString() + Math.random().toString())
      .digest()
      .toString('hex')
      .slice(0, 32);
    require("fs").writeFile(`uploads/${fileName}.jpg`, base64Data, 'base64', function(err) {
      if (err !== null) {
        throw err;
      }
    });
    return `/uploads/${fileName}.jpg`;
  })
};

const deletePostImage = (file) => {
  if (file[0] === '/') {
    file = file.slice(1);
  }
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
  }
};

module.exports = {
  paginate,
  validateFiles,
  saveFiles,
  deletePostImage,
};
