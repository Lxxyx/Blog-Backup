import { readFileSync } from 'node:fs'
import globby from 'globby'

const articles = globby.sync('./source/_posts/**/*.md')
const count = articles.reduce((length, file) => length + readFileSync(file, 'utf-8').length, 0)

console.log()
console.log('---------------------')
console.log(`共写了：${articles.length}篇博客`)
console.log(`博客总字数为：${count}`)
console.log('---------------------')
console.log()
