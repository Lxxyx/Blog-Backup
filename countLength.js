/**
 * 计算所写博客字数。Node直接运行即可。
 */
var fs = require('fs');

var totalLength = 0;
var commonPath = './source/_posts/';

var getDirFilesArray = function(path) {
  return new Promise(function(reslove, reject) {
    fs.readdir(path, (err, data) => {
      if (data) {
        reslove(data);
      } else {
        reject(err)
      }
    });
  });
};

var getFileLength = function(fileName) {
  return new Promise(function(reslove, reject) {
    fs.readFile(commonPath + fileName, 'utf-8', (err, data) => {
      if (data) {
        reslove(data)
      } else {
        reject(err)
      }
    });
  });
};

getDirFilesArray(commonPath)
  .then((response) => {
    for (x in response) {
      getFileLength(response[x])
        .then((fileData) => {
          totalLength += fileData.length;
          console.log(totalLength);
        })
    }
  })
  .catch((error) => {
    console.log(error)
  });
