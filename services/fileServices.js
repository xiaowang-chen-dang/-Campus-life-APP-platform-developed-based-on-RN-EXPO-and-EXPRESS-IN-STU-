const fs = require('fs');
const path = require('path');

exports.getFilePath = (fileName) => {
  return path.join(__dirname, '../uploads', fileName);
};

exports.fileExists = (filePath) => {
  return fs.existsSync(filePath);
};
