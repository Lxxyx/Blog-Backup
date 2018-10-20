const fs = require('fs')
const childProcess = require('child_process')
const path = require('path')

const currentYear = new Date().getFullYear()
const filename = process.argv[2]
const posts = path.resolve(__dirname, './source/_posts')
const targetDir = path.resolve(posts, `${currentYear}`)

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir)
}

if (!filename) {
  throw new Error('需要传入博客名')
}

childProcess.execSync(`hexo n '${filename}'`)

const mdName = filename.replace(/_/g, '-') + '.md'
const md = path.resolve(posts, mdName)
const targetMD = path.resolve(targetDir, mdName)

fs.copyFileSync(md, targetMD)
fs.unlinkSync(md)

console.log()
console.log('---------------------')
console.log(`生成成功`)
console.log('---------------------')
console.log()
