/**
 * 计算所写博客字数。Node直接运行即可。
 */
const fs = require('fs')

let totalLength = 0
let totalNum = 0
const commonPath = './source/_posts/'

let dir = fs.readdirSync(commonPath)

function walkDir (dir, dirPath) {
  dir.forEach(val => {
    const stat = fs.statSync(`${dirPath}${val}`)
    if (stat.isDirectory()) {
      walkDir(fs.readdirSync(`${dirPath}${val}`), `${dirPath}${val}/`)
    } else {
      totalNum += 1
      totalLength += fs.readFileSync(`${dirPath}${val}`, 'utf-8').length
    }
  })
}

walkDir(dir, commonPath)

console.log('---------------------')
console.log(`共写了：${totalNum}篇博客`)
console.log(`博客总字数为：${totalLength}`)
console.log('---------------------')