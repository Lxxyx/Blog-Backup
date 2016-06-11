/**
 * 计算所写博客字数。Node直接运行即可。
 */
const fs = require('fs')

let totalLength = 0
const commonPath = './source/_posts/'

let dir = fs.readdirSync(commonPath)
dir.forEach(val => totalLength += fs.readFileSync(`${commonPath}${val}`, 'utf-8').length)

console.log(`博客总字数为：${totalLength}`)
