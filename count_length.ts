import fs from 'fs'
import globby from 'globby'
import path from 'path'

const source = path.resolve(__dirname, './source/_posts')

const articles = globby.sync(`${source}/**/*.md`, {
  dot: false
})

const count = articles.reduce((prev, current) => {
  const length = fs.readFileSync(current, { encoding: 'utf-8' }).length
  return prev + length
}, 0)

console.log()
console.log('---------------------')
console.log(`共写了：${articles.length}篇博客`)
console.log(`博客总字数为：${count}`)
console.log('---------------------')
console.log()
