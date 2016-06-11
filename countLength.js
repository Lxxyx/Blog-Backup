/**
 * 计算所写博客字数。Node直接运行即可。
 */
var fs = require('fs')

var totalLength = 0
var commonPath = './source/_posts/'

var getDirFilesArray = path => new Promise((reslove, reject) => {
  fs.readdir(path, (err, data) => {
    if (data) {
      reslove(data)
    } else {
      reject(err)
    }
  })
})

var getFileLength = fileName => new Promise((reslove, reject) => {
  fs.readFile(commonPath + fileName, 'utf-8', (err, data) => {
    if (data) {
      reslove(data)
    } else {
      reject(err)
    }
  })
})


getDirFilesArray(commonPath)
  .then(res => {
    for (x in res) {
      getFileLength(res[x])
        .then((fileData) => {
          totalLength += fileData.length
          console.log(totalLength)
        })
    }
  })
  .catch(e => {
    console.log(e)
  })
