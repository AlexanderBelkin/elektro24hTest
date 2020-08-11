const config = require('../config');

const validateFiles = files => {
  return files.find(file => {
    return config.validation.imagePost.types.includes(file.mimetype);
  });
};

const saveFiles = files => {
  return files.map(file => {
    const hex = file.buffer.toString('base64');
    const base64Data = hex.replace(/^[-\w.]+\/[-\w.],+$/, '');
    const fileName = new Date().getTime()
    require("fs").writeFile(`uploads/${fileName}.jpg`, base64Data, 'base64', function(err) {
      if (err !== null) {
        throw err;
      }
    });
    return `${fileName}.jpg`;
  })
};

module.exports = {
  validateFiles,
  saveFiles,
}
